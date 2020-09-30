import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {} from '../reducers/user';

function sampleAPI() {
  return axios.get('/user/sample');
}
function* sample(action) {
  try {
    const result = yield call(sampleAPI, action.data);
    yield put({
      type: 'SAMPLE_FUNC_SUCCESS',
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: 'SAMPLE_FUNC_FAILE',
      error: err.response.data,
    })
  }
}

function* watchSample() {
  yield takeLatest('SAMPLE_FUNC_REQUEST', sample);
};

export default function* userSaga() {
  yield all([
    fork(watchSample)
  ]);
};