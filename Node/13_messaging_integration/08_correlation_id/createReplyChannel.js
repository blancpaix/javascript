/*
  응답 추상화

  전체 패턴은 나중에 구현하고 일단 요청 채널의 상대편인 응답 채널 작동을 구현해봅시다.
  응답 핸들러를 감싸기위한 추상화가 구현될 createReplyChannel.js

  이 패턴은 node 에서 굉장히 쉽게 만들 수 있는거임
  단방향 채널위에 만들어진 비동기 요청/응답 통신은 다른 비동기 작업과 크게 다르지않음
  구현 세부사항을 감추는 추상화를 만드는거는 더욱 그러함
*/

export function createReplyChannel(channel) {

  return function registerHandler(handler) {
    channel.on('message', async message => {
      if (message.type !== 'request') {
        return;
      };

      const replyData = await handler(message.data);    // 새 요청 받으면 데이터 전달하고 핸들러 호출함
      channel.send({      // 등답을 반호나받으면 관련정보를 객체로 감싼 후 다시 채널에 전달
        type: 'response',
        data: replyData,
        inReplyTo: message.id,
      })
    })
  }
};