const METHOD_REQUIRING_CONNECTION = ['query'];
const deactivate = Symbol('deactivate');

class QueuingState {
  constructor(db) {
    this.db = db;
    this.commandsQueue = [];

    METHOD_REQUIRING_CONNECTION.forEach(methodName => {
      this[methodName] = function (...args) {
        console.log(`Command queued : `, methodName, args);

        return new Promise((resolve, reject) => {
          const command = () => {
            // db 인스턴스의 해당 함수의 호출 결과가 호출자에게 전달됨
            db[methodName](...args)
              .then(resolve, reject);
          }

          this.commandsQueue.push(command);
        })
      }
    })
  }

  // 이 함수는 QueuingState 가 활성화 될대(컴포넌트 초기화) 호출되어 큐의 모든 명령 실행
  [deactivate]() {
    this.commandsQueue.forEach(command => command());
    this.commandsQueue = [];
  }
};

