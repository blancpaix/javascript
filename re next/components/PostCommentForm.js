import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');

  useEffect(() => {
    if (addCommentDone) setComment('');
    // 이거 이렇게 되면 한버낳고 나서는 다음번에는 완전히 막혀버리는건데
    // Done 이 되면 이거 값을 변경시켜 줘야 됨 이거 뭔가 좀 이상함...
    // state 관리가 최적화되지 않은 느낌임
    // 이거 손봐야 함
  }, [comment]);

  const onSubmitComment = useCallback(() => {
    console.log('onSubmitComment : ', post.id, comment);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: comment, postId: post.id, userId: id },
    });
  });

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
          ADD COMMENT
        </Button>
      </Form.Item>
    </Form>
  );
};

PostCommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCommentForm;
