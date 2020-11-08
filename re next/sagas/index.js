import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:3000'; // back server pot
axios.defaults.withCredentials = true;

export default function* indexSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
