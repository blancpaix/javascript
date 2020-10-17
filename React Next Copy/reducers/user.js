import produce from 'immer';

const dummyUser = (data) => ({
  ...data,
  displayName: 'DUMMYUSER',
  post: [{ id: 1 }],
  Followings: [{ id: 9900, displayName: '9900' }, { id: 9910, displayName: '9910' }],
  Followers: [{ id: 9900, displayName: '9900' }, { id: 9910, displayName: '9910' }],
});

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const CHANGE_DISPLAYNAME_REQUEST = 'CHANGE_DISPLAYNAME_REQUEST';
export const CHANGE_DISPLAYNAME_SUCCESS = 'CHANGE_DISPLAYNAME_SUCCESS';
export const CHANGE_DISPLAYNAME_FAILURE = 'CHANGE_DISPLAYNAME_FAILURE';

export const initialState = {
  me: null,
  userInfo: null,
  signUpData: {},
  loginData: {},

  signupLoading: false,
  signupDone: false,
  signupError: null,
  signInLoading: false,
  signInDone: false,
  signInError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  changeDisplayNameLoading: false,
  changeDisplayNameDone: false,
  changeDisplayNameError: null,
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      break;
    case SIGNUP_FAILURE:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break;
    // 이거 로그인하고 loadMyINfo 하고 같은 작업인데 뭐 하러 이렇게 쓰는거임?
    case SIGNIN_REQUEST:
      draft.signInLoading = true;
      draft.signInDone = false;
      draft.signInError = null;
      break;
    case SIGNIN_SUCCESS:
      draft.signInLoading = false;
      draft.signInDone = true;
      draft.me = action.data;
      break;
      // return { ...state, me: dummyUser(action.data) };
    case SIGNIN_FAILURE:
      draft.signInLoading = false;
      draft.signInError = action.error;
      break;
    case LOGOUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break;
      // return { ...state, me: null };
    case LOGOUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutError = action.error;
      break;

    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = false;
      draft.loadMyInfoError = null;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;

    case CHANGE_DISPLAYNAME_REQUEST:
      draft.changeDisplayNameLoading = false;
      draft.changeDisplayNameDone = false;
      draft.changeDisplayNameError = null;
      break;
    case CHANGE_DISPLAYNAME_SUCCESS:
      draft.changeDisplayNameLoading = false;
      draft.changeDisplayNameDone = true;
      draft.me.displayName = action.data.displayName;
      break;
    case CHANGE_DISPLAYNAME_FAILURE:
      draft.changeDisplayNameLoading = false;
      draft.changeDisplayNameError = action.error;
      break;
    default:
      return state;
  }
});

// export const signInReqeustAction = (data) => ({
//   type: SIGNIN_REQUEST, data,
// });

export default reducer;
