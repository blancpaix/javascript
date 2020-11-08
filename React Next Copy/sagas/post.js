import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
} from '../reducers/post';

function sampleAPI() {
  return axios.get('/user/sample');
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

function loadPostsAPI() {
  return null;
}
function* loadPosts(action) {
  try {
    console.log('action \n', action);
    // const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,

    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.repsonse.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/image', data);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.repsonse.data,
    });
  }
}

function addPostAPI(data) {
  console.log('data // ', data);
  return axios.post('/post', data);
}
function* addPost(action) {
  try {
    console.log('action.data // ', action.data);
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    // yield put({
    //   type: ADD_MY_POST,
    //   data: result.data.id,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.repsonse.data,
    });
  }
}

function deletePostAPI(data) {
  return null;
}
function* deletePost(action) {
  try {
    // const result = yield call(deletePostAPI, action.data);
    yield put({
      type: DELETE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_POST_FAILURE,
      error: err.repsonse.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post('/rewteet', data);
}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI() {
  return null;
}
function* likePost(action) {
  try {
    // const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI() {
  return null;
}
function* unlikePost(action) {
  try {
    // const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return null;
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
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

function* watchSample() {
  yield takeLatest('SAMPLE_FUNC_REQUEST', sample);
}
function* watchLoadPosts() {
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchUploadImages() {
  yield throttle(3000, UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchAddPost() {
  yield throttle(3000, ADD_POST_REQUEST, addPost);
}
function* watchDeletePost() {
  yield throttle(3000, DELETE_POST_REQUEST, deletePost);
}
function* watchRetweet() {
  yield throttle(3000, RETWEET_REQUEST, retweet);
}
function* watchLikePost() {
  yield throttle(3000, LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield throttle(3000, UNLIKE_POST_REQUEST, unlikePost);
}
function* watchAddComment() {
  yield throttle(3000, ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchSample),
    fork(watchLoadPosts),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchRetweet),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
  ]);
}
