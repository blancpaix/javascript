import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    console.log('로그아웃 요청!', me);
    // setIsLogin(false);
    dispatch({
      type: LOGOUT_REQUEST,
    });
  });

  return (
    <Card
      actions={[
        <div key="twit">트윗<br />#number</div>,
        <div key="followers">팔로워<br />#number</div>,
        <div key="followings">팔로잉<br />#nubmer</div>,
      ]}
    >
      <Card.Meta
        title={me.displayName}
        avatar={<Avatar>{me.displayName[0]}</Avatar>}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>

  );
};

export default UserProfile;
