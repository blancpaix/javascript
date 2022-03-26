import { EventEmitter } from "events";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { ProcessPool } from "./processPool";

const __dirname = dirname(fileURLToPath(import.meta.url));  // absolute path
const workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js');
const workers = new ProcessPool(workerFile, 2);

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await workers.acquire();
    worker.send({ sum: this.sum, set: this.set });

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