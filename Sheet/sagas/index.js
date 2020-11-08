import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import user from './user';
import board from './board';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function* indexSaga() {
  yield all([
    fork(user),
    fork(board),
  ]);
}