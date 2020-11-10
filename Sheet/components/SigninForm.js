import React from 'react';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';

import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

// 이게 밖에 나와있으니까 엄청 지저분한 느낌도 들고 해서.. 그냥 외국처럼 그렇게 쓰는게 더 좋을거같은데??
// 계속 사용하는 사람은 이미 로그인 처리되어 있으니까 로그인은 그리 중요한 것 같지는 않아 보임
// 로그인에서 필요한거.... 여기서 기본 email/password, 페이스북, 구글 로그인 정도 (국내 서비스 X) 이거는 백에서 건드려야 함

const SigninForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const loading = false;

  const onSignin = () => {
    console.log('SIGN IN!');
  }

  return (
    <>
      <Form onFinish={onSignin}>
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
          <Button htmlFor="submit" htmlType="submit" type="primary" loading={loading}>SIGN IN</Button>
          <Link href="/"><a><Button>SIGN UP</Button></a></Link>
        </div>
      </Form>
    </>
  )
};

export default SigninForm;