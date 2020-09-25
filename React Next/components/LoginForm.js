import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';
import Link from 'next/link';
import std from 'styled-components';
import PropTypes from 'prop-types';
import { loginRequestAction } from '../reducers/user';

import useInput from '../hooks/useInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginError } = useSelector((state) => state.user);

  useEffect(() => {
    if (loginError) alert(loginError);
  }, [loginError]);
  const [email, onChangeEmail] = useInput('');
  const [password, setPassword] = useState('');
  const onChangePw = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" value={password} onChange={onChangePw} required type="password" />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

// LoginForm.proptypes = {
//   setIsLoggedIn: PropTypes.func.isRequired,
// }

const ButtonWrapper = std.div`
  margin-top: 10px;
`;
const FormWrapper = std(Form)`
  padding: 10px;
`;

//  const memoStyle = useMemo(() => ({ marginTop: 10}), []);  // 같은 객체 유지됨 (리렌더링 최적화)
