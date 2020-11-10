import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import std from 'styled-components';
import PropTypes from 'prop-types';
import Router from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import UseInput from '../hooks/useInput';

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = UseInput('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { me } = useSelector((state) => state.user);
  // 이 값이 바뀌면 알아서 리렌더링 됨

  const onSearch = useCallback(() => {
    // 프로그래밍적으로 주소를옮길때는 라우터 사용, 링크는 링크...
    Router.push(`/hashtag/${searchInput}`); // 해당 페이지로 이동
    // 알아서 getServerSideProp 사용해서 값 받아옴
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/p-rofile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch} // 엔터를 치면 onSearch 가 실행됨
          />
        </Menu.Item>
        {/* <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item> */}
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="http://www.google.com/" target="_blank" rel="noreferrer noopener">Made by Blancpaix</a>
        </Col>
      </Row>

    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const SearchInput = std(Input.Search)`
  vertical-align: middle;
`;

export default AppLayout;
