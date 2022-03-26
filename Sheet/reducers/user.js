import produce from 'immer';

export const initialState = {
  currentSession: null,
  signupData: {},
  loginData: {},
  userInfo: {},

  checkUser: false,
  checkEmailLoading: false,
  checkEmailDone: false,
  checkEmailError: null,
  findAccountLoading: false,
  findAccountDone: false,
  findAccountError: null,

  signupLoading: false,
  signupDone: false,
  signupError: null,
  signinLoading: false,
  signinDone: false,
  signinError: null,
  loadCurrentSessionLoading: false,
  loadCurrentSessionDone: false,
  loadCurrentSessionError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
};

export const CHECK_EMAIL_REQUEST = 'CHECK_EMAIL_REQUEST';
export const CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS';
export const CHECK_EMAIL_FAILURE = 'CHECK_EMAIL_FAILURE';
export const FIND_ACCOUNT_REQUEST = 'FIND_ACCOUNT_REQUEST';
export const FIND_ACCOUNT_SUCCESS = 'FIND_ACCOUNT_SUCCESS';
export const FIND_ACCOUNT_FAILURE = 'FIND_ACCOUNT_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const LOAD_CURRENT_SESSION_REQUEST = 'LOAD_CURRENT_SESSION_REQUEST';
export const LOAD_CURRENT_SESSION_SUCCESS = 'LOAD_CURRENT_SESSION_SUCCESS';
export const LOAD_CURRENT_SESSION_FAILURE = 'LOAD_CURRENT_SESSION_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST:
      draft.checkEmailLoading = true;
      draft.checkEmailDone = false;
      draft.checkEmailError = null;
      break;
    case CHECK_EMAIL_SUCCESS:
      draft.checkEmailLoading = false;
      draft.checkEmailDone = true;
      draft.checkUser = action.data;
      break;
    case CHECK_EMAIL_FAILURE:
      draft.checkEmailLoading = false;
      draft.checkEmailDone = false;
      draft.checkEmailError = action.error
      break;
    case FIND_ACCOUNT_REQUEST:
      draft.findAccountLoading = true;
      draft.findAccountDone = false;
      draft.findAccountError = null;
      break;
    case FIND_ACCOUNT_SUCCESS:
      draft.findAccountLoading = false;
      draft.findAccountDone = true;
      break;
    case FIND_ACCOUNT_FAILURE:
      draft.findAccountLoading = false;
      draft.findAccountDone = false;
      draft.findAccountError = action.error
      break;

    case SIGNUP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.currentSession = action.data;
      break;
    case SIGNUP_FAILURE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = action.data;
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
    case LOAD_CURRENT_SESSION_REQUEST:
      draft.loadCurrentSessionLoading = true;
      draft.loadCurrentSessionDone = false;
      draft.loadCurrentSessionError = null;
      break;
    case LOAD_CURRENT_SESSION_SUCCESS:
      draft.loadCurrentSessionLoading = false;
      draft.loadCurrentSessionDone = true;
      draft.currentSession = action.data;
      break;
    case LOAD_CURRENT_SESSION_FAILURE:
      draft.loadCurrentSessionLoading = false;
      draft.loadCurrentSessionDone = false;
      draft.loadCurrentSessionError = action.data;
      break;
    case LOGOUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.currentSession = null;
      break;
    case LOGOUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutDone = false;
      draft.logoutError = action.data;
      break;


    default:
      break;
  }
});

export default reducer;