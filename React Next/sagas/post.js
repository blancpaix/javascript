import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  // generateDummyPost,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  LOAD_SINGLE_POST_REQUEST, LOAD_SINGLE_POST_SUCCESS, LOAD_SINGLE_POST_FAILURE,
  LOAD_USER_POST_REQUEST, LOAD_USER_POST_SUCCESS, LOAD_USER_POST_FAILURE,
  LOAD_HASHTAG_POST_REQUEST, LOAD_HASHTAG_POST_SUCCESS, LOAD_HASHTAG_POST_FAILURE,
} from '../reducers/post';

function loadPostAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
  // get은 두번쨰 자리가 withCredential위치라서 데이터 넣는 공간이 없음
  // 그래서 get으로 데이터를 보낼때는 ?key=value 쿼리스트링으로 보냄 => 데이터 캐싱이 되어 좋음
}
function* loadPost(action) {
  try {
    // yield delay(1000);
    const result = yield call(loadPostAPI, action.lastId);
    yield put({
      type: LOAD_POST_SUCCESS,
      // action.data 는 id 가 들어감
      // data: generateDummyPost(10),
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPostAPI(data, lastId) {
  return axios.get(`/posts/${data}?lastId=${lastId || 0}`);
}
function* loadUserPost(action) {
  try {
    const result = yield call(loadUserPostAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadHashtagPostAPI(data, lastId) {
  // 한글 특수문자 쿼리 전송시 encodedURIComponent 사용 필요
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* loadHashtagPost(action) {
  console.log('logHashTag conolse');
  try {
    const result = yield call(loadHashtagPostAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('에러!', err);
    yield put({
      type: LOAD_HASHTAG_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadSinglePostAPI(data) {
  return axios.get(`/post/${data}`);
}
function* loadSinglePost(action) {
  try {
    const result = yield call(loadSinglePostAPI, action.data);
    yield put({
      type: LOAD_SINGLE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SINGLE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data); // formData 라서 바로 보냄
}
function* addPost(action) {
  try {
    // 항상 effect 앞에는 yield 를 붙여주세요
    // 여기서 서버 요청 실패하면 바로 캐치의 yield 로 넘어감
    const result = yield call(addPostAPI, action.data);

    // fork 는 비동기 함수 호출, call 은 동기 함수 호출
    // call 은 모든 작업 완료 까지 기다림 loginAPI가 반응할때 까지 기다림 // call은 .then 이 붙음 await 이랑 비슷?? ㅇㅇㅇ
    // fork 는 바로 다음것이 실행됨. 논 블로킹임.
    yield put({ // put 은 dispatch 임
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      // action.data 는 id 가 들어감
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data, {
    withCredentials: true, // 이걸 넣어줘야 다른 포트간 쿠키 전송 가능 나중에 다넣어줄겨 지금은 공통으로 뺌
  });
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  console.log('data -undefined', data);
  return axios.patch(`/post/${data}/like`); // 일부분 수정이라 patch
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    // postId, UserId in result Obj
    console.log('result', result);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`); // 일부분 수정이라 patch
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data); // form Data 는 {}로 감싸면 안됨 json 이 되어버림. 그래서 폼데이터는 그대로 들어가야함
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchLoadPost() {
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
}
function* watchLoadUserPost() {
  yield throttle(2000, LOAD_USER_POST_REQUEST, loadUserPost);
}
function* watchLoadHashtagPost() {
  yield throttle(2000, LOAD_HASHTAG_POST_REQUEST, loadHashtagPost);
}
function* watchLoadSinglePost() {
  yield throttle(2000, LOAD_SINGLE_POST_REQUEST, loadSinglePost);
}
function* watchAddPost() {
  // yield takeEvery('ADD_POST_REQUEST', addPost); // 두번 누르는거 다 들어옴
  yield takeLatest(ADD_POST_REQUEST, addPost);
  // takeLatest - 마지막 요청만 실행   // 완료된것은 그대로 두고 실행을 하는데, 동시에 로딩중인것은 선택적으로 삭제
  // 프론트에서만 그렇게 생각을 하는거임  서버에서는 2개 들어온거를 처리하는데.. 요청은 잘 들어오고 응답을 막는거임 프론트에서 받는것만 2개 이상 연달아오는것을 막는것
  // 서버에서 똑같은 요청이 있는지 필터링을 해줘야 함   그냥 서버에서 필터링 하세요. DDOS 처럼 될것 같다! 그러면 쓰로틀 씀
  // yield takeLeading('ADD_POST_REQUEST', addPost);  // 첫번째 요청만 실행
  // yield throttle('ADD_POST_REQUEST', addPost, 2000);
  // 2초 동안 addPost request 를 한번만 실행하도록  근데 특수한 경우에 쓰고 보통 takeLatest 씀
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment); // take 를 하면 안돌고 takeLatest 를 하면 돌아가네??
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages); // take 를 하면 안돌고 takeLatest 를 하면 돌아가네??
}
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet); // take 를 하면 안돌고 takeLatest 를 하면 돌아가네??
}

// 스로틀을 쓰든 latest를 쓰든 요청은 다 간다!

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),

    fork(watchUploadImages),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),

    fork(watchRetweet),
    fork(watchLoadUserPost),
    fork(watchLoadHashtagPost),
    fork(watchLoadSinglePost),



  ]);
}
