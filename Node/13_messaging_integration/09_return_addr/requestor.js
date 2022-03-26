import { AMQPRequest } from './amqpRequest.js';
import delay from 'delay';

async function main() {
  const request = new AMQPRequest();
  await request.initialize();

  async function sendRandomRequest() {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    console.log(`Sum set created : ${a} + ${b} ...`);
    const reply = await request.send('requests_queue', { a, b });
    console.log(`${a} + ${b} = ${reply.sum}`);
  };

  for (let i = 0; i < 20; i++) {
    await sendRandomRequest();
    await delay(1000);
  };
  // 비동기 요청 / 응답 패턴 구현 뒤에 있는 모든 세부 사항을 신경 쓸 필요가 없다

  request.destroy();
};

main().catch(err => console.error(err));