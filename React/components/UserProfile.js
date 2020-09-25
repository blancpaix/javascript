import { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { logoutAction } from '../reducer/user';

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    //setIslogin(false);
    dispatch(logoutAction());
    console.log('로그아웃 함');
  }, []);

  return (
    <Card
      action={[
        <div key="twit">짹잭<br />0</div>,
        <div key="followings">팔로잉<br />0</div>,
        <div key="followers">팔로워<br />0</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>ZC</Avatar>}
        title="ZeroCho"
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
};

export default UserProfile;