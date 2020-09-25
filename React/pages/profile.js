import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import FollowerList from '../components/FollowerList';

const Profile = () => {
  const followList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '오피셜' }];
  const followerList = [{ nickname: '뭐임' }, { nickname: '제로초' }, { nickname: '바보' }, { nickname: '오피셜' }];

  return (
    <>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followList} />
        <FollowerList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  )
};

export default Profile;