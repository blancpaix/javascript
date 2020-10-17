import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import Link from 'next/link';
import PropTypes from 'prop-types';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import PostCommentForm from './PostCommentForm';

import { LIKE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  console.log('post : ', post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  // const liked = post.Likers.find((v) => v.id === id);
  const id = useSelector((state) => state.user.me?.id);
  const [openComment, setOpenComment] = useState(false);
  const toggleComment = useCallback(() => {
    setOpenComment((prev) => !prev);
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 하시오!');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인을 하시오!');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) return alert('로그인을 하시오!');
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  });

  return (
    <div style={{ margin: 10 }}>
      <Card
        cover={post.Images[0] ? <PostImages images={post.Images} /> : null}
        actions={[
          <RetweetOutlined key="rewteet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#f52d00" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message" onClick={toggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined key="ellipsis" />
          </Popover>,
        ]}
      >
        <Card.Meta
          description={<PostCardContent postData={post.content} />}
          title={post.User.displayName}
          avatar={(
            <Link href="www.google.com">
              <a><Avatar>{post.User.displayName[0]}</Avatar></a>
            </Link>
          )}
        />

      </Card>
      {openComment && (
        <div>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.displayName}
                  avatar={(
                    <Link href="www.google.com">
                      <a><Avatar>{item.User.displayName[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
          <PostCommentForm post={post} />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
