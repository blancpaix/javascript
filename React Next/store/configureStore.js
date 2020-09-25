import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// 로깅 미들웨어  redux devtool 대체??
const loggerMw = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  next(action);
};
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMw];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // 이게 뭐임 root Reducer 처럼 설정하는거임
  store.dispatch({
    type: 'CHANGE_NICKNAME', data: '마구니 철퇴',
  });

  return store;
};

// const opts = createWrapper().withRedux(); 이렇게 구성되어서 _app에서 withRedux 로 감싸지는거
// 두번째는 옵션 객체
const wrapper = createWrapper(configureStore,
  { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
