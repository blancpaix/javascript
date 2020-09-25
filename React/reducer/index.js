import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';

import { combineReducers } from 'redux';

// (이전상태, 액션) => 다음 상태
// const rootRecuder = (state = initialState, action) => {
const rootRecuder = combineReducers({  // 리듀서 합쳐주는거임... 리듀서는 함수라서 쉽게 못합쳐줌 그래서이런거 씀
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      case 'CHANGE_NICKNAME':
        return { ...state, name: action.data }
      default:
        return state;
    }
  },
  user,
  post,
});

// const changeNickname = {
//   type: 'CHANGE_NICKNAME',
//   data: 'boogicho',
// };

// action creator
const changeNicname = (data) => {
  return { type: 'CHANGE_NICKNAME', data }
};


// store.dispatch(changeNickname('mighty tak'));

// redux - saga 비동기 action creator... 이랍니다 async..!! 다음시간에 다루겠습니다 ㅎㅎㅎㅎ

export default rootRecuder;


