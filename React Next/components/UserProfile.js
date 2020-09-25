import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">Post<br />{me.Posts.length}</div>,
        <div key="followers">Follower<br />{me.Followings.length}</div>,
        <div key="followings">Following<br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={onLogout} loading={logoutLoading}>LOG OUT</Button>
    </Card>
  );
};

export default UserProfile;
