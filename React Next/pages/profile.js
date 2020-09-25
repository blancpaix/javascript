import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import DisplayNameEditForm from '../components/DisplayNameEditForm';
import FollowList from '../components/FollowList';
import FollowerList from '../components/FollowerList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: me.id,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: me.id,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) return null;

  return (
    <>
      <Head>
        <title>내 프로필 | NordBird</title>
      </Head>
      <AppLayout>
        <DisplayNameEditForm />
        <FollowList header="팔로잉 목록" data={me.Followings} />
        <FollowerList header="팔로워 목록" data={me.Followers} />
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
