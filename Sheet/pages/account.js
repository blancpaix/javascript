import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Button, Form, Input } from 'antd';

import useInput from '../hooks/useInput';
import { FIND_ACCOUNT_REQUEST } from '../reducers/user';

const Account = () => {
  const dispatch = useDispatch();
  const { currentSession, findAccountLoading, findAccountDone, findAccountError } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');

  useEffect(() => {
    if (currentSession && currentSession.id) return Router.replace('/');
  }, [currentSession]);

  useEffect(() => {
    if (findAccountDone) return alert('등록했던 이메일을 확인하세요!');
    if (findAccountError) return alert(findAccountError);
  }, [findAccountDone, findAccountError])

  const onSubmit = useCallback(() => {
    dispatch({
      type: FIND_ACCOUNT_REQUEST,
      data: { email, name }
    });
    Router.push('/');
  }, [email, name]);

  return (
    <div>
      아무것도 업소
      <Form onFinish={onSubmit}>
        <>
          <label htmlFor="email">Email</label>
          <Input value={email} onChange={onChangeEmail} required />
        </>
        <>
          <label htmlFor="name">Name</label>
          <Input value={name} onChange={onChangeName} required />
        </>
        <>
          <Button type="default" htmlType="submit" loading={findAccountLoading}>찾기</Button>
        </>
      </Form>


    </div>
  )
};

export default Account;