import amqp from 'amqplib';
import { generateTasks } from './generateTask.js';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const BATCH_SIZE = 10000;

const [, , maxLength, searchHash] = process.argv;

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createConfirmChannel();
  await channel.assertQueue('tasks_queue');

  const generateObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE);
  for (const task of generateObj) {
    channel.sendToQueue('tasks_queue', Buffer.from(JSON.stringify(task)));
  };

  await channel.waitForConfirms();
  channel.close();
  connection.close();
};

main().catch(err => console.error(err));

/*
  익스체인지나 바인딩이 없어 AMQP 기반 어플 설정이 훨ㅆ니 간단함
  !주의 사항!
    1. 표준 채널 다신 confirmChannel 생성 => 추가 기능이 있는 채널 생성
      브로커가 모든 메시지의 수신을 확인할때까지 기다리는 waitForConfirms() 함수를 제공함
      => 모든 메시지가 로컬 대기열에서 발송되기 전 어플이 브로커에 대해 연결을 빨리 닫는것을 방지
    2. 생산자의 핵심은 실제로 새로운 channel.sendToQueue() API 임
      익스체인지나 라우팅을 우회하여 메시지를 대기열로 직접 전달하는 것임

node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b

*/