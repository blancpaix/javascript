import produce from 'immer';
import shortId from 'shortid';

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '1번',
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [{
      id: shortId.generate(),
      src: 'http://blog.jinbo.net/attach/615/200937431.jpg',
    }, {
      id: shortId.generate(),
      src: 'http://ww2.sjkoreancatholic.org/files/testing_image.jpg',
    }, {
      id: shortId.generate(),
      src: 'https://s-i.huffpost.com/gen/3948866/thumbs/o-PEPE-THE-FROG-570.jpg?3',
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        nickname: '2번말',
      },
      content: '달린다',
    }, {
      id: shortId.generate(),
      User: {
        nickname: '3번말',
      },
      content: '3번말 달린다',
    }],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '2번 말',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로',
  },
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// 리듀서: 이전 상태를 액션을 통해 다음 상태로 만드는 함수, 단 불변성 유지 필요
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }; // 앞에서 추가해야 위에서부터 나옴
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostError: action.error };
    case REMOVE_POST_REQUEST:
      return { ...state, removePostLoading: true, removePostDone: false, removePostError: null };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      }; // 앞에서 추가해야 위에서부터 나옴
    case REMOVE_POST_FAILURE:
      return { ...state, removePostLoading: false, removePostError: action.error };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS: {
      // 가독성이 그지같은데 불변성 유지하려면 이렇게라도... 메모리 절약  // 코딩에서는 편하게 하세요
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addPostDone: true,
      }; // 앞에서 추가해야 위에서부터 나옴
    }
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentError: action.error };
    default:
      return state;
  }
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export default reducer;
