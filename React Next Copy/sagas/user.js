import axios from 'axios';
import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_FAILURE, SIGNIN_SUCCESS,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  CHANGE_DISPLAYNAME_REQUEST, CHANGE_DISPLAYNAME_SUCCESS, CHANGE_DISPLAYNAME_FAILURE,
} from '../reducers/user';

function sampleAPI() {
  // return axios.get('/user/sample');
  return null;
}
function* sample(action) {
  try {
    const result = yield call(sampleAPI, action.data);
    yield put({
      type: 'SAMPLE_FUNC_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: 'SAMPLE_FUNC_FAILE',
      error: err.response.data,
    });
  }
}

function loadMyInfoAPI() {
  return null;
}
function* loadMyInfo(action) {
  try {
    // const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI(data) {
  console.log('what the data? ', data);
  return axios.post('/user', data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);

    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function signinAPI(data) {
  return axios.post('/user/login', data);
}
function* signin(action) {
  try {
    const result = yield call(signinAPI, action.data);
    yield put({
      type: SIGNIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}
function* logout() {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function changeDisplayNameAPI(data) {
  return axios.post('/user/displayname', data);
}
function* changeDisplayName(action) {
  try {
    const result = yield call(changeDisplayNameAPI, action.data);
    yield put({
      type: CHANGE_DISPLAYNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_DISPLAYNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSample() {
  yield takeLatest('SAMPLE_FUNC_REQUEST', sample);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchSignup() {
  yield throttle(3000, SIGNUP_REQUEST, signup);
}
function* watchSignin() {
  yield throttle(3000, SIGNIN_REQUEST, signin);
}
function* watchLogout() {
  yield throttle(3000, LOGOUT_REQUEST, logout);
}
function* watchChangeDispalyName() {
  yield throttle(3000, CHANGE_DISPLAYNAME_REQUEST, changeDisplayName);
}

export default function* userSaga() {
  yield all([
    fork(watchSample),
    fork(watchLoadMyInfo),
    fork(watchSignup),
    fork(watchSignin),
    fork(watchLogout),
    fork(watchChangeDispalyName),
  ]);
}
