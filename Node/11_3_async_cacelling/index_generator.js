import { asyncRoutine } from './asyncRoutine.js';
import { CancelError } from './cancelError.js';
import { createAsyncCancelable } from './createAsyncCancelable';

const cancelable = createAsyncCancelable(function* () {
  const resA = yield asyncRoutine('A');
  console.log(resA);
  const resB = yield asyncRoutine('B');
  console.log(resB);
  const resC = yield asyncRoutine('C');
  console.log(resC);
});

const { promise, cancel } = cancelable();

promise.catch(err => {
  if (err instanceof CancelError) {
    console.log('Funciton canceled');
  } else {
    console.log(err);
  }
});

setTimeout(() => {
  cancel();
}, 100);

// 취소 가능한 비동기 작업 구현에 최상의 방법임, 제너레이터가 그럼 ㅎㅎ