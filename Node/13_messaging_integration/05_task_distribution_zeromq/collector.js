import zmq from 'zeromq';

async function main() {
  const sink = zmq.socket('pull');
  sink.bindSync('tcp://*:5017');

  sink.on('message', msg => {
    console.log(`Message from worker : ${msg.toString()}`);
  });
};

main().catch(err => console.error(err));

// 결과 수집기도 영구 노드, 작업자의 PUSH 소켓에 명시적으로 바인딩 대신 PULL 소켓을 바인딩하는것이 중요...