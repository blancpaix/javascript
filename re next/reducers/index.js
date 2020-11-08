import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('[HYDRATE]  -reducer/index \n', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

// export default rootReducer;

const ssrReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE \n', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export default ssrReducer;
