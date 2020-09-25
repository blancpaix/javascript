import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types'; // 검사도구는 귀찮아도 해주는게 좋음

import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');
  useEffect(() => {
    if (addCommentDone) { setComment(''); }
  }, [comment]);
  const onSubmitComment = useCallback(() => {
    console.log('onSubmitComment : ', post.id, comment);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: comment, postId: post.id, userId: id },
    });
  }, [comment, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 10 }}>
        <Input.TextArea value={comment} onChange={onChangeComment} rows={4} />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          loading={addCommentLoading}
        >
          post Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
