import { CancelError } from "./cancelError";

export function createCancelWrapper() {
  let cancelRequested = false;

  function cancel() {
    cancelRequested = true;
  }

  function cancelWrapper(func, ...args) {
    if (cancelRequested) {
      // 이렇게도 넘길 수가 있네??
      return Promise.reject(new CancelError());
    }

    return func(...args);
  }

  return { cancelWrapper, cancel };
}