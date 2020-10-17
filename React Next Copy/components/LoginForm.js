import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import stc from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { SIGNIN_REQUEST } from '../reducers/user';

const LoginForm = () => { // 이거는 함수를 받은겨
  const dispatch = useDispatch();
  const { signInLoading, signInError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signInError) alert(signInError);
  }, [signInError]);
  const [id, setOptiId] = useInput('');
  const [pw, setOptiPw] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: SIGNIN_REQUEST,
      data: ({ id, pw }),
    });
  }, [id, pw]);

  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={setOptiId} required />
      </div>
      <div>
        <label htmlFor="user-pw">비밀번호</label>
        <br />
        <Input name="user-pw" type="password" value={pw} onChange={setOptiPw} required />
      </div>
      <DivPadding10>
        <Button type="primary" htmlType="submit" loading={signInLoading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </DivPadding10>
    </Form>
  );
};

const DivPadding10 = stc.div`
  padding: 10px;
`;

export default LoginForm;
