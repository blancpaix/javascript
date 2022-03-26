// AMQP 히스토리 서비스 구현

import { createServer } from 'http';
import level from 'level';
import timestamp from 'monotonic-timestamp';
import JSONStream from 'JSONStream';
import amqp from 'amqplib';

async function main() {
  const db = level('./msgHistory');

  const connection = await amqp.connect('amqp://localhost');    // amqp 브로커 rabbitMQ 연결 설정, 세션 유지 비슷한 채널 구성
  const channel = await connection.createChannel();
  await channel.assertExchange('chat', 'fanout');     // 'chat' 익스체인지 설정(팬아웃), assertExchange : 익스체인지 브로커에 존재하는지 확인, 그렇지 않으면 생성

  const { queue } = channel.assertQueue('chat_history');    // 'chat_history' 큐 생성, 영구성이 있기에 추가 속성 표기 필요없음
  await channel.bindQueue(queue, 'chat');     // 익스체인지에 바인딩,  라우팅키나 패턴이 없어서 필터링 수행 안함

  channel.consume(queue, async msg => {       // 큐에서 오는 메시지 수신
    const content = msg.content.toString();
    console.log(`Saving message : ${content}`);
    await db.put(timestamp(), content);
    channel.ack(msg);   // ack: 확인응답, db 에 성공적으로 저장된 후 메시지 확인 응답함, 브로커가 ack 확인 받지 못함녀 메시지는 다시 처리되도록 대기열로 들어감
    // 확인 응답이 필요 없으만 { noAck : true }을 channel.consume() API 에 전달하면 됨
  });

  createServer((req, res) => {
    res.writeHead(200);
    db.createValueStream()
      .pipe(JSONStream.stringify())
      .pipe(res)
    // 스트림으로 전송을 하기때문에 bulk 데이터를 보낼 수 잇는듯?? 이게.. 아마 유튜브에서 사용하는 방식일거야
  }).listen(8090);
};

main().catch(err => console.error(err));