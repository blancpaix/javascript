import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

// 모든 요청의 Url 앞에 이거 붙임
axios.defaults.baseURL = 'http://localhost:3001';
// withCredentials: true 다른곳에서 사용되는 중복 제거
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}


