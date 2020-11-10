import produce from 'immer';
// import shortId from 'shortid';
// import faker from 'faker';

export const initialState = {
  mainPosts: [
    //   {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: '1번',
    //   },
    //   content: '첫번째 게시글 #해시태그 #익스프레스',
    //   Images: [{
    //     id: shortId.generate(),
    //     src: 'http://blog.jinbo.net/attach/615/200937431.jpg',
    //   }, {
    //     id: shortId.generate(),
    //     src: 'http://ww2.sjkoreancatholic.org/files/testing_image.jpg',
    //   }, {
    //     id: shortId.generate(),
    //     src: 'https://s-i.huffpost.com/gen/3948866/thumbs/o-PEPE-THE-FROG-570.jpg?3',
    //   }],
    //   Comments: [{
    //     id: shortId.generate(),
    //     User: {
    //       nickname: '2번말',
    //     },
    //     content: '달린다',
    //   }, {
    //     id: shortId.generate(),
    //     User: {
    //       nickname: '3번말',
    //     },
    //     content: '3번말 달린다',
    //   }],
    //   Likers: [],
    // }
  ],
  singlePost: null,
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false, // state 재사용
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  loadSinglePostLoading: false,
  loadSinglePostDone: false,
  loadSinglePostError: null,



  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  // 재사용 가능한거는 그냥 합치세요~
};

/*
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
    nickname: '궁예',
  },
});

 무한 스크롤    더이상 안씀
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
      content: faker.lorem.sentence,
    },
  }],
}));
*/

// 성능 최적화 위해서는 array 수천개로 만드는거를 추천 그게 더 대단한거임
// 하나도 끊김없이 처리되는것이 더 완성도 높은거임
// initialState.mainPosts = initialState.mainPosts.concat( // concat 을 할떄는 항상 대입을 해야 합니다!
//   Array(10).fill().map(() => ({
//     id: shortId.generate(),
//     User: {
//       id: shortId.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{
//       src: faker.image.image(),
//     }],
//     Comments: [{
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//         content: faker.lorem.sentence,
//       },
//     }],
//   })),
// );

// 동기 action 이라 하나만 만들어도 됨 서버까지 지우려면 알아서 해보고
// state 재사용 합니다! 한페이지에서 액션이 같이 사용되지 않을때는 상태가 공유되어도 상관없으면 state 축소 가능함
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';


export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST';
export const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';
export const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE';

export const LOAD_USER_POST_REQUEST = 'LOAD_USER_POST_REQUEST';
export const LOAD_USER_POST_SUCCESS = 'LOAD_USER_POST_SUCCESS';
export const LOAD_USER_POST_FAILURE = 'LOAD_USER_POST_FAILURE';

export const LOAD_HASHTAG_POST_REQUEST = 'LOAD_HASHTAG_POST_REQUEST';
export const LOAD_HASHTAG_POST_SUCCESS = 'LOAD_HASHTAG_POST_SUCCESS';
export const LOAD_HASHTAG_POST_FAILURE = 'LOAD_HASHTAG_POST_FAILURE';

// 리듀서: 이전 상태를 액션을 통해 다음 상태로 만드는 함수, 단 불변성 유지 필요
const reducer = (state = initialState, action) => produce(state, (draft) => {
  // state이름이 draft로 바뀜 막 바꿔도 됨, 알아서 불변성 유지해줌 우리는 그냥 편하게 바꾸면 됨
  switch (action.type) {
    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
      break;
    case RETWEET_SUCCESS: {
      draft.retweetLoading = false;
      draft.retweetDone = true;
      draft.mainPosts.unshift(action.data);
      break;
    }
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetError = action.error;
      break;

    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths = action.data;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;

    case LOAD_USER_POST_REQUEST:
    case LOAD_HASHTAG_POST_REQUEST:
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_USER_POST_SUCCESS:
    case LOAD_HASHTAG_POST_SUCCESS:
    case LOAD_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.concat(action.data);
      // 이건 손볼 필요가 있는듯
      draft.hasMorePost = draft.mainPosts.length % 10 === 0;
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      break;
    case LOAD_USER_POST_FAILURE:
    case LOAD_HASHTAG_POST_FAILURE:
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
      break;
    case LOAD_SINGLE_POST_REQUEST:
      draft.loadSinglePostLoading = true;
      draft.loadSinglePostDone = false;
      draft.loadSinglePostError = null;
      break;
    case LOAD_SINGLE_POST_SUCCESS:
      draft.singlePost = action.data;
      draft.loadSinglePostLoading = false;
      draft.loadSinglePostDone = true;
      break;
    case LOAD_SINGLE_POST_FAILURE:
      draft.loadSinglePostLoading = false;
      draft.loadSinglePostError = action.error;
      break;

    case ADD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case ADD_POST_SUCCESS:
      // unshift 함수로 배열 맨 앞에 추가
      draft.mainPosts.unshift(action.data);
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      // 필터는 그냥 쓰시고...
      console.log('action data: ', action);
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      // immer 적용 이전
      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;

      // return { ...state, mainPosts, }; }

      // immer 적용
      // 유저 id 랑nickname 이랑 붙혀서 넘겨야 되네? 그지같네?
      // params 로 들어오는거는 문자열로 들어옴
      const postIndex = draft.mainPosts.find((v) => v.id === action.data.PostId);
      console.log('postIndex', postIndex);
      postIndex.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

// export const addPost = (data) => ({
//   type: ADD_POST_REQUEST,
//   data,
// });

// export const addComment = (data) => ({
//   type: ADD_COMMENT_REQUEST,
//   data,
// });

export default reducer;
