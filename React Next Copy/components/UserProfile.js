import { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

const UserProfile = ({ setIsLogin }) => {
  const onLogout = useCallback(() => {
    setIsLogin(false);
  });

  return (
    <Card
      actions={[
        <div key="twit">트윗<br />@</div>,
        <div key="followers">팔로워<br />@</div>,
        <div key="followings">팔로잉<br />@</div>,
      ]}
    >
      <Card.Meta
        title="니가 뭔데"
        avatar={<Avatar>니가</Avatar>}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>

  )
};

export default UserProfile;
