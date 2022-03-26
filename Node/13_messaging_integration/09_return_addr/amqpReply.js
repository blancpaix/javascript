// 응답 추상화 구현
import amqp from 'amqplib';

export class AMQPReply {
  constructor(requestQueueName) {
    this.requestQueueName = requestQueueName;
  }

  async initialize() {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();
    const { queue } = this.channel.assertQueue(    // 요청 수신 큐 설정, 목적을 위해 단순 영구 대기열(durable queue)
      this.requestQueueName
    );

    this.queue = queue;
  }

  handleRequests(handler) {                     // 새 응답을 보내기 위한 요청 핸들러를 등록하는데 사용
    this.channel.consume(this.queue, async msg => {
      const content = JSON.parse(msg.content.toString());
      const replyData = await handler(content);
      this.channel.sendToQueue(                 // 응답 보낼때 메시지의 replyTo 속성에 지정된 큐에 메시지를 직접 게시, 응답 수신한 요청자가 응답 메시지를 해당 요청과 매칭 하도록 응답에 correlationID 설정
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(replyData)),
        { correlationId: msg.properties.correlationId }
      );
      this.channel.ack(msg);
    })
  }
}