import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Space } from 'antd';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../reducers/board';

const Write = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector(state => state.user);
  const { imagePath, addPostLoading, addPostDone, addPostError } = useSelector(state => state.board);
  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');

  useEffect(() => {
    if (!currentSession || !currentSession.id) { Router.back(); alert('로그인하세요') }
  }, [!currentSession || currentSession.id]);

  useEffect(() => {
    if (addPostDone) Router.push('/board');
  }, [addPostDone]);

  useEffect(() => {
    if (addPostError) alert(addPostError);
  }, [addPostError]);

  const onSubmitForm = useCallback(() => {
    console.log('이거 눌렀니?', title, content);
    if (!title || !title.trim()) alert('제목을 작성하시오');
    if (!content || !content.trim()) alert('내용을 작성하시오');
    const formData = new FormData();
    imagePath.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type', 0); // 이건 나중에 변경을 해주도록 하고
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    })
  }, [title, content, imagePath]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.currnet]);
  const onChangeImage = useCallback((e) => {
    console.log('image', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    })
  }, []);
  const onRemoveImage = useCallback((index) => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    })
  }, []);

  return (
    <AppLayout>
      <div>
        <Form onFinish={onSubmitForm} encType="multipart/form-data">
          <>
            <label htmlFor="title">Title</label>
            <Input placeholder="Type Title" title="Title" name="title" value={title} onChange={onChangeTitle} maxLength={128}></Input>
          </>
          <>
            <label htmlFor="content">Content</label>
            <Input.TextArea title="content" name="content" maxLength={8192} rows={16} value={content} onChange={onChangeContent}
              placeholder="Type Content Here."
            />
          </>
          <>
            <label htmlFor="file">File</label>
            <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImage} />
            <Button onClick={onClickImageUpload}>UPLOAD IMAGE</Button>
          </>
          <Button htmlType="submit">SUBMIT</Button>
        </Form>
      </div>
      {imagePath.map((el, index) => (
        <div key={el} style={{ display: 'inline-block' }}>
          <img src={`http://localhost:3000/${el}`} />
          <Button onClick={() => onRemoveImage(index)} loading={addPostLoading}>제거</Button>
        </div>
      ))}
    </AppLayout>
  )
};

export default Write;