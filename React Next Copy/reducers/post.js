import produce from 'immer';

export const initialState = {
  loadPostsLoading: false, // load post
  loadPostsDone: false,
  loadPostsError: null,

  uploadImagesLoading: false, // upload Images
  uploadImagesDone: false,
  uploadImagesError: null,

  addPostLoading: false, // add post
  addPostDone: false,
  addPostError: null,
  deletePostLoading: false, // delete post
  deletePostDone: false,
  deletePostError: null,

  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  likePostLoading: false, // like
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, // unlike
  unlikePostDone: false,
  unlikePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  imagePaths: [],
  hasMorePost: false,
  mainPosts: [
    {
      id: 'test@test.com',
      User: {
        id: 'test@test.com',
        displayName: 'test1',
      },
      content: 'Dummy post #이건해시태그 #잘처리를해줘 #뭐라는거야 #ㅄ',
      Images: [{
        id: 1,
        src: 'http://blog.jinbo.net/attach/615/200937431.jpg',
      }, {
        id: 2,
        src: 'http://ww2.sjkoreancatholic.org/files/testing_image.jpg',
      }, {
        id: 3,
        src: 'https://s-i.huffpost.com/gen/3948866/thumbs/o-PEPE-THE-FROG-570.jpg?3',
      }],
      Comments: [{
        id: 'com_test1_001',
        User: {
          id: 'test@test.com',
          displayName: 'test1',
        },
        content: 'test1의 댓글1',
      }, {
        id: 'com_test1_002',
        User: {
          id: 'test@test.com',
          displayName: 'test1',
        },
        content: 'test1의 댓글2',
      }, {
        id: 'com_test1_003',
        User: {
          id: 'test@test.com',
          displayName: 'test1',
        },
        content: 'test1의 댓글3',
      }],
    },
  ],
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      // draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePost = draft.mainPosts.length % 10 === 0;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.laodPostError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      draft.imagePaths = action.data;
      break;
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostsLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostsLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      break;
    case ADD_POST_FAILURE:
      draft.addPostsLoading = false;
      draft.addPostError = action.error;
      break;
    case DELETE_POST_REQUEST:
      draft.deletePostLoading = true;
      draft.deletePostDone = false;
      draft.deletePostError = null;
      break;
    case DELETE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((el) => el.id !== action.data.PostId);
      draft.deletePostDone = true;
      draft.deletePostLoading = false;
      break;
    case DELETE_POST_FAILURE:
      draft.deletePostLoading = false;
      draft.deletePostError = action.error;
      break;

    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
      break;
    case RETWEET_SUCCESS:
      draft.retweetDone = true;
      draft.retweetLoading = false;
      draft.mainPosts.unshift(action.data);
      break;
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetError = action.error;
      break;

    case LIKE_POST_REQUEST:
    case LIKE_POST_SUCCESS:
    case LIKE_POST_FAILURE:
    case UNLIKE_POST_REQUEST:
    case UNLIKE_POST_SUCCESS:
    case UNLIKE_POST_FAILURE:
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      const postId = draft.mainPosts.find((v) => v.id === action.data.PostId);
      console.log('matcing postId: ', postId);
      postId.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.data;
      break;

    default:
      break;
  }
});

export default reducer;
