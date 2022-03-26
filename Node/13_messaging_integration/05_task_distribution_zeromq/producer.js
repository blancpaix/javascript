import zmq from 'zeromq';
import delay from 'delay';
import { generateTasks } from './generateTask.js';

const ALPHABET = 'abcedefghijklmnopqrstuvwxyz';   // 소문자로만 제한했음
const BATCH_SIZE = 10000;

const [, , maxLength, searchHash] = process.argv;


async function main() {
  const ventilator = zmq.socket('push');
  ventilator.bindSync('tcp://*:5016');
  // await ventilator.bind('tcp://*:5016');
  // await delay(1000);    // wait for all the workers to connect

  const generatorObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE);
  for (const task of generatorObj) {
    ventilator.send(JSON.stringify(task));
  };
};

main().catch(err => { console.error(err) });

/*
  먼저 push 소켓을 만들고 pull 소켓 작업 수신하기 위해 연결되는 로컬포트 5016에 바인딩 됨
  이제 1초 기다릴 필요는 따롱 ㅓㅄ구요,,,  기존 방식으로는 재연결 알고리듬으로 잠시후 연결됨, 첫번째 연결 작업자가 대부분 작업 받아감

  생성된 각 작업에 대해 문자열 지정, ventilator 소켓의 send 함수를 사용, 작업자에게 보냄

  node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
*/