import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
import yargs from 'yargs';    // 커맨드라인 인자 파싱
import { hideBin } from 'yargs/helpers';
import zmq from 'zeromq';

const argv = yargs(hideBin(process.argv)).argv;

const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' });
});

let pubSocket;

async function initializeSockets() {
  pubSocket = zmq.socket("pub");                // 게시자 소켓을 만들고 pub 에 지정된 포트 바인딩
  pubSocket.bindSync(`tcp://127.0.0.1:${argv.pub}`);
  // await pubSocket.bind(`tcp://127.0.0.1:${argv.pub}`)    // 밑에 for await 하면 될거임 근데 이거 deprecated 인듯

  const subSocket = zmq.socket("sub");          // 구독자
  const subPorts = [].concat(argv.sub);

  for (const port of subPorts) {                // 다른 인스턴스의 Pub 소켓에 연결
    console.log(`Subscribing to ${port}`);
    subSocket.connect(`tcp://127.0.0.1:${port}`);
  };
  subSocket.subscribe('chat');                  // chat 이벤트만 필터로 제공

  subSocket.on('message', (message) => {
    console.log(`Message from another server `, message);
    braodcast(message.toString().split(' ')[1]);
  });

  // 여기서 그럼 subSocket 으로 들어오는 메시지들을 저장해놓기때문에 for문을 돌리는건가?? 잘 모르겟지만 일단 시작을 해봅시다
  // for (const [msg] of subSocket) {        // subSocket 비동기 반복자, 메시지 수신 시작, chat 접두사 제거 후 서버 클라이언트에게 전송
  //   console.log(`Message from another server ${msg}`);
  //   braodcast(msg.toString().split(' ')[1]);
  // }
}

initializeSockets();

const wss = new WebSocketServer({ server });
wss.on('connection', client => {
  console.log('Client connected');
  client.on('message', msg => {
    console.log(`Message : ${msg}`);
    braodcast(msg);
    pubSocket.send(`chat ${msg}`);    // 새 메시지 받으면 연결된 클라이언트에게 브로드캐스팅, 게시자 소켓을 통해 게시하기 도함
  })
});

function braodcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
};


server.listen(argv.http || 8080, () => {
  console.log('SERVER 시작됨 ', argv.http || 8080)
});

// node index.js --http 8081 --pub 5001 --sub 5000 --sub 5002