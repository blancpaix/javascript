// 동일한 요청이 보류중일  경우 새 요청을 시작하는 대신 요청이 완료될때까지 기다림
// 프람스로 구현
// 맵에 저장, 이미 존재하면 그대로 하고 없으면 새 요청

import { totalSales as totalSalesRaw } from './totalSales.js';

const runningRequests = new Map();

export function totalSales(product) {
  if (runningRequests.has(product)) {
    console.log('Batching');

    return runningRequests.get(product);
  };

  const resultPromise = totalSalesRaw(product);
  runningRequests.set(product, resultPromise);

  resultPromise.finally(() => {
    // 이거는 그냥 요청이 완료되면 캐시에서 삭제됨.. 짧음
    runningRequests.delete(product);
  });

  return resultPromise;
};

// 이 모듈은 사실상 프록시임
// 프라미스가 이미 존재할 경우 해당 프라미스를 되돌려줌 => 이미 시행중인 요청에 편승함

// API 에 대해 여러 호출이 일과로 처리됨. 시간과 리소스를 절약 할 수 있음
