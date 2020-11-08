/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { SIGNUP_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { currentSession, signupLoading, signupDone, signupError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (currentSession && currentSession.id) {
      Router.replace('/');
    }
  }, [currentSession && currentSession.id]);

  useEffect(() => {
    if (signupError) alert(signupError);
  }, [signupError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);
  const [displayName, onChangeDisplayName] = useInput('');

  const [checkTerm, setCheckTerm] = useState('');
  const [checkTermError, setCheckTermError] = useState(false);
  const onChangeCheckTerm = useCallback((e) => {
    setCheckTerm(e.target.checked);
    setCheckTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!checkTerm) {
      return setCheckTermError(true);
    }
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, password, displayName },
    });
  }, [password, passwordError, checkTerm]);

  return (
    <AppLayout>
      <Head>
        <title>SIGN UP | Blancpaix</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <Input name="email" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <Input name="password" type="password" value={password} onChange={onChangePassword} required />
        </div>
        <div>
          <label htmlFor="password-check">Password Check</label>
          <br />
          <Input name="password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
        </div>
        <div>
          <label htmlFor="display-name">Display Name</label>
          <br />
          <Input name="display-name" type="text" value={displayName} onChange={onChangeDisplayName} required />
        </div>
        <div>
          <Checkbox name="user-term" checked={checkTerm} onChange={onChangeCheckTerm}>Did you agree our terms?</Checkbox>
          {checkTermError ? <div>You can not use our service until agree our terms.</div> : null}
          {passwordError ? <div>Password is not a same!</div> : null}
        </div>
        <div style={{ marginTop: 30 }}>
          <Button type="default" htmlType="submit" loading={signupLoading}>SIGN UP</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
