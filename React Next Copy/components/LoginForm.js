import { useCallback, useState } from "react";
import useInput from '../hooks/useInput';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import stc from 'styled-components';

const LoginForm = ({ setIsLogin }) => { // 이거는 함수를 받은겨
  const [id, setOptiId] = useInput('');
  const [pw, setOptiPw] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(id, pw);
    setIsLogin(true);
  }, []);

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
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </DivPadding10>
    </Form>
  )
};

const DivPadding10 = stc.div`
  padding: 10px;
`;

export default LoginForm;
