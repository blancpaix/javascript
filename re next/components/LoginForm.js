import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';

import { SIGNIN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { signinLoading, signinError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signinError) alert(signinError);
  }, [signinError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onLogin = useCallback(() => {
    dispatch({
      type: SIGNIN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <Form onFinish={onLogin}>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <Input name="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <Input name="password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <div>
        <Button htmlFor="submit" htmlType="submit" type="primary" loading={signinLoading}>SIGN IN</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;
