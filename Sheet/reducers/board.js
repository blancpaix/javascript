import produce from 'immer';

export const initialState = {
  currentBoardPost: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostLoad
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      break;
    case ADD_POST_SUCCESS:
      break;
    case ADD_POST_FAILURE:
      break;
    default:
      break;
  }
});

export default reducer;