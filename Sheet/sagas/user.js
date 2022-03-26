import axios from 'axios';
import { all, call, fork, put, throttle } from 'redux-saga/effects';
import {
  CHECK_EMAIL_REQUEST, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  LOAD_CURRENT_SESSION_REQUEST, LOAD_CURRENT_SESSION_SUCCESS, LOAD_CURRENT_SESSION_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  FIND_ACCOUNT_REQUEST,
  FIND_ACCOUNT_SUCCESS,
  FIND_ACCOUNT_FAILURE,
} from '../reducers/user';

function checkEmailAPI(data) {
  return axios.get(`/user/checkEmail/${data}`);
}
function* checkEmail(action) {
  try {
    const result = yield call(checkEmailAPI, action.data);
    yield put({
      type: CHECK_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHECK_EMAIL_FAILURE,
      error: err.response.data
    });
  }
}
function findAccountAPI(data) {
  return axios.post('/user/findaccount', data);
}
function* findAccount(action) {
  try {
    const result = yield call(findAccountAPI, action.data);
    yield put({
      type: FIND_ACCOUNT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FIND_ACCOUNT_FAILURE,
      error: err.response.data
    });
  }
}
function signupAPI(data) {
  return axios.post('/user/signup', data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data
    });
  }
}

function signinAPI(data) {
  return axios.post('/user/signin', data);
}
function* signin(action) {
  try {
    const result = yield call(signinAPI, action.data);
    yield put({
      type: SIGNIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGNIN_FAILURE,
      error: err.response.data
    });
  }
}

function loadCurrentSessionAPI() {
  return axios.get('/user/currentsession');
}
function* loadCurrentSession(action) {
  try {
    const result = yield call(loadCurrentSessionAPI, action.data);
    yield put({
      type: LOAD_CURRENT_SESSION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CURRENT_SESSION_FAILURE,
      error: err.response.data
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}
function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data
    });
  }
}

function* watchCheckEmail() {
  yield throttle(3000, CHECK_EMAIL_REQUEST, checkEmail);
}
function* watchFindAccount() {
  yield throttle(3000, FIND_ACCOUNT_REQUEST, findAccount);
}
function* watchSignup() {
  yield throttle(3000, SIGNUP_REQUEST, signup);
}
function* watchSignin() {
  yield throttle(3000, SIGNIN_REQUEST, signin);
}
function* watchLoadCurrentSession() {
  yield throttle(3000, LOAD_CURRENT_SESSION_REQUEST, loadCurrentSession);
}
function* watchLogout() {
  yield throttle(3000, LOGOUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([
    fork(watchCheckEmail),
    fork(watchFindAccount),
    fork(watchSignup),
    fork(watchSignin),
    fork(watchLoadCurrentSession),
    fork(watchLogout),
  ]);
}