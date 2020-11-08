import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

import { CHECK_EMAIL_REQUEST, SIGNUP_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { currentSession, checkUser, signupLoading, signupDone, signupError, checkEmailLoading, checkEmailDone, checkEmailError, } = useSelector((state) => state.user);

  useEffect(() => {
    if (signupDone) Router.replace('/');
  }, [signupDone]);

  useEffect(() => {
    if (currentSession && currentSession.id) Router.replace('/');
  }, [currentSession && currentSession.id]);
  useEffect(() => {
    if (checkEmailError) alert(checkEmailError)
  }, [checkEmailError]);
  useEffect(() => {
    if (signupError) alert(signupError);
  }, [signupError]);

  // 아마존처럼 레이아웃을 여기서 안보이도록 바꾸고 나머지느...
  const [email, onChangeEmail] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [passwordChk, setPasswordChk] = useState('');
  const [passwordChkError, setPasswordChkError] = useState(false);
  const onChangePasswordChk = useCallback((e) => {
    setPasswordChk(e.target.value);
    setPasswordChkError(e.target.value !== password);
  }, [password, passwordChk]);

  const [displayName, onChangeDisplayName] = useInput('');
  const [name, onChangeName] = useInput('');
  const [chkTerm, setChkTerm] = useState(false);
  const [chkTermError, setChkTermError] = useState(false);
  const onChangeChkTerm = useCallback((e) => {
    setChkTerm(e.target.checked);
    setChkTermError(false);
  });

  const onSubmitEmail = useCallback(() => {
    console.log('Data \n', email);
    if (!email || !email.trim()) return alert('뭐라도 쓰세요');
    dispatch({
      type: CHECK_EMAIL_REQUEST,
      data: email,
    })
  }, [email]);

  const onSignup = useCallback(() => {
    console.log('Data \n', checkEmailDone, email, password, displayName, name);
    // 근본적인 해결은 아닌데 무튼... 완료된 상태에서 고치면 checkEmail state 가 변경되어야 함
    if (!checkUser) return alert('Check email again');
    if (password !== passwordChk) return setPasswordChkError(true);
    if (!chkTerm) return setChkTermError(true);
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, password, displayName, name }
    })
  }, [checkUser, passwordChk, chkTermError]);

  return (
    <AppLayout>
      <Head>
        <title>SIGN UP | 악보팔이</title>
      </Head>

      <Form onFinish={onSignup}>
        <>
          <label htmlFor="email">Email</label>
          <br />
          <Input name="email" type="email" value={email} onChange={onChangeEmail} required />
          <Button type="default" onClick={onSubmitEmail} loading={checkEmailLoading}>이메일 확인</Button>
          {!checkUser ? <div>Email, plz check Email</div> : <div>Continue...</div>}
        </>
        <>
          <label htmlFor="password">Password</label>
          <br />
          <Input name="password" type="password" value={password} onChange={onChangePassword} required />
        </>
        <>
          <label htmlFor="password-check">Password Check</label>
          <br />
          <Input name="password-check" type="password" value={passwordChk} onChange={onChangePasswordChk} required />
        </>
        <>
          <label htmlFor="displayName">DisplayName</label>
          <br />
          <Input name="displayName" type="text" value={displayName} onChange={onChangeDisplayName} required maxLength={30} />
        </>
        <>
          <label htmlFor="name">Name</label>
          <br />
          <Input name="name" type="text" value={name} onChange={onChangeName} required maxLength={30} />
        </>
        <>
          <Checkbox name="signin-term" chcked={chkTerm} onChange={onChangeChkTerm}>약관에 동의 ㅇㅈ?</Checkbox>
          {chkTermError && <div>You can not use our service until agree our terms.</div>}
          {passwordChkError && <div>Password is not a same!</div>}
        </>
        <div style={{ marign: 30 }}>
          <Button type="default" htmlType="submit" loading={signupLoading}>SIGN UP</Button>
        </div>
      </Form>
    </AppLayout>
  )
};

export default Signup;