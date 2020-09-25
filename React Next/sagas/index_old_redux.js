// 가장 중요한 파일 제너레이터 * 이거는 뭥미 function* rootSaga() 제너레이터 조금 알아야 할듯??
// 자기만의 패턴을 만들어서 계속해서 만드는데 제너레이터도 함수임

import axios from 'axios';
import { all, fork, call, takeLatest, delay, takeEvery, put } from 'redux-saga/effects';
// 뭐하는건지는 잘 모르겠지만 fork 랑 call 이랑 명확하게 구분을 하고 사용해야 함
// 스크롤링 => 스로틀링, 검색창에 한글자 마다 검색결과 바뀜 -> 디바운스   블로그 읽어보세요
// 스로틀링 : 마지막 함수 호출 후 일정 시간 지나기 전 다시 호출 X
// 디바운싱 : 연이어 호출되는 함수 중 마지막 함수만 호출

function loginAPI(data, a, b, c) { // 이거는 제너레이터 아님.
  return axios.post('/api/login', data);
}
function* login(action) { // LOGIN_REQUEST의 action 자체가 함수의 매개변수로 전달됨
  try {
    // 항상 effect 앞에는 yield 를 붙여주세요
    const result = yield call(loginAPI, action.data, 'a', 'b', 'c'); // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    // 이게 원래는 loginAPI(action.data) 이건데 call 은 이렇게 씁니다! 위에처럼!
    // effect들 앞에 yield 붙이는 이유는 테스트할때 saga 가 엄청 편함!!!  제너레이터가 테스트 하기 엄청 편함.
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.
    yield put({ // put 은 dispatch 임
      type: 'LOGIN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOGIN_FAILURE',
      data: err.response.data,
    });
  }
}
function* watchLogin() {
  yield takeEvery('LOGIN_REQUEST', login); // while true 대신에 takeEvery 이거를 많이 씀
  // while take 동기, takeEvery 비동기 동작
}

function logoutAPI() {
  return axios.post('/api/logout');
}
function* logout() {
  try {
    yield delay(1000); // setTimeout 이랑 비슷     서버 없을때는 이걸로 비동기적 효과를 줄게요
    // const result = yield call(addPostAPI, action.data);

    // 항상 effect 앞에는 yield 를 붙여주세요
    const result = yield call(logoutAPI); // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.
    yield put({ // put 은 dispatch 임
      type: 'LOGOUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOGOUT_FAILURE',
      data: err.response.data,
    });
  }
}
function* watchLogout() { // 이게 이벤트 리스너?? 같은 일을 하는데 치명적 단점이 밑의 take 가 일회용임,
  // 딱 한번만 받고 그다음 부터 이 이벤트 리스너가 없어짐 그래서 while(True){} 를 씀
  yield takeEvery('LOGOUT_REQUEST', logout);
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}
function* addPost(action) {
  try {
    // 항상 effect 앞에는 yield 를 붙여주세요
    const result = yield call(addPostAPI, action.data); // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.
    yield put({ // put 은 dispatch 임
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}
function* watchAddPost() {
  // yield takeEvery('ADD_POST_REQUEST', addPost); // 두번 누르는거 다 들어옴
  yield takeLatest('ADD_POST_REQUEST', addPost); // 마지막 요청만 실행   // 완료된것은 그대로 두고 실행을 하는데, 동시에 로딩중인것은 선택적으로 삭제
  // 프론트에서만 그렇게 생각을 하는거임  서버에서는 2개 들어온거를 처리하는데.. 요청은 잘 들어오고 응답을 막는거임 프론트에서 받는것만 2개 이상 연달아오는것을 막는것
  // 서버에서 똑같은 요청이 있는지 필터링을 해줘야 함   그냥 서버에서 필터링 하세요. DDOS 처럼 될것 같다! 그러면 쓰로틀 씀
  // yield takeLeading('ADD_POST_REQUEST', addPost);  // 첫번째 요청만 실행
  // yield throttle('ADD_POST_REQUEST', addPost, 2000);  // 2초 동안 addPost request 를 한번만 실행하도록  근데 특수한 경우에 쓰고 보통 takeLatest 씀
}

export default function* rootSaga() {
  // all 은 배열을 받는데 여기 안에 있는거 한번에 다 실행   동시  실행
  yield all([
    fork(watchLogin), // fork/call 는 함수를 실행한다는 거인듯?? // call 도 돌아가는데 정확하게는 다름
    fork(watchLogout),
    fork(watchAddPost),
  ]);
}
