// 백이랑 같이 해야 할듯?? 이미지 업로드는??
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import UseInput from '../hooks/useInput';
import { UPLOAD_IMAGES_REQUEST } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user);
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = UseInput('');

  useEffect(() => {
    if (addPostDone) setText('');
  }, [addPostDone]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // multer 처리 가능
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const onRemoveImage = useCallback(() => {
    dispatchEvent({
      type: null,
    });
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log('이걸 눌럿소?');
    if (!text || !text.trim()) alert('게시글을 쓰시오!');
  }, []);

  return (
    <Form
      style={{ marign: '10px 0 20px ' }}
      encType="multipart/form-data"
      onFinish={onSubmitForm}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="무슨일이오~!"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button style={{ float: 'right' }} type="primary" htmlType="submit">업로드</Button>
      </div>
      <div>
        {imagePaths.map((el, index) => (
          <div>
            {el}, {index}
            <img src={el.src} style={{ width: 200 }} alt={el.src} />
            <Button onClick={onRemoveImage(index)}>제거</Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
