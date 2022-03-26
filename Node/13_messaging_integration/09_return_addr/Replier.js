// 요청자와응답자의 구현
// 시스템 시험 준비가 가됨, 샘플 요청자와 응답자 쌍을 만들어 새로 구현한 추상화 모듈 사용법을 봐요

import { AMQPReply } from './amqpReply.js';

async function main() {
  const reply = new AMQPReply('requests_queue');
  await reply.initialize();

  reply.handleRequests((req) => {
    console.log(`Request received : `, req);
    return { sum: req.a + req.b };
  })
}

main().catch(err => console.error(err));

/*
  추상화를 토앻 상관 ID 와 반환 주소를 처리한느 모든 메커니즘을 숨길 수있다는것을 확인 할 수있지
  해야 할것은 대기열이름 'request_queue'를 지정, 새롱누 reply 객체를 초기화하는거
  나머지 코드는 간단하고 실제 샘플 응답자는 입력으롭 다은 ㄴ두 숫자의 합계를 계산 후 결과를 객체로 반환하는거임

*/
