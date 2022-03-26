// 비동기 작업 취소
// 작업을 취소하거나 중복된 작업이 실ㄹ행 될 경우 유용함
// 다중 스레드 프로그래밍에서는 스레드를 종료할 수 있지만 단일스레드 플랫폼에서는 좀 복잡함

// 비동기에서는 간단함... 일단 샘플을 만들어봅시다잉

import { asyncRoutine } from './asyncRoutine.js';
import { CancelError } from './cancelError.js';

// 이 함수의 외부의 모든 코드는 cancelable() 함수가 이벤트 루프에 제어를 다시넘긴 후에만 cancelRequested 속성을 설정 가능하다
async function cancelable(cacelObj) {
  const resA = await asyncRoutine('A');
  console.log('resA', resA);
  if (cacelObj.cancelRequested) {
    throw new CancelError();
  };

  const resB = await asyncRoutine('B');
  console.log('resB', resB);
  if (cacelObj.cancelRequested) {
    throw new CancelError();
  };

  const resC = await asyncRoutine('C');
  console.log(resC);
};

const cancelObj = { cancelRequested: false };


cancelable(cancelObj)   // 이 함수가 이벤트 루프에 제어를 다시 넘긴 후에만 cancelRequest 속성을 설정 할 수 있음
  .catch(err => {
    if (err instanceof CancelError) {
      console.log('Function caceled');
    } else {
      console.error(err);
    }
  })

setTimeout(() => {
  cancelObj.cancelRequested = true;
  // 인스턴스의 내부 값을 바꾸면서 실행 취소
}, 100);
