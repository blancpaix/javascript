import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Col, Row } from 'antd';
import stc from 'styled-components';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import UseInput from '../hooks/useInput';

const DefaultLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = UseInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <AntdInputSearch
            enterButton
            value={searchInput}
            onChange={setSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <br />

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />}
        </Col>
        <Col xs={24} md={15}>
          {children}
        </Col>
        <Col xs={24} md={3}>
          <a href="https://www.google.com" target="_blank" rel="noreferrer noopener">GOOGLE</a>
        </Col>
      </Row>
    </>
  );
};

const AntdInputSearch = stc(Input.Search)`
  vertical-align: middle;
`;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired, // node 아무 값이나 필요!
};

export default DefaultLayout;
