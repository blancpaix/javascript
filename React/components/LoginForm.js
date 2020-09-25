import { useState, useCallback, useMemo } from "react";
import { Form, Input, Button } from 'antd';
import Link from "next/link";
import std from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";  // useState 쓸 일이 줄어듦

import useInput from '../hooks/useInput';

import { loginAction } from '../reducer/user';

// css형식으로 사용
const StdButton = std.div`
  margin-top : 20px;
`;

// form button 같은 기본 컴포넌트?? 들은 (Form) 같이 사용하면 안돌아감. 
const StdForm = std(Form)`
  padding: 40px;
`;

const LoginForm = ({ setIslogin }) => {
  // 함수에 props 로 넘기는 함수는 useCallback 을 꼭 써딸라 그래야 최적화가 됨
  // const [pw, setPw] = useState('');
  // const onChangePw = useCallback(el => { setPw(el.target.value); }, []);

  const dispatch = useDispatch();

  const [id, onChangeId] = useInput('');
  const [pw, onChangePw] = useInput('');

  const style = (() => ({ marginTop: 10 }), []); // 이렇게 써야 리렌더링 최적화가 됨

  const onSubmitForm = useCallback(() => {
    console.log(id, pw);
    // setIslogin(true);
    dispatch(loginAction({ id, pw }));
  }, [id, pw])

  return (
    <StdForm onFinish={onSubmitForm}>
      <div style={style}>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-pw">비밀번호</label>
        <br />
        <Input name="user-pw" type="password" value={pw} onChange={onChangePw} required />
      </div>

      <StdButton>
        <Button twpe="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </StdButton>

    </StdForm>
  )
};

// LoginForm.propTypes = {
//   setIslogin: PropTypes.func.isRequired,
// }

export default LoginForm;