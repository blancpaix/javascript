// 백이랑 같이 해야 할듯?? 이미지 업로드는??
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import UseInput from '../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/post';

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
  const onRemoveImage = useCallback((index) => {
    dispatchEvent({
      type: REMOVE_IMAGE,
      data: index,
    });
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log('text // ', text, 'imagePaths // ', imagePaths);
    if (!text || !text.trim()) alert('게시글을 쓰시오!');

    const formData = new FormData();
    imagePaths.forEach((el) => {
      formData.append('image', el);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

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
        placeholder="무슨일이오??"
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
        <Button onClick={onClickImageUpload}>IMAGE UPLOAD</Button>
        <Button style={{ float: 'right' }} type="primary" htmlType="submit">UPLOAD</Button>
      </div>
      <div>
        {imagePaths.map((el, index) => (
          <div key={el} style={{ display: 'inline-block' }}>
            {el}, {index}
            <img src={`http://localhost:3000/${el}`} style={{ width: 200 }} alt={`http://localhost:3000/${el}`} />
            <Button onClick={() => onRemoveImage(index)}>DELETE</Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
