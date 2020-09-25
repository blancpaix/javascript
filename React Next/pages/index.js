import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// END HYDRATE 랑 비슷하게 미리 준비된 액션이란느데....
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostCard';
import PostCard from '../components/PostForm';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

// SSR
import wrapper from '../store/configureStore';

// 이거는 프론트 서버랑 브라우저랑 같이 실행
const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostLoading,
    hasMorePost, retweetError } = useSelector((state) => state.post);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_POST_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    if (retweetError) alert(retweetError);
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      // 실무에서는 300px 정도의 여유를 두고 자연스럽게 내려가도록 함
      // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    // useEffect에서 window addEventlistener 할때 주의해야 할것은 리턴을 꼭 해줘서 스크롤 이벤트 해제해줘야 함 같은 함수를 넣어줘야 함
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {me ? <PostCard /> : null}
      {mainPosts.map((item) => <PostForm key={item.id} post={item} />)}
    </AppLayout>
  );
};

// Next SSR 미리 데이터 담는건가?
// Home.getInitialProps; // 조만간 없어질듯 9버전 새로운 3개
// 이 부분이 Home 컴포넌트보다 먼저 실행됨
// 이거는 브라우저에서 실행이 아니고 프론트 서버에서 실행됨
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('context review : ', context);
  const cookie = context.req ? context.req.headers.cookie : '';
  // axios.defaults.headers.Cookie = cookie;
  axios.defaults.headers.Cookie = '';
  // 쿠키없으면 제거해주는거임 매우 조심하십시오!!!!!!!!!!!!!!!
  // 근데 위와 같은 방식으로 하면 로그인이 공유되는 문제가 발생함 ㅋㅋㅋㅋ
  // 서버쪽에서 실행되는거라서 그럼 그래서 아래와 같이 처리함
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
  });
  context.store.dispatch(END); // next-redux-wrapper 사용법임
  await context.store.sagaTask.toPromise(); // 이건 configureStore.js 파일에서 불러옴
});

export default Home;
