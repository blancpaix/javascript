import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Checkbox, Input, Form, Button } from 'antd';

import useInput from '../hooks/useInput';

import DefaultLayout from "../components/DefaultLayout";
import stc from 'styled-components';

const Signup = () => {
  // 커스텀 훅 사용 추천
  const [id, onChangeId] = useInput('');
  const [displayName, onChangeDisplayName] = useInput('');
  const [pw, onChangePw] = useInput('');
  const [rePw, setRePw] = useState('');   // 중복항목은 커스텀훅 사용 안함
  const [pwError, setPwError] = useState(false);
  const onChangeRePw = useCallback(e => {
    setRePw(e.target.value);
    setPwError(e.target.value !== pw);
  }, []);
  const [checkTerm, setCheckTerm] = useState(false);
  const [checkTermError, setCheckTermError] = useState(false);
  const onChangeCheckTerm = useCallback(e => {
    setCheckTerm(e.target.checked);
    setCheckTermError(false);
  });

  const onSubmit = useCallback(() => {
    if (pw !== rePw) {
      return setPwError(true);
    }
    if (!checkTerm) {
      return checkTermError(true);
    }
    console.log(id, pw, displayName);
  }, [pw, rePw, checkTerm]);

  return (
    <DefaultLayout>
      <Head>
        <title>회원가입 | Next Exam</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-displayName">Display Name</label>
          <br />
          <Input name="user-displayName" value={displayName} onChange={onChangeDisplayName} required />
        </div>
        <div>
          <label htmlFor="user-pw">Password</label>
          <br />
          <Input name="user-pw" type="password" value={pw} onChange={onChangePw} required />
        </div>
        <div>
          <label htmlFor="user-rePw">Password Check</label>
          <br />
          <Input name="user-reRw" type="password" value={rePw} onChange={onChangeRePw} required />
          {pwError ? <ErrorMsg>Password is not Same!</ErrorMsg> : null}
        </div>
        <div>
          <Checkbox name="check-term" checked={checkTerm} onChange={onChangeCheckTerm} />
          <label htmlFor="check-term">  내 말에 동의하시오</label>
          {checkTermError ? <ErrorMsg>약관에 동의하지 않소?</ErrorMsg> : null}
        </div>
        <DivPadding10>
          <Button type="primary" htmlType="submit">SiGN UP</Button>
        </DivPadding10>
      </Form>
    </DefaultLayout>
  )
};

const ErrorMsg = stc.div`
  color: red;
`;
const DivPadding10 = stc.div`
padding: 10px
`;

export default Signup;