import React, { useState } from 'react';
import Link from 'next/link';    // 넥스트 자체 라우터
import PropTypes from 'prop-types';
import std from 'styled-components';

import { Menu, Input, Row, Col } from 'antd';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';

const SearchInput = std(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  // const [isLogin, setIslogin] = useState(false);
  // const isLogin = useSelector((state) => state.user.isLogin);
  const { isLogin } = useSelector(state => state.user); //성능에도 영향이 있긴한데 미미함...

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>

      <Row>
        <Col xs={24} md={6}>
          {isLogin
            ? <UserProfile /> // setIslogin={setIslogin} 이거 useSelector 값이 변하면 알아서 연동된거 다 처리해줘서 더이상 필요 없음
            : <LoginForm /> // setIslogin={setIslogin}
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://www.google.com" target="_blank" rel="norefferer noopener" >go to GOOGLE</a>
        </Col>
      </Row>
    </div>
  )
};

// 검사하는거고 이거는 타입스크립트 쓰면 필요없는거임 여기서  node 는 리액트의 node임
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout;