import { EventEmitter } from "events";

/*
// 성공적으로 초기화 될 경우 활성화됨. 초기화 상태에 대해 걱정을 해야 함
class DB extends EventEmitter {
  connected = false;

  connect() {
    setTimeout(() => {
      this.connect = true;
      this.emit('connected');
    }, 500);
  }

  async query(queryString) {
    if (!this.connect) {
      throw new Error("Not Connected Yet!");
    }
    console.log(`Query executed :  ${queryString}`);
  }
}

export const DB = new DB();
*/


/*
// 사전 초기화방식 - 1 여기서 직접 돌리는 방식인가
class DB extends EventEmitter {
  connected = false;
  commandedQueue = [];

  async query(queryString) {
    if (!this.connected) {
      console.log(`Request queued : ${queryString}`);

      return new Promise((res, rej) => {
        const command = () => {
          this.query(queryString)     // 이게 뭔지 이해하기 다소 어렵다...ㅜㅠ
            .then(res, rej);
        };

        this.commandedQueue.push(command);
      })
    }

    console.log(`Query executed : ${queryString}`);
  }

  connect() {
    // simulate the delay of the connecton
    setTimeout(() => {
      this.connect = true;
      this.emit('connected');
      this.commandedQueue.forEach(command => command());
      this.commandedQueue = [];
    }, 500);
  }
}

export const db = new DB();

*/
