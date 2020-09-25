import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { addPost, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';
import UseInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = UseInput('');

  useEffect(() => {
    if (addPostDone) setText('');
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    // dispatch(addPost(text));
    // setText('');
    // [문제!] 서버에서 못받으면 글이 날라감 그래서 여기가 아님  그래서 위에 useEffect 를 두고
    if (!text || !text.trim()) {
      alert('게시글 작성하시오');
    }
    const formData = new FormData(); // 이미지없는데 form Data 쓰는거는 비효율적임
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]); // image에 이렇게 해야 접근이 가능함.. 이거는 잘 모르겠는데?

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // form Data 로 하면 multer 처리 가능
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f); // image 가 키인데 이 값이 라우터 upload.array('image')랑 일치해야함
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  }, []);

  // 이미지 올리려면 multipart/form-data 형식으로 올라감
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="무슨 일이오?"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map((el, index) => (
          <div key={el} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3001/${el}`} style={{ width: '200px' }} alt={el} />
            <div>
              <Button onClick={onRemoveImage(index)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
