import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading, retweetError } = useSelector((state) => state.post);
  // const { me } = useSelector(state => state.user);
  const id = useSelector((state) => state.user.me?.id);
  // const [liked, setLiked] = useState(false);
  const liked = post.Likers.find((v) => v.id === id);

  const [commentFormOpend, setCommentFormOpend] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인부터 하시오.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인부터 하시오.');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인부터 하시오.');
    } dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인부터 하시오.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  // 여기서 에러 alert 처리하면 계속해서 창 뜸 => 상위 컴포넌트에서 처리! index page에서 처리함

  return (
    <div style={{ margin: 10 }}>
      <Card
        cover={post.Images[0] ? <PostImages images={post.Images} /> : null}
        actions={[ // 배열에 key 를 추가해줘야 함
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked // 이건 뭐임? 배열안에서는 이렇게 사용이 된다고?
            ? <HeartTwoTone key="heart" twoToneColor="#f52d00" onClick={onUnLike} />
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
        title={post.RetweetId ? `${post.User.nickname}놈이 리트윗` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card cover={post.Retweet.Images[0] ? <PostImages images={post.Retweet.Images} /> : null}>
              <Card.Meta
                description={<PostCardContent postData={post.Retweet.content} />}
                title={post.Retweet.User.nickname}
                avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              />
            </Card>
          )
          : (
            <Card.Meta
              description={<PostCardContent postData={post.content} />}
              title={post.User.nickname}
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            />
          )}

      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          {/* //댓글은 게시글에 속한 것이기 때문에 게시글의 id를 받아야 함 */}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <CommentForm />
      <Comment /> */}
    </div>
  );
};

PostCard.propTypes = {
  // object 속성들 다 표기 해주고 싶다면 shape 쓰세요
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
