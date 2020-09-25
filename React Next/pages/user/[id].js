import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';

import axios from 'axios';
import Head from 'next/head';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { LOAD_USER_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query; // 특정 사용자의 아이디를 받아서 사용자에 대한 게시글만 가져옴
  const { mainPosts, hasMorePost, loadUserPostsLoading } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadUserPostsLoading) {
          dispatch({
            type: LOAD_USER_POST_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id, // 사용자 해당 게시글만 가져옴
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scoll', onScroll);
    };
  }, [mainPosts.length, hasMorePost, id]);

  return (
    <AppLayout>
      <Head>
        <title>
          {userInfo.nickname}
        </title>
        <meta name="description" content={`${userInfo.nickname}의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}놈의 게시글`} />
        <meta property="og:description" content={`${userInfo.nickname} 의 게시글 `} />
        <meta property="og:image" content="http://localhost:3000/favicon.ico" />
        <meta property="og:url" content={`https://localhost:3000/user/${id}`} />
      </Head>

      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="followings">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="followers">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((el) => (
        <PostCard key={el.id} post={el} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_POST_REQUEST,
    data: parseInt(context.params.id, 10),
  });
  // 이놈이 문제다!
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: parseInt(context.params.id, 10),
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  // console.log('getState', context.store.getState().post.mainPosts);
  // return { props: {} };  이건 뭐한다고 쓴거임?
});

export default User;
