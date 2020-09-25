export const initialState = {
  isLogin: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'LOG_IN':
      return { ...state, isLogin: true, me: action.data };
    case 'LOG_OUT':
      return { ...state, isLogin: false, me: null };
  }
};

export const loginAction = (data) => {
  return { type: 'LOG_IN', data };
};

export const logoutAction = () => {
  return { type: 'LOG_OUT' };
};

export default reducer;