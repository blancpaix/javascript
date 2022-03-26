// 작업자 구현
// 들어오는 작업 수신, AMQP 사용

import amqp from 'amqplib';
import { processTask } from './processTask.js';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const { queue } = await channel.assertQueue('tasks_queue');

  channel.consume(queue, async rawMsg => {
    const found = processTask(JSON.parse(rawMsg.content.toString()));

    if (found) {
      console.log(`Found! => ${found}`);
      channel.sendToQueue(`results_queue`, Buffer.from(`Found : ${found}`))
    }

    channel.ack(rawMsg);
  })
};

main().catch(err => console.error(err));

/*
  zeroMQ 사용법이랑 굉장히 비슷함
  먼저 tasks_queue 참조를 얻고 consume() 을 사용해 들어오는 작업을 수신
  일치하는 항목 발생 시 결괴를 results_queue 를 통해 수집기로 보냄 (p2p)
  메시지 완전 처리 후 channel.ack() 로 모든 메시지에 응답 확인

  여러 작업자 시작시 모두 동일한 대기열에서 수신 대기, 메시지가 사이에서 부하의 분산 시작됨,.. 결쟁 소비자
*/