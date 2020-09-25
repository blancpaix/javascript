export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초'
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://discinsights.com/media/wysiwyg/disc-quad-01.png'
    }, {
      src: 'https://discinsights.com/media/wysiwyg/disc-quad-01.png'
    }, {
      src: 'https://discinsights.com/media/wysiwyg/disc-quad-01.png'
    }],
    Comments: [{
      User: {
        nickname: 'hero'
      },
      content: '얼른 ㅅㅂ'
    }, {
      User: {
        nickname: '이생키'
      },
      content: '뭐여 이건'
    }]
  }],
  imagePaths: [],
  postAdded: false
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: 'ADD_POST',
}

const dummyPost = {
  id: 2,
  content: '더이데이터임',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, mainPosts: [dummyPost, ...state.mainPosts], postAdded: true } // 이 순서대로 올려야 새것이 위로 올라옴
    default:
      return state;
  }
};

export default reducer;