import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import std from 'styled-components';

import AppLayout from '../components/applayout';
import useInput from '../hooks/useInput';

const ErrorMessage = std.div`
  color : 'red';
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [passwordError, setPasswordCheckError] = useState(false)
  const onChangePasswordCheck = useCallback(e => {
    setPasswordCheck(e.target.value);
    setPasswordCheckError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordCheckError(true);
    }
    if (!term) {
      return setTermError(true);
    };

    // 한번 더 체크 해도 좋습니다 여러번 할수록 좋아용
    console.log(id, nickname, password);

  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit} >
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-pw">비밀번호</label>
          <br />
          <Input name="user-pw" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-pw-check">비밀번호 확인</label>
          <br />
          <Input name="user-pw-check" type="password"
            value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 말을 들을 것을 동의함</Checkbox>
          {termError && <div style={{ color: 'red' }}>약관에 동의함을 ㅇㅇㅇ 하셈 </div>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">가입하기</Button>
        </div>

      </Form>
    </AppLayout>
  )
};

export default Signup;