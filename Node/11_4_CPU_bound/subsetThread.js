import { EventEmitter } from "events";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { ThreadPool } from "./threadPool";

const __dirname = dirname(fileURLToPath(import.meta.url));  // absolute path
// 이 부분이 차이가 나는데... 파일만 차이나는거님?
const workerFile = join(__dirname, 'workers', 'subsetSumThreadWorker.js');
const workers = new ThreadPool(workerFile, 2);

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await workers.acquire();
    // 여기가 다르다는거여
    // worker.send({ sum: this.sum, set: this.set });
    worker.postMessage({ sum: this.sum, set: this.set });

    const onMessage = msg => {
      if (msg.event === 'end') {    // 이벤트 완료 시 수신,
        worker.removeListener('messgae', onMessage);
        workers.release(worker);    // 워커를 제거하고 다시 pool 에 담음
      }

      this.emit(msg.event, msg.data);   // 작업자 프로세스는 {..., ...} 형식의 메시지 생성하여 전달
    };

    worker.on('message', onMessage);
  }
}


// 작업자 스레드가 완전한 node 프로세스와 많은 공통점을 가지고 있느데... 뭔 차이인지는 사실 나도 잘 모르겟음