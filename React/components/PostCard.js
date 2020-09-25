import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons'

import PostImages from '../components/PostImages';
import CommentForm from '../components/CommentForm';

const PostCard = ({ post }) => {
  // const { me } = useSelector(state => state.user);
  // const id === me && me.id;
  // const id = me?.id;    // optional chaining 위에것이 이렇게 간략화됨
  const id = useSelector(state => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(e => {
    setLiked(prev => !prev);
  }, []);

  const onToggleComemnt = useCallback(e => {
    setCommentFormOpened(prev => !prev);
  })

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}

        // 배열안에 jsx 구축할때는 항상 키를 넣어줘야 함
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="message" onClick={onToggleComemnt} />,
          <Popover key="more" content={(
            <Button.Group>
              {id && post.User.id === id
                ?
                (<>
                  <Button>수정</Button>
                  <Button type="primary">삭제</Button>
                </>)
                : <Button type="danger">신고</Button>
              }
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>

      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
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
      <Comments /> */}
    </div>
  )
};

PostCard.propTypes = {
  // post: PropTypes.object.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default PostCard;
