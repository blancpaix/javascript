import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
import amqp from 'amqplib';
import JSONStream from 'JSONStream';
import superagent from 'superagent';

const httpPort = process.argv[2] || 8080;

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange("chat", "fanout");
  const { queue } = await channel.assertQueue(      //  영구 구독자일 필요는 없음, 
    `chat_srv_${httpPort}`,
    { exclusive: true }    // 발사후 망각이면 충분함 => exclusive 옵션 추가, 대기열이 현재 연결에 독점됨, 서버 종료시 대기역 즉시 삭제
  );

  await channel.bindQueue(queue, 'chat');
  channel.consume(queue, msg => {     // 큐에서 메시지 읽을때 확인 응답 필요 없음
    msg = msg.content.toString();
    console.log(`From queue : ${msg}`);
    broadcast(msg);
  }, { noAck: true });

  function broadcast(msg) {
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(msg);
      }
    }
  }


  // 정적인 파일들을 서비스함
  const server = createServer((req, res) => {
    return staticHandler(req, res, { public: 'www' });
  });

  const wss = new WebSocketServer({ server });
  wss.on('connection', client => {
    console.log('Clinent connected');

    client.on('message', msg => {
      console.log(`Message : ${msg}`);
      channel.publish('chat', '', Buffer.from(msg));    // 새 메시지 게시?전송?, 라우팅이 없기 때문에 대상 익스체인지와 라우팅 키 지정하면 됨('')
    });

    // 이력 조회 서비스?
    superagent    // 히스토리 마이크로 서비스 => 채팅에서 히스토리 제공 가능, 과거 메시지 클라이언트에게 제공
      .get('http://localhost:8090')
      .on('error', err => console.error(err))
      .pipe(JSONStream.parse('*'))
      .on('data', msg => client.send(msg));
  });

  server.listen(httpPort);
};

main().catch(err => console.error(err));
