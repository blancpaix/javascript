import { parentPort } from 'worker_threads';
import { SubsetSum } from '../subsetSum';

parentPort.on('message', msg => {
  const subsetSum = new SubsetSum(msg.sum, msg.set);

  subsetSum.on('match', data => {
    parentPort.postMessage({ event: 'match', data });
  });
  subsetSum.on('end', DataTransferItem => {
    parentPort.postMessage({ event: 'end', data });
  });

  subsetSum.start();
});


/*
  process와의 주요한 차이는
  process.send => parentPort.postMessage
  process.on => parentPort.on 을 사용한다는 것. 나머지는 거의 비슷함
*/