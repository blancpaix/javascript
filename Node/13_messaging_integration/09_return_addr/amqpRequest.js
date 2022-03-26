import amqp from 'amqplib';
import { nanoid } from 'nanoid';

export class AMQPRequest {
  constructor() {
    this.correlationMap = new Map();
    // 상관 식별자 패턴 재사용, 메시지 ID 와 핸들러 간 연결 유지
  }

  // AMQP 연결 및 해당 객체 초기화 함수
  async initialize() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    const { queue } = await this.channel.assertQueue('', { exclusive: true });
    this.replyQueue = queue;
    // 응답을 보관하는 대기열 만드는것 주의!
    // 이름을 지정하지 않음 => 임의의 이름 할당, 대기열은 배타적이라 현재 활성 AMQP 연결에 바인딩 되어 연결이 닫힐 때 제거됨
    // 여러 대기열에 대한 라우팅이나 배포 불필요, 대기열을 익스체인지에 바인딩 할 필요 없음
    // 메시지가 응답 대기열에 직접 전달되어야 함

    this.channel.consume(this.replyQueue, msg => {    // replyQueue 의 대기열 소비 시작, ID로 핸들러 호출함
      const correlationId = msg.properties.correlationId;
      const handler = this.correlationMap.get(correlationId);
      if (handler) {
        handler(JSON.parse(msg.content.toString()));
      }
    }, { noAck: true });
  };

  // 요청 대기열의 이름과 보낼 메시지를 입력 받음
  send(queue, message) {
    return new Promise((resolve, reject) => {
      const id = nanoid();
      const replyTimeout = setTimeout(() => {
        this.correlationMap.delete(id);
        reject(new Error('Request Timeout!'));
      }, 10000);

      this.correlationMap.set(id, replyData => {    // 호출자에게 응답으로 반환하는 핸들러에 연결
        this.correlationMap.delete(id);
        clearTimeout(replyTimeout);
        resolve(replyData);
      });

      this.channel.sendToQueue(queue,
        Buffer.from(JSON.stringify(message)),
        { correlationId: id, replyTo: this.replyQueue },
      )
      // AMQP 에서 기본메시지와 함께 소비자에게 전달할 속성 지정 가능, 메타 데이터 개겣는 snedtoQueue 함수의 세번째 인수로 전달
      // 메시지 전송을 위해 channel.publish() 대신 sendToQueue 사용함!!
      // 익스체인지 Pub/Sub 분배 패턴이 아닌 목적지의 대기열로 바로 전달하는 p2p 통신이라 그럼
    })
  }

  destroy() {
    this.channel.close();
    this.connection.close();
  }

};