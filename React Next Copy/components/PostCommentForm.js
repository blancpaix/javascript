import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCardComment = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput('');
  const userId = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (addCommentDone) { setComment(''); }
  }, [comment]);

  const onSubmitComment = useCallback(() => {
    console.log('submit?', post.id, comment);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { comment, postId: post.id, userId },
    });
  }, [comment, userId]);

  return (
    <Form onFinish={onSubmitComment} style={{ position: 'relative', margin: 10, paddingBottom: 100 }}>
      <Form.Item>
        <Input.TextArea
          value={comment}
          onChange={onChangeComment}
          rows={3}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          댓글
        </Button>
      </Form.Item>
    </Form>
  );
};

PostCardComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCardComment;
