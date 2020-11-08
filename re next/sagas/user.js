import axios from 'axios';
import { all, call, fork, put, throttle } from 'redux-saga/effects';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNIN_REQUEST,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
} from '../reducers/user';

function signupAPI(data) {
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
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.error,
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
      error: err.response.error,
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
      error: err.response.error,
    });
  }
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

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchSignin),
    fork(watchLogout),
  ]);
}
