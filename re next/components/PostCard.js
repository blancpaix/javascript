import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Avatar, Button, Card, Comment, Popover, List } from 'antd';
import PropTypes from 'prop-types';

import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import PostCardContent from './PostCardContent';
import PostCommentForm from './PostCommentForm';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentSession?.id);
  const removePostLoading = false;
  const [commentFormIsOpen, setCommentFormIsOpen] = useState(false);

  const liked = post.Likers.find((v) => v.id === id);

  const onRetweet = () => {
    console.log('sadsf');
  };
  const onLike = useCallback(() => {
    if (!id) return alert('plz Signin');
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) return alert('plz Signin');
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = () => {
    setCommentFormIsOpen(!commentFormIsOpen);
  };
  const onRemovePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  };

  return (
    <div stlye={{ margin: 10 }}>
      <Card
        cover={post.Images[0] ? null : null}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone key="heart" twoToneColor="#f52d00" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
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
        <div style={{ float: 'right' }}>{post.createdAt}</div>
        <Card.Meta
          description={<PostCardContent postData={post.content} />}
          title={post.User.displayName}
          avatar={(
            <Link href={`/user/${post.User.id}`}>
              <a><Avatar>{post.User.displayName[0]}</Avatar></a>
            </Link>
          )}
        />
      </Card>
      {commentFormIsOpen && (
        <div>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(el) => (
              <li>
                <Comment
                  author={el.User.displayName}
                  avatar={(
                    <Link href={`/user/${el.User.id}`}>
                      <a><Avatar>{el.User.displayName[0]}</Avatar></a>
                    </Link>
                  )}
                  content={el.content}
                />
              </li>
            )}
          />
          {id && <PostCommentForm post={post} />}
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
    createdAt: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
