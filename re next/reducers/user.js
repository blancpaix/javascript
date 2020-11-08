import produce from 'immer';

export const initialState = {
  currentSession: null,
  signupData: {},
  loginData: {},
  userInfo: {},

  signupLoading: false,
  signupDone: false,
  signupError: null,
  signinLoading: false,
  signinDone: false,
  signinError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
};

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

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
      draft.signupError = null;
      break;
    case SIGNUP_FAILURE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = action.error;
      break;
    case SIGNIN_REQUEST:
      draft.signinLoading = true;
      draft.signinDone = false;
      draft.signinError = null;
      break;
    case SIGNIN_SUCCESS:
      draft.signinLoading = false;
      draft.signinDone = true;
      draft.currentSession = action.data;
      break;
    case SIGNIN_FAILURE:
      draft.signinLoading = false;
      draft.signinDone = false;
      draft.signinError = action.error;
      break;
    case LOGOUT_REQUEST:
      draft.signinLoading = true;
      draft.signinDone = false;
      draft.signinError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.signinLoading = false;
      draft.signinDone = true;
      draft.currentSession = null;
      break;
    case LOGOUT_FAILURE:
      draft.signinLoading = false;
      draft.signinDone = false;
      draft.signinError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;
