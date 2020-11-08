import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card } from 'antd';

import { LOGOUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentSession, logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          Post
          <br />
          #twit
        </div>,
        <div key="follower">
          Follower
          <br />
          #follower
        </div>,
        <div key="following">
          Following
          <br />
          #following
        </div>,
      ]}
    >
      <Card.Meta
        title={currentSession.displayName}
        avatar={<Avatar>{currentSession.displayName[0]}</Avatar>}
      />
      <Button onClick={onLogout} loading={logoutLoading}>LOG OUT</Button>
    </Card>
  );
};

export default UserProfile;
