import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';

//정적인 서비스들을 서비스함
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' });
  // www 디렉터리에서 모든 정적 파일을 처리한다!, 이것은 어플의 클라이언트 측 리소스 (html, js,css) 액세스 하는데 필요함
});

const wss = new WebSocketServer({ server });    // Websocket 서버 인스턴스 만들고 기존 http 서버에 연결

wss.on('connection', client => {      // 수신 시작
  console.log('Client connected');
  client.on('message', msg => {         // 클라이언트 연결할 때마다 들어오는 메시지 수신 시작
    console.log('Message', msg);      // 메시지가 왜... 버퍼로 들어올까...
    broadcast(msg.toString());
  })
});

function broadcast(msg) {       // 서버에서 클라로 메시지 보내ㅡㄴ데.. 서버가 아는 연결된 모든 클라이언트에 반복함
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
};

server.listen(process.argv[2] || 8080, () => {
  console.log(`Server on `, process.argv[2] || 8080);
});

// 여기서는 서버 종료 후 재연결을 시도하지 않음. 이거는 알아서 해보면 될듯