import { once } from 'events';
import { db } from './db';

// 지연 초기화 방법, 별로 추천하고 싶지는 않음
db.connect();

async function updateLatestAccess() {
  if (!db.connect) {
    await once(db, 'connected');
  }

  await db.query(`INSERT (${Date.now}) INTO "LastAcceses`);
}

updateLatestAccess();
setTimeout(() => {
  updateLatestAccess();
}, 600);


// 지연시작
async function initialize() {
  db.connect();
  await once(db, 'connected');
};

async function updateLatestAccess() {
  await db.query(`INSERT (${Date.now}) INTO "LastAcceses`);
};

initialize()
  .then(() => {
    updateLatestAccess();
    setTimeout(() => {
      updateLatestAccess();
    }, 600);
  });


// 위의 것들의 단점 : 모든 컴포넌트를 미리 알아둬야 함 => 실수 유발
// 프로그램 시작 시간 지연 초래

