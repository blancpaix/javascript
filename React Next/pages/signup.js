import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import std from 'styled-components';

import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST, SIGNUP_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { sigupLoading, signupDone, signupError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (me && me.id) {
      // Router.push('/'); 이전페이지 돌아갈수도
      Router.replace('/'); // 페이지 기록에서 사라짐
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signupError) alert(signupError);
  }, [signupError]);

  // 여기 state, callback 은 커스텀 훅으로 바꿔
  const [email, onChangeEmail] = useInput('');
  const [display, onChangeDisplay] = useInput('');
  const [password, onChangePassword] = useInput('');
  // 중복되는 항목은 이렇게 처리, 커스텀 훅으로 처리가 안됩니다
  const [rePassword, setRePassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangeRePassword = useCallback((e) => {
    setRePassword(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (password !== rePassword) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, password, display },
    });
    console.log(email, display, password);
  }, [password, passwordError, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NordBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">Email</label>
          <br />
          <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-display">DisplayName</label>
          <br />
          <Input name="user-display" value={display} onChange={onChangeDisplay} required />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
        </div>
        <div>
          <label htmlFor="user-rePassword">Password Check</label>
          <br />
          <Input name="user-rePassword" type="password" value={rePassword} onChange={onChangeRePassword} required />
          {passwordError ? <ErrorMsg>비밀번호가 일치하지 않소</ErrorMsg> : null}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 말을 잘 들을것이오?</Checkbox>
          {termError ? <ErrorMsg>약관에 동의하시오!</ErrorMsg> : null}
        </div>
        <div style={{ marginTop: 30 }}>
          <Button type="primary" htmlType="submit" loading={sigupLoading}>SIGN UP</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

const ErrorMsg = std.div`color: red`;

// 로그인 여부에따라서 화면이 바뀌기 때문에 서버사이드프롭 사용
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start---');
  console.log('context review : ', context.req);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end===');
  await context.store.sagaTask.toPromise();
});

export default Signup;
