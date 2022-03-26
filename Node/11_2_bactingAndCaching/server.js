import { createServer } from "http";
// import { totalSales } from './totalSales.js';
import { totalSales } from './totalSalesBatch.js';

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const product = url.searchParams.get('product');
  console.log(`Processing query : ${url.search}`);

  const sum = await totalSales(product);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({
    product,
    sum
  }))
})
  .listen(8000, () => {
    console.log('Server started on 8000');
  });



/*

테스트
node populateDb.js       db 데이터 생성
node server.js        서버 실행
http://http://localhost:8000/?product=book 에서 확인

node loadTest.js        지연 시간 확인 (최적화 이전임);

Processing query :
totalSales() took : 562 ms.
Processing query :
totalSales() took : 537 ms.
Processing query : ?product=book
totalSales() took : 486 ms.
Processing query :
totalSales() took : 454 ms.
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
totalSales() took : 999 ms.
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
totalSales() took : 1930 ms.
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
totalSales() took : 2989 ms.
Processing query : ?product=book
Processing query : ?product=book
Processing query : ?product=book
totalSales() took : 3850 ms.
totalSales() took : 4206 ms.
totalSales() took : 4555 ms.
totalSales() took : 4858 ms.
totalSales() took : 5093 ms.
totalSales() took : 5211 ms.
totalSales() took : 5272 ms.
totalSales() took : 5285 ms.
totalSales() took : 5283 ms.
totalSales() took : 5179 ms.
totalSales() took : 5086 ms.
totalSales() took : 4988 ms.
totalSales() took : 4855 ms.
totalSales() took : 4724 ms.
totalSales() took : 4569 ms.
totalSales() took : 4389 ms.
totalSales() took : 4172 ms.

All completed in: 8217ms


첫번째 caching 처리 결과
Server started on 8000
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 643 ms.
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 611 ms.
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 591 ms.
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 557 ms.
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 501 ms.
Processing query : ?product=book
Processing query : ?product=book
Batching
Processing query : ?product=book
Batching
totalSales() took : 503 ms.
Processing query : ?product=book
totalSales() took : 488 ms.

All completed in: 4431ms


ㄴ

*/