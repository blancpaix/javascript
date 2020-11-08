import React, { useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
// import std from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Menu, Row, Input } from 'antd';

import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {
  const { currentSession } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/search/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>Blancpaix</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {currentSession ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={14}>
          {children}
        </Col>
        <Col xs={24} md={4}>
          <a href="http://www.google.com/" target="_blank" rel="nonreferrer noopener">Blancpaix</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
