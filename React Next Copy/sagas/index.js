import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import user from './user';
import post from './post';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredntials = true;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(post),
  ]);
}
