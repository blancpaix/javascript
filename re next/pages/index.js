import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../store/configureStore';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.user);
  const { hasMorePosts, loadPostsLoading, posts } = useSelector((state) => state.post);

  // useEffect(() => {
  //   if (hasMorePosts && !loadPostsLoading) {
  //     dispatch({
  //       type: LOAD_POSTS_REQUEST,
  //     });
  //   }
  // },[]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = posts[posts.length - 1]?.id || 0;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      <div>Index Page</div>
      {currentSession && <PostForm />}
      {posts.map((item) => (
        <PostCard
          key={item.id}
          post={item}
        />
      ))}
    </AppLayout>

  );
};

// NEXT SSR 미리 데이터 담는거
// Home.getInitialProps;  // 조만간 없어질듯?
// 이부분이 Home 컴포넌트 보다 먼지 실행됨
// 이거는 브라우저에서 실행이 아니고 프론트 서버에서 실행됨

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('context review : ', context);
  const cookie = context.req ? context.req.headers.cookie : '';
  // axios.defaults.headers.Cookie = '';
  // 쿠키 없으면 제거해주는거임 조심해서 쓰시오
  // 이렇게 하면 로그인이 공유되는 문제가 발생함.. 그래서 아래와 같이 처리를 함
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END); // enxt-redux-wrapper 사용법입니다만?
  await context.store.sagaTask.toPromise(); // 이건 configureStore.js 파일에서
});

export default Home;
