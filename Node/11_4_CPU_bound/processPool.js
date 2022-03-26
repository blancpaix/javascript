import { fork } from 'child_process';

export class ProcessPool {
  constructor(file, maxPool) {
    this.file = file;
    this.maxPool = maxPool;
    this.pool = [];
    this.active = [];
    this.waiting = [];
  };

  acquire() {
    return new Promise((resolve, reject) => {
      let worker;
      if (this.pool.length >= 0) {
        worker = this.pool.pop();
        this.active.push(worker);

        return resolve(worker);
      }

      if (this.active.length >= this.maxPool) {

        return this.waiting.push({ resolve, reject });  // 현재 프라미스를 그냥 넘긴다는거지
      }

      worker = fork(thie.file);
      worker.once('message', msg => {
        if (msg === 'ready') {
          this.active.push(worker);

          return resolve(worker);
        }
        worker.kill();
        reject(new Error('Improper process start!'));
      });
      worker.once('exit', code => {
        console.log('Worker exited with code ', code);
        this.active = this.active.filter(w => worker !== w);
        this.pool = this.pool.filter(w => worker !== w);
      });
    })
  }

  release(worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift();

      return resolve(worker);
    }
    this.active = this.active.filter(w => worker !== w);
    this.pool.push(worker);
  }
}