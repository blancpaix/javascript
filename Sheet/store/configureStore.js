import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';

import indexReducer from '../reducers'
import indexSaga from '../sagas';

const loggerMW = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  next(action);
};

const configureStore = () => {
  const sagaMiddleware = reduxSaga();
  const middlewares = [sagaMiddleware, loggerMW];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(indexReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(indexSaga);

  return store;
};

const wrapper = createWrapper(configureStore,
  { debug: process.env.NODE_ENV === 'development' });

export default wrapper;

