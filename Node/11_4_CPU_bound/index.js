import { createServer } from 'http';
// import { SubsetSum } from './subsetSum';
// import { SubsetSum } from './subsetFork';
import { SubsetSum } from './subsetThread';

createServer((req, res) => {
  const url = new URL(req, url, 'http://localhost');
  if (url.pathname !== '/subsetSum') {
    res.writeHead(200);
    return res.end('I\'m alived! \n');
  }

  const data = JSON.parse(url.searchParams.get('data'));
  const sum = JSON.parse(url.searchParams.get('sum'));
  res.writeHead(200);
  const subsetSum = new SubsetSum(sum, data);
  subsetSum.on('match', match => {
    res.write(`Match : ${JSON.stringify(match)}\n`);
  });
  subsetSum.on('end', () => res.end());

  subsetSum.start();
}).listen(8000, () => { console.log('server on 8000') });


/*
  여기서 구현한것은 간단하게 하기 위해서 시간 초과, 오류 처리, 적절한 매커니즘을 생략했는데 실제 용도라면 라이브러리 사용하는것이 좋음

  실행할 수 잇는 알고리듬이 복잡하거나 cpu 바인딩 작업 수가 단일 노드의 용량을 초과하는 경우, 여러 노드에 걸쳐 계산을 확장하는것을 고려해야 함!
*/