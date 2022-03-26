import { createReplyChannel } from "./createReplyChannel.js";

const registerReplyHandler = createReplyChannel(process);

registerReplyHandler(req => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ sum: req.a + req.b });
    }, req.delay)
  })
});

process.send('ready');

/*
  전체 요청/응답 주기
  새로운 비동기 요청/응답 추상화를 사용해볼 준비가 됨, replier.js 샘플 응답자 만들어봐용

  요청 이후 일정 시간 후 결과 반환
  응답 순서가 요청을 보낸순서와 다를 수 있음
  모듈 마지막 줄은 요청을 수락할 준비가 됨을 나타냄 => 부모 프로세스로 보냄
*/