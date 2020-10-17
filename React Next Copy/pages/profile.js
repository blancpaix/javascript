import React from 'react';
import Head from 'next/head';

import DefaultLayout from '../components/DefaultLayout';
import DisplayNameEditForm from '../components/DisplayNameEditForm';
import FollowerList from '../components/FollowerList';
import FollowingList from '../components/FollowingList';

const Profile = () => {
  const followerList = [{ displayName: '1번 부대' }, { displayName: '2번 부대' }, { displayName: '3번 부대' }];
  const followingList = [{ displayName: '1번 부대' }, { displayName: '2번 부대' }, { displayName: '3번 부대' }];

  return (
    <>
      <Head>
        <title>PROFILE | Next Exam</title>
      </Head>
      <DefaultLayout>
        <DisplayNameEditForm />
        <FollowingList header="Following List" data={followingList} />
        <FollowerList header="Follower List" data={followerList} />
      </DefaultLayout>
    </>
  );
};

export default Profile;
