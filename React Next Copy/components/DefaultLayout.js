import { useState } from 'react';
import Link from 'next/link';
import { Menu, Input, Col, Row } from 'antd';
import stc from 'styled-components';
import PropTypes from 'prop-types';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const DefaultLayout = ({ children }) => {
  const [isLogin, setIsLogin] = useState('');

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
          <AntdInputSearch enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <br />

      <Row gutter={8} >
        <Col xs={24} md={6}>
          {isLogin ? <UserProfile setIsLogin={setIsLogin} /> : <LoginForm setIsLogin={setIsLogin} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://www.google.com" target="_blank" rel="noreferrer noopener">Made By Blancpaix</a>
        </Col>
      </Row>
    </div>
  )
};

const AntdInputSearch = stc(Input.Search)`
  vertical-align: middle;
`;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,    // node 아무 값이나 필요!
};

export default DefaultLayout;