import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
import Redis from 'ioredis';

const redisClient = new Redis();
const redisClientXRead = new Redis();

const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'wwww' });
});

const wss = new WebSocketServer({ server });
wss.on('connection', async client => {
  console.log('Client Connected');

  client.on('message', msg => {
    console.log(`Message : ${msg}`);
    redisClient.xadd('chat_stream', '*', 'message', msg);
    // xadd : 스트림에 새 레코드를 추가
    // 연결된 클라이언트에서 새 메시지 도착 시 이 레코드를 사용해 메시지를 추가, a: 스트림 명칭, 2: 레코드 ID(redis ID 자체 생성, 순서보장), 3: 키-값 쌍의 목록
  });

  // Load message history
  const logs = await redisClient.xrange(    // 채팅 내역 검색을 위해 과거 레코드 질의, xrange: 지정된 두 ID 사이에서 모든 레코드 검색 가능
    'chat_stream', '-', '+');               // 가장낮은 Id - 가장 높은 id + => 여기 있는 모든 레코드 검색하겠다는 거임
  for (const [, [message]] of logs) {
    client.send(message);
  }
});

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
};

let lastRecordId = '$';

async function processStreamMessages() {          // 새 레코드가 스트림에 추가되기 기다리는 부분, 어플 인스턴스는 대기열에 추가되는 새로운 채팅 메시지를 읽을 수 있음, 통합에 필수적
  while (true) {
    const [[, records]] = await redisClientXRead.xread(
      'BLOCK', '0', 'STREAMS', 'chat_stream', lastRecordId
    )
    // 읽는 위의 작업을 위해 xread 함수 실행    1: BLOCK: 메시지 도착할때까지 호출 차단
    // 2: 일정 시간이 지나면 null 반환, 타임아웃 지정, 0: 계속 기다림
    // 3: STREAMS : 스트림의 세부사항을 지정할것임을 알려주는 키워드 
    // 4: 읽고자하는 스트림의 이름
    // 5: 새로운 읽기를 시작하려는 레코드 id 를 제공, 초기설정 $ : 현재 가낭 높은 ID 를 나타내는 특수 ID 기호

    for (const [recordId, [, message]] of records) {
      console.log(`Message from stream ${message}`);
      broadcast(message);
      lastRecordId = recordId;
    }
  }
};

processStreamMessages().catch(err => console.error(err));

server.listen(process.argv[2] || 8080);

/*
  구조 분할 구문, 위 아래 동일 구문
  for (const [, [, message]] of logs) { ... }
  for (const [recordId, [propertyId, message]] of logs ) { ... }
  recordId propertyId 는 필요 없어서 구조분할에서 제외하는거임...

  
  두개 서버 인스턴스 다시 시작, 어플 테스트하여 구현 동작을 확인해보세요
  채팅 히스토리 관리를 위해 전용 컴포넌트 위존이 없음 ㅎㅎㅎ
  xrange 과거 레코드 검색 하면 됨
  명시적으로 삭제하지 않는 한 메시지는 손실 안됨 => 기본적으로 신뢰 가능

  xdel, xtrim, xadd MAXLEN 옵션을 사용해 스트림 레코드 제거 가능

  이제 작업 배포 패턴으로 넘어갑시다
*/