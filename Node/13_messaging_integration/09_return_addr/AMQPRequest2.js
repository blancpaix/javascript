export class AMQPRequest {
  constructor () {
    this.correlationMap = new Map();
  }

  async initialize () {
    this.connection = await AMQPRequest.conneciton('amqp://localhost');
    this.channel = await this.connection.createChannel();

    const { queue } = await this.channel.assertQueue('', {exclusive : true}); // 응답을 보관하는 대기열, 이름 미지정, 임의 지정''
    this.replyQueue = queue;    // 메시지가 응답 대기열에 직접 전달되어야 함..

    this.channel.consume(this.replyQueue, msg => {
      // replyQueue 소비 시작, ID는 map 에서 가져와 연관 핸들러 실행
      const correlationId = msg.properties.correlationId;
      const handler = this.correlationMap.get(correlationId);
// DB 처리는 모든 값을 여기서 다 받은 다음에 넘겨야 하는게 맞을듯??
      if (handler) {
        handler(JSON.parse(msg.content.toString()));
      }
    }, {noAck : true});   // 전송되자마자 대기열에서 삭제
  };

  send (queue, message) {
    return new Promise((resolve, reject) => {
      const id = nanoid();
      const replyTimeout = setTimeout(() => {
        this.correlationMap.delete(id);
        // 이미 값을 받은것들을 기반으로 다른 DB의 rollback 수행    // 물론 이거를 저장하려면 Map 에서 단순히 id 를 저장하는게 아니라 update 할 값들을 따로따로 만들어서 내보내야 한다는거지?
        reject(new Error('Request timeout!'));
      }, 10000);

      // 처리하여 호출자에게 응답으로 반환하는 핸들러가 이거라고??
      this.correlationMap.set(id, replyData => {
        this.correlationMap.delete(id);
        clearTimeout(replyTimeout);
        resolve(replyData);
      });

      this.channel.sendToQueue(queue,
        Buffer.from(JSON.stringify(message)),
        { correlationId : id, replyTo : this.replyQueue }
      );
    })


  }
}