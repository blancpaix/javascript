import produce from 'immer';

export const initialState = {
  boardPosts: [],
  selectedPost: [],
  imagePath: [],

  loadPostsLoad: false,
  loadPostsDone: false,
  loadPostsError: null,
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const FILTERING_POST = 'FILTERING_POST';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoad = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoad = false;
      draft.loadPostsDone = true;
      draft.boardPosts = action.data;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoad = false;
      draft.loadPostsDone = false;
      draft.loadPostsError = action.error;
      break;
    case FILTERING_POST:
      draft.selectedPost = draft.boardPosts.find((v) => v.id === action.data);
      break;
    case UPLOAD_IMAGE_REQUEST:
      draft.uploadImageLoad = true;
      draft.uploadImageDone = false;
      draft.uploadImageError = null;
      break;
    case UPLOAD_IMAGE_SUCCESS:
      draft.uploadImageLoad = false;
      draft.uploadImageDone = true;
      draft.imagePath = action.data;
      break;
    case UPLOAD_IMAGE_FAILURE:
      draft.uploadImageLoad = false;
      draft.uploadImageDone = false;
      draft.uploadImageError = action.error;
      break;
    case REMOVE_IMAGE:
      draft.imagePath = draft.imagePath.filter((v, i) => i !== action.data);
    case ADD_POST_REQUEST:
      draft.addPostLoad = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoad = false;
      draft.addPostDone = true;
      draft.boardPosts.unshift(action.data);
      draft.imagePath = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoad = false;
      draft.addPostDone = false;
      draft.addPostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;