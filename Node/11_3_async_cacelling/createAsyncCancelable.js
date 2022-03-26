// 제너레이터를 사용할건데
// 크고 복잡한 취소 가능한 비동기 작업 구현에 이상적일 수도???

// 제너레이터를 사용하여 비동기 흐름을 제어하는 고나리자를 만들어서 씀
// 투명하게 취소할 수 있는 비동기 함수, await 가 yield 로 대체됨

import { CancelError } from "./cancelError";

export function createAsyncCancelable(generatorFunction) {

  return function asyncCancelbale(...args) {
    const generatorObject = generatorFunction(...args);
    let cancelRequested = false;

    function cancel() {
      cancelRequested = true;
    }

    const promise = new Promise((resolve, reject) => {
      async function nextStep(prevResult) {
        if (cancelRequested) {
          return reject(new CancelError());
        }

        if (prevResult.done) {
          return resolve(prevResult.value);
        }

        try {
          nextStep(generatorObject.next(await prevResult.value))
        } catch (err) {
          try {
            nextStep(generatorObject.throw(err));
          } catch (err2) {
            reject(err2);
          }
        }
      }
      nextStep({});
    })

    return { promise, cancel };
  }
};

