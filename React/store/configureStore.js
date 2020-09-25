import { createWrapper } from "next-redux-wrapper";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducer/index';

const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))  // 배포용
    : composeWithDevTools(applyMiddleware(...middlewares))  // 개발용 쌓이는 데이터 다 볼수있음
  const store = createStore(reducer, enhancer);

  store.dispatch({ type: 'CHANGE_NICKNAME', data: 'boogicho' });

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;