import axios from 'axios';
import { all, call, fork, put, throttle } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
} from '../reducers/board';

function loadPostsAPI(data) { // /board/boardID/101 뭐 이런식으로??
  return axios.get(`/board/${data.id}/`)
}
function* loadPosts(action) {
  try {
    yield put({

    })
  } catch (err) {
    yield put({
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
function* watchAddPost() {
  yield throttle(3000, ADD_POST_REQUEST, addPost);
}

export default function* boardSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
  ]);
}