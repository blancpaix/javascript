import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickFollowButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  // 훅 보다는 아래 위치시킴
  if (post.User.id === me.id) {
    return null;
  }
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickFollowButton}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  // shape 이거 쓰세용 이게 더 좋음
  post: PropTypes.object.isRequired,
};

export default FollowButton;
