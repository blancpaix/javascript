import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import { Button, Checkbox, Form, Input, Steps } from 'antd';

import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNIN_REQUEST } from '../reducers/user';

const Signin = () => {
  const dispatch = useDispatch();
  const { currentSession, signinLoading, signinDone, signinError, } = useSelector(state => state.user);

  useEffect(() => {
    if (currentSession && currentSession.id || signinDone) Router.back();
  }, [currentSession]);

  useEffect(() => {
    if (signinError) alert(signinError);
  }, [signinError]);

  const [email, onChangeEmail] = useInput('');
  const [emailStored, setEmailStored] = useState(false);
  const [password, onChangePassword] = useInput('');
  const [keepSignin, setKeepSignin] = useState(false)

  const onCheckEmail = useCallback(() => {
    if (!email || !email.trim) alert('이메일 쓰세요')
    setEmailStored(true);
  }, [email])

  const onToggleEmailStored = useCallback(() => {
    setEmailStored(false);
  }, [emailStored])

  const onChangeKeepSignin = useCallback((e) => {
    setKeepSignin(e.target.checked)
  }, [keepSignin]);

  const onSignin = useCallback(() => {
    dispatch({
      type: SIGNIN_REQUEST,
      data: { email, password }
    })
  }, [email, password]);

  return (
    <AppLayout>
      <Head>
        <title>SIGN IN | 악보팔이</title>
      </Head>

      <Form onFinish={onSignin}>
        {!emailStored ? (
          // 아이디 미입력 상태
          <>
            <>
              <label htmlFor="email">Email</label>
              <br />
              <Input name="email" type="email" value={email} onChange={onChangeEmail} required />
            </>
            <div style={{ marign: 30 }}>
              <Button type="defulat" htmlType="button" onClick={onCheckEmail}>Continue</Button>
            </div>
          </>

        ) : (
            // 아이디 입력 상태, 비밀번호 입력
            <>
              {email} <a onClick={onToggleEmailStored}>Change</a>
              <br />
              <>
                <label htmlFor="password">Password</label>
                <a href="/account">Forget your password?</a>
                <br />
                <Input name="password" type="password" value={password} onChange={onChangePassword} required />
              </>
              <div style={{ marign: 30 }}>
                <Button type="default" htmlType="submit" loading={signinLoading}>SIGN IN</Button>
              </div>
              <div>
                <Checkbox checked={keepSignin} onChange={onChangeKeepSignin} />
                Keep me signined in.
              </div>
            </>
          )}
      </Form>

      <div>혹시 아이디가 없소 그러면</div>
      <Button type="primary">
        <Link href="/signup">Create Account</Link>
      </Button>
      <br />
      <Button type="default" title="구글 로그인">
        <Link href="http://localhost:3000/auth/google">SIGN IN WITH GOOGLE ACCOUNT</Link>
      </Button>
      <div>아이디 찾기를 원하시오? 그러면</div>
      <Button type="primary">
        <Link href="/account">Find Account</Link>
      </Button>
    </AppLayout >
  )
};

export default Signin;