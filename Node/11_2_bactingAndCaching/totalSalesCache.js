import { totalSales as totalSalesRaw } from './totalSales.js';

const CACHE_TTL = 30 * 1000; // 30 seconds
const cache = new Map();

export function totalSales(product) {
  if (cache.has(product)) {
    console.log('Cache hit');

    return cache.get(product);
  }

  const resultPromise = totalSalesRaw(product);
  cache.set(product, resultPromise);

  resultPromise.then(() => {
    // 특정 시간 간격을 두고 캐시 삭제
    setTimeout(() => {
      cache.delete(product);
    }, CACHE_TTL);
  }, err => {
    cache.delete(product);
    throw err;
  });

  return resultPromise;
};
