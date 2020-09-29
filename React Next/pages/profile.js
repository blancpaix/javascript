import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';
import AppLayout from '../components/AppLayout';
import DisplayNameEditForm from '../components/DisplayNameEditForm';
import FollowList from '../components/FollowList';
import FollowerList from '../components/FollowerList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

// 이거는 그냥 공유해서 쓰거나 개조해서 쓰세요    loadAction 이 꼭 SSR 되어야 하는게 아니라면 이거 쓰는거 추천 swr 쓰는건
const fetcher = (url) => axios.get(url, { withCredentials: true })
  .then((resut) => resut.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  // swr 사용 방법  load 스테이트 만들기 귀찮아서 이거 쓸수도 있음
  // 위에서 만든 fetcher 값이 data 로 들어감 data error 값이 둘다 없으면 로딩임
  const { data: followersData, error: followerError } = useSWR(`http://localhost:3001/user/followers&limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3001/user/followings&limit=${followingsLimit}`, fetcher);
  // 단점이 계속해서 불러올때 데이터 중복 낭비가 발생함. useSWRPages 이거 디프리케이틑 될듯...
  // 그래서 useSWRInfinite 이거 생기는데 이거는 알아서 찾아보세요
  // 그나마 해결책을 찾자면 offset, limit 으로 데이터 낭비 줄이세요

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //     data: me.id,
  //   });
  //   dispatch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //     data: me.id,
  //   });
  // }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) return null;

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중....';
  }

  // 어떤 경우에도 훅스는 실행이 모두 되어야 하기떄문에 이거는 밑으로 내림
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/ 팔로워 로딩 중 에러 발생';
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NordBird</title>
      </Head>
      <AppLayout>
        <DisplayNameEditForm />
        <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
        <FollowerList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start---');
  console.log('context review : ', context.req);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end===');
  await context.store.sagaTask.toPromise();
});

export default Profile;
