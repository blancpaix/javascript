import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';

// (이전상태, 액션) => 다음상태
// const rootReducer = (state = initialState, action) => {    // 함수를 합치는거는 쉽지가 않음 그래서 라이브러리 슴
// 이전의 initialState 쪼갠거는 combineReducers 이 알아서 합쳐줌

/* state tree 에서 구조가 잘못 잡힌거는 rootReducer 가 잘못된거임 state 중 index가 존재
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: // HYDRATE 를 위해서 index reducer 을 추가한다?? SSR 을 위해서??
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      // next SSR 시작하면서 HYDRATE 사용
      case 'CHNAGE_NICKNAME':
        return { ...state, name: action.data };
      default:
        return state;
    }
  },
  user,
  post,
});

이게 똑같은건데 위에게 좀더 복잡하게 해서 HYDRATE 넣어줄 수 잇음
const combReducer = combineReducers({
  user,
  post,
});

async actions creator...

actions creator
const changeNickname = (data) => ({
  type: 'CHNAGE_NICKNAME', data,
});

*/

// 이렇게 해야 현재 리듀서의 상태를 모두 덮어씌울 수 있음
const ssrReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default ssrReducer;
