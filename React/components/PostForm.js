import { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input, Button } from "antd";

import { addPost } from '../reducer/post';

const PostForm = () => {
  const imageInput = useRef();
  const { imagePaths } = useSelector(state => state.post);
  const [text, setText] = useState('');
  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 처음에는 그냥 리렌더링 고려하지 말고 인라인 스타일 쓰시고 나중에 막 작업에서 최적화 해주셈
  return (
    <Form style={{ margin: '10px 0 20px 0' }} encType="multipart/form-data" onFinish={onSubmit} >
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
};

export default PostForm;