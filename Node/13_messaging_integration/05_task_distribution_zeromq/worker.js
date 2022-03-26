import zmq from 'zeromq';
import { processTask } from './ProcessTask.js';

async function main() {
  const fromVentilator = zmq.socket('pull');
  const toSink = zmq.socket('push');

  fromVentilator.connect('tcp://localhost:5016');
  toSink.connect('tcp://localhost:5017');

  fromVentilator.on('message', msg => {
    console.log('MSG!!!', msg.toString());
    const found = processTask(JSON.parse(msg.toString()));
    if (found) {
      console.log('이것도 뜨는데 ??', msg, '\n', msg.toString());
      console.log(`Found! => ${found}`);
      toSink.send(`Found : ${found}`);
    }
  });

  // for await (const rawMsg of fromVentilator) {
  //   const found = processTask(JSON.parse(rawMsg.toString()));
  //   if (found) {
  //     console.log(`Found! => ${found}`);
  //     toSink.send(`Found : ${found}`);
  //   }
  // }
};

main().catch(err => console.error(err));

/*
  작업자는 일시적인 노드를 나타냄
  소켓은 들어오는 연결을 수신하는 대신 원격 노드에 연결해야 함
  두개의 소켓을 만드는것을 작업자에서 해야 함
  -작업을 받기 위해 벤틸레이터에 연결되는 PULL 소켓
  -결과를 전파하기 위해 싱크에 연결되는 PUSH 소켓

  작업자 수행 작업은 매우 간단함,,, 수신된 모든 작업을 처리하고 일치한느 항목 발견시 toSink 소켓으로 결과 수집기에 멧지ㅣ 보냄
*/