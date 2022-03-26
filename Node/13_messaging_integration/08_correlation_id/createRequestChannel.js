import { nanoid } from 'nanoid';

export function createRequestChannel(channel) {   // 채널을 감싸서 요청 보내고 응답 받는 sendRequest() 함수를 반환하는 팩토리
  const correlationMap = new Map();     // 나가는 요청과 응답핸들러 간의 연관성 저장!

  function sendRequest(data) {    // 새 요청을 보내는데 사용
    console.log(`Sending request`, data);

    return new Promise((resolve, reject) => {
      const correlationId = nanoid();   //  상관ID 생성

      const replyTimeout = setTimeout(() => {     // 10초 이후 요청 마감, 삭제
        correlationMap.delete(correlationId);
        reject(new Error('Request Timeout!'));
      }, 1000);

      correlationMap.set(correlationId, (replyData) => {    // 나중에 검색 가능
        correlationMap.delete(correlationId);
        clearTimeout(replyTimeout);
        resolve(replyData);   // 응답 데이터를 호출자에게 리턴하는 핸들러
      });

      channel.send({
        type: 'request',    // 메시지 유형 지정
        data,
        id: correlationId,
      });
    })
  }

  channel.on('message', msg => {    // 팩토리 호출 시 수신 메시지 리스닝도 시작
    const callback = correlationMap.get(msg.inReplyTo);   // 해당하는 것이 있으면 응답 핸들러에 대한 참조 가져와서 실행
    if (callback) {
      callback(msg.data);
    }
  });

  return sendRequest;
};