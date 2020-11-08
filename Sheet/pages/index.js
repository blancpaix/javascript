import React from 'react';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';

import wrapper from '../store/configureStore';
import { LOAD_CURRENT_SESSION_REQUEST } from '../reducers/user';


const Home = () => {

  return (
    <div>
      <AppLayout>
        <>
          최신 업로드 악보<br />
        인기 악보<br />
        공지사항<br />
        블로그 게시글 ?<br />
        </>
      </AppLayout>
    </div>)
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // console.log('[[context review]] \n ', context);
  const cookie = context.req ? context.req.headers.cookie : '';
  // axios.defaults.headers.Cookie = cookie;
  axios.defaults.headers.Cookie = '';
  // 쿠키가 없으면 제거해주는거, 매우 조심해서 쓰시고
  // 위와 같은 방식으로 하면 서버에서 실행하는거라 로그인 공유되는 현상 발생
  // 아래와 같이 처리하세요
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // 세션이 살아있는 상태기 때문에 req 에 그대로 살아있다! 라는게 나의 결론

  context.store.dispatch({
    type: LOAD_CURRENT_SESSION_REQUEST
  });
  context.store.dispatch(END);    // next-redux-wrapper 사용법
  await context.store.sagaTask.toPromise(); // 이건 configureStore.js 파일에서 불러오는거임
});

export default Home;