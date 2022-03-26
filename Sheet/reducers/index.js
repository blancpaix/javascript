import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import board from './board';

const ssrReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE \n', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        board,
      });

      return combineReducer(state, action);
    }
  }
};

export default ssrReducer;