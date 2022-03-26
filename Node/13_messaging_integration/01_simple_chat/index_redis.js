import { createServer } from "http";
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
import Redis from 'ioredis';

const redisSub = new Redis();   // 채널 구독
const redisPub = new Redis();   // 메시지 게시, Redis 는 두개의 연결이 필요행

// 정적 파일 서비스
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' });
});

const wss = new WebSocketServer({ server });
wss.on('connection', client => {
  console.log('Clinent Connected!');
  client.on('message', msg => {
    console.log('Message : ', msg);

    redisPub.publish('chat_messages', msg.toString());   // 클라로부터 새로운 메시지 수신, chat_messages 채널에 메시지를 게시, 메시지가 redis 로 다시 돌아옴
  })
});

redisSub.subscribe('chat_messages');    // 서버도 구독을 해야 함. 채널에 게시된 모든 메시지를 수신하도록 리스너 등록
// 메시지 수신시 현재 WebSocket 서버에 연결된 모든 클라이언트에게 메시지 브로드캐스트
redisSub.on('message', (channel, msg) => {      // 채널은 왜 들고있는거임?
  for (const client of wss.clients) {   // 인스턴스에 속한 클라이언트에게 전송
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
});

server.listen(process.argv[2] || 8080, () => {
  console.log(`SERVER ON ${process.argv[2] || 8080}`);
});