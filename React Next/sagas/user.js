// 리듀서는 합칠때 컴바인 리듀서로 했는데 이거느 그럴 필요 없어요

import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  CHANGE_DISPLAYNAME_REQUEST, CHANGE_DISPLAYNAME_SUCCESS, CHANGE_DISPLAYNAME_FAILURE,

  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAILURE,
  LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
} from '../reducers/user';

function loadMyInfoAPI() {
  // post put fetch 는 데이터 넘길 수 있음
  return axios.get('/user');
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfoAPI(userId) {
  // post put fetch 는 데이터 넘길 수 있음
  return axios.get(`/user/${userId}`);
}
function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    console.log('result 확인 : ', result);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) { // 이거는 제너레이터 아님.
  return axios.post('/user/login', data);
}
function* login(action) { // LOGIN_REQUEST의 action 자체가 함수의 매개변수로 전달됨
  try {
    console.log('saga Login 돌아요~');
    // 항상 effect 앞에는 yield 를 붙여주세요

    // 나중에 axios 해제 하면 밑에거 주석 푸셈
    const result = yield call(loginAPI, action.data); // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    // 이게 원래는 loginAPI(action.data) 이건데 call 은 이렇게 씁니다! 위에처럼!
    // effect들 앞에 yield 붙이는 이유는 테스트할때 saga 가 엄청 편함!!!  제너레이터가 테스트 하기 엄청 편함.
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.

    yield put({ // put 은 dispatch 임
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // putㅇ르 그냥 dispatch 처럼 생각하시고
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI); // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    // 항상 effect 앞에는 yield 를 붙여주세요
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.
    yield put({ // put 은 dispatch 임
      type: LOGOUT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI(data) {
  // post put fetch 는 데이터 넘길 수 있음
  return axios.post('/user', data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log('결과를 찍어보거라 ', result);
    yield delay(1000);

    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/unfollow`);
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_DISPLAYNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_DISPLAYNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get(`/user/followers/${data}`);
}
function* loadFollowers(action) {
  try {
    console.log('뭔데 이거는', action);
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get(`/user/followings?id=${data}`, data);
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`, data);
}
function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo); // while true 대신에 takeEvery 이거를 많이 씀
  // while take 동기, takeEvery 비동기 동작
}
function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login); // while true 대신에 takeEvery 이거를 많이 씀
  // while take 동기, takeEvery 비동기 동작
}
function* watchLogout() { // 이게 이벤트 리스너?? 같은 일을 하는데 치명적 단점이 밑의 take 가 일회용임,
  // 딱 한번만 받고 그다음 부터 이 이벤트 리스너가 없어짐 그래서 while(True){} 를 씀
  yield takeLatest(LOGOUT_REQUEST, logout);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_DISPLAYNAME_REQUEST, changeNickname);
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowerings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchSignup),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowerings),
    fork(watchRemoveFollower),
  ]);
}
