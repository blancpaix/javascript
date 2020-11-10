import axios from 'axios';
import { all, call, fork, put, throttle } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE
} from '../reducers/board';

function loadPostsAPI(data) { // /board/boardID/101 뭐 이런식으로??
  return axios.get(`/board?lastId=${data || 0}`)
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: action.error
    })
  }
}

function uploadImageAPI(data) {
  return axios.post('/board/uploadImage', data)
}
function* uploadImage(action) {
  try {
    const result = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      data: action.error,
    })

  }
}
function addPostAPI(data) {
  return axios.post('/board', data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: action.error
    });
  }
}

function* watchLoadPosts() {
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchUploadImage() {
  yield throttle(3000, UPLOAD_IMAGE_REQUEST, uploadImage);
}
function* watchAddPost() {
  yield throttle(3000, ADD_POST_REQUEST, addPost);
}

export default function* boardSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadImage),
    fork(watchAddPost),
  ]);
}