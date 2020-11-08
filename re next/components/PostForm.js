import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UseInput from '../hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading, addPostError, uploadImageLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = UseInput('');

  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) setText('');
  }, [addPostDone]);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images : ', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) return alert('게시글을 작성하시오!');
    const formData = new FormData();

    imagePaths.forEach((image) => {
      formData.append('image', image);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  return (
    <>
      <Form style={{ margin: '10 0 20' }} encType="multipart/form-data" onFinish={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="무슨 일이오~?"
        />
        <div>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={onClickImageUpload} loading={uploadImageLoading}>UPLOAD IMAGE</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>전송</Button>
        </div>
        <div>
          {imagePaths.map((el, index) => (
            <div key={el} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3000/${el}`} style={{ width: '200px' }} alt={el} />
              <div>
                {/* 이거는 깔끔하게 tooltip 띄워서 삭제하고 그리고 섬네일 표준을 만드는게 좋으듯? 틀에다가 가둬놓자?? 가 좋은가 잘 모르겠네... 원본을 보여주는건데
                <Button onClick={onRemoveImage(index)}>제거</Button> */}
              </div>
            </div>
          ))}
        </div>
      </Form>
      {addPostError && <div>{addPostError}</div>}
    </>
  );
};

export default PostForm;
