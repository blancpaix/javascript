import produce from 'immer';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from './post';

export const initialState = { // 분리를 해서 나중에 또 합쳐줘야 하니가 export 로 넘겨줌
  // isLoggingIn: false, // 로그인 시도중    로딩창 띄우는 용도
  // isLoggingOut: false,  // 로그아웃 시도중
  // isLoggedIn: false,
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserInfoLoading: false, // 유저 정보 가져오기 시도
  loadUserInfoDone: false,
  loadUserInfoError: null,
  loginLoading: false, // 로그인 시도
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도
  logoutDone: false,
  logoutError: null,
  signupLoading: false, // 회원가입 시도
  signupDone: false,
  signupError: null,
  changeDisplayNameLoading: false, // 닉변 시도
  changeDisplayNameDone: false,
  changeDisplayNameError: null,
  loadFollowersLoading: false, // 팔로워 가져오기
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false, // 팔로잉 가져오기
  loadFollowingsDone: false,
  loadFollowingsError: null,
  followLoading: false, // 팔로우 시도
  followDone: false,
  followError: null,
  unFollowLoading: false, // 언팔로우 시도
  unFollowDone: false,
  unFollowError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  me: null, // 보통 에러에서 me 를 null 처리함
  signUpData: {},
  loginData: {},
  userInfo: null,
};

// type 은 오타가 잦기 떄문에 변수로 빼주는게 좋음, 다른 파일에서도 쓸 수 있게 export 해줌
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const CHANGE_DISPLAYNAME_REQUEST = 'CHANGE_DISPLAYNAME_REQUEST';
export const CHANGE_DISPLAYNAME_SUCCESS = 'CHANGE_DISPLAYNAME_SUCCESS';
export const CHANGE_DISPLAYNAME_FAILURE = 'CHANGE_DISPLAYNAME_FAILURE';


export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'UNFOLLOW_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'UNFOLLOW_SUCCESS'; // 팔로워 차단
export const REMOVE_FOLLOWER_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({ // 더미데이터를 많이 생성해놓을듯?
  ...data,
  nickname: '제로초',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ id: '3qjsakf', nickname: '3번말' }, { id: '4qjsakf', nickname: '4번말' }, { id: '5qjsakf', nickname: '5번말' }],
  Followers: [{ nickname: '4번말' }, { nickname: '7번말' }, { nickname: '9번말' }],
});

// 여기서의 state 는 state.user 를 말함
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
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
      draft.loadMyInfoDone = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOAD_USER_INFO_REQUEST:
      draft.loadUserInfoLoading = true;
      draft.loadUserInfoDone = false;
      draft.loadUserInfoError = null;
      break;
    case LOAD_USER_INFO_SUCCESS:
      draft.loadUserInfoLoading = false;
      draft.loadUserInfoDone = true;
      draft.userInfo = action.data;
      break;
    case LOAD_USER_INFO_FAILURE:
      draft.loadUserInfoLoading = false;
      draft.loadUserInfoDone = false;
      draft.loadUserInfoError = action.error;
      break;

    case LOGIN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOGIN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = action.data;
      break;
    case LOGIN_FAILURE:
      draft.loginLoading = false;
      draft.loginDone = false;
      draft.loginError = action.error;
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
    case LOGOUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutError = action.error;
      break;

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
    case CHANGE_DISPLAYNAME_REQUEST:
      draft.changeDisplayNameLoading = true;
      draft.changeDisplayNameDone = false;
      draft.changeDisplayNameError = null;
      break;
    case CHANGE_DISPLAYNAME_SUCCESS:
      console.log('action!!!', action);
      draft.me.nickname = action.data.nickname;
      draft.changeDisplayNameLoading = false;
      draft.changeDisplayNameDone = true;
      break;
    case CHANGE_DISPLAYNAME_FAILURE:
      draft.changeDisplayNameLoading = false;
      draft.changeDisplayNameError = action.error;
      break;

    case ADD_POST_TO_ME:
      // 이전 방법 return { ...state, me: { ...state.me, Posts: [{ id: action.data }, ...state.me.Posts], }, };
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      // return { ...state, me: { ...state.me, Posts: state.me.Posts.filter((el) => el.id !== action.data) } };
      // unshift 하는게 맞느데 두줄이 되서 귀찮음
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;

    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: action.data.id });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followDone = false;
      break;
    case UNFOLLOW_REQUEST:
      draft.unFollowLoading = true;
      draft.unFollowDone = false;
      draft.unFollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unFollowLoading = false;
      draft.unFollowDone = true;
      // 불변성 안지키려면 splice 쓰는데 귀찮아서 filter 씀
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.id);
      break;
    case UNFOLLOW_FAILURE:
      draft.unFollowLoading = false;
      draft.unFollowDone = false;
      break;

    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersLoading = true;
      draft.loadFollowersDone = false;
      draft.loadFollowersError = null;
      break;
    case LOAD_FOLLOWERS_SUCCESS:
      draft.loadFollowersLoading = false;
      draft.loadFollowersDone = true;
      draft.me.Followers = action.data;
      break;
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoading = false;
      draft.loadFollowersDone = false;
      break;
    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsDone = false;
      draft.loadFollowingsError = null;
      break;
    case LOAD_FOLLOWINGS_SUCCESS:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsDone = true;
      draft.me.Followings = action.data;
      break;
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsDone = false;
      break;
    case REMOVE_FOLLOWER_REQUEST:
      draft.removeFollowerLoading = true;
      draft.removeFollowerDone = false;
      draft.removeFollowerError = null;
      break;
    case REMOVE_FOLLOWER_SUCCESS:
      draft.removeFollowerLoading = false;
      draft.removeFollowerDone = true;
      draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
      break;
    case REMOVE_FOLLOWER_FAILURE:
      draft.removeFollowerLoading = false;
      draft.removeFollowerDone = false;
      break;
    default:
      break;
  }
});

// thunk는 이게 끝임 나머지 것들은 다 자기가구현해야 함
// 실수로 클릭을 두번함? 성크는 요청 다감, 사가는 takeLatest 라는게 있어서 두번 동시에 들어오면 마지막 것만 요청 보냄
// 스로틀??? 스크롤 이벤트 리스너에서 스크롤 쭉내리면 서버 요청 수백개 날라가는데 DOS 공격임... 이거는 그래서 이거
// 자기 서버에서 셀프 ddos 공격을 하는게 최악의 프론트엔드임 실력없는 사람들....
// 리덕스 하다가 그런 사람이 있음 그래서 이거 막으려면 스로틀 적용해서 1초에 몇번이상 요청이 날라오면 그거 차단해버림. debounce?? 등등
// saga 가 그런거 구현해놓음 성크는 간단한것만 구현할때 사용하기를 추천함


export const del_loginAction = (data) => (dispatch, getState) => {
  const state = getState();
  setTimeout(() => { // 이런거는 사가에서 기본적으로 지원함
    dispatch(loginRequestAction());
  }, 2000);
  axios.post('/api/login')
    .then((res) => {
      dispatch(loginSuccessAction(res.data));
    })
    .catch((err) => {
      dispatch(loginFailureAction(err));
    });
};

export const loginAction = (data) => ({ type: 'LOG_IN', data });

// 원칙적으로는 어떤 요청이든 3가지로 구성됨
// 하단 suc fail 은 여기서 만드느게 아니고 saga 가 만들어줘서 사실상 필요가 없ㅇ르듯?  yield put 있잖어 그쪽부분
export const loginRequestAction = (data) => ({ type: LOGIN_REQUEST, data });
// export const loginSuccessAction = (data) => {
//   return { type: 'LOGIN_SUCCESS', data, }
// };
// export const loginFailureAction = (data) => {
//   return { type: 'LOGIN_FAILURE', data, }
// };
export const logoutRequestAction = () => ({ type: LOGOUT_REQUEST });

export default reducer;
