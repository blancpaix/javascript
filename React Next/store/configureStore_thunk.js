import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

// 로깅 미들웨어  redux devtool 대체??
const loggerMw = ({ dispatch, getState }) => next => action => {
  console.log(action);
  return next(action);
};

// 여기는 일반 리덕스랑 비슷함
const configureStore = () => {
  const middlewares = [thunkMiddleware, loggerMw];
  const enhancer = process.env.NODE_ENV === 'production'    // 리덕스 기능이 확장된것이라 enhancer 임
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))    // 개발용일때만 사용, 배열 안에는 saga, sunk 들어감   // 이거는 dev middleware 을 넣어준거임
  const store = createStore(reducer, enhancer);

  return store;
};

// 두번째는 옵션 객체
const wrapper = createWrapper(configureStore,
  { debug: process.env.NODE_ENV === 'development' });

export default wrapper;