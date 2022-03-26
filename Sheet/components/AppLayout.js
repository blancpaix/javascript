import React, { useCallback, useEffect } from 'react';
import { Button, Col, Menu, Row, Layout, Input } from 'antd';
const { Content, Footer } = Layout;

import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'next/link';
import Router from 'next/router';

import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { currentSession, logoutLoading, logoutError } = useSelector(state => state.user);

  const [searchInput, onChangeSearchInput] = useInput('');

  useEffect(() => {
    if (logoutError) return alert(logoutError);
  }, [logoutError]);

  const onClickLogo = useCallback(() => {
    Router.push(`/`);
  }, []);

  const onSearch = useCallback(() => {
    Router.push(`/search/${searchInput}`);
  }, [searchInput]);

  const onClickBoard = useCallback(() => {
    Router.push(`/board`);
  }, []);

  const onClickSignin = useCallback(() => {
    Router.push('/signin');
  }, []);

  const onClickSignup = useCallback(() => {
    Router.push('/signup');
  }, []);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    })
  }, []);

  return (
    <Layout>
      <Menu mode="horizontal" style={{ alignContent: 'center', alignItems: 'stretch' }}>
        <Menu.Item onClick={onClickLogo}>
          <img src="https://www.google.com/logos/doodles/2015/googles-new-logo-5078286822539264.3-hp2x.gif" alt="google" style={{ maxWidth: '100px' }} />
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>

        {currentSession
          ? (
            <SubMenu title={`Hi! ${currentSession.displayName}`} style={{ float: 'right' }}>
              <Menu.Item>
                Hi! {currentSession.displayName}.
               </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a href="/myaccount"><Button type="primary">My Account</Button></a>
              </Menu.Item>
              <Menu.Item>
                <Button type="default" onClick={onLogout} loading={logoutLoading}>Logout</Button>
              </Menu.Item>
            </SubMenu>
          )
          : (
            <SubMenu title="user Icon" style={{ float: 'right' }}>
              <Menu.Item>
                Hi! Sign in here.
             </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <Button type="primary" onClick={onClickSignin}>Sign-in</Button>
              </Menu.Item>
              <Menu.Item>
                New Customer? <a onClick={onClickSignup}>Start here.</a>
              </Menu.Item>
            </SubMenu>
          )
        }

      </Menu>

      <Menu mode="horizontal">
        <Menu.Item>
          악보
         </Menu.Item>
        <SubMenu title="Board" onClick={onClickBoard}>
          <Menu.Item>
            NOTICE
          </Menu.Item>
          <Menu.Item>
            FREE
          </Menu.Item>
          <Menu.Item>
            REQUEST
          </Menu.Item>
        </SubMenu>

      </Menu>

      <Content style={{ backgroundColor: 'yellow', minHeight: 'calc(100vh - 300px)' }}>
        <Row gutter={8}>
          <Col xs={24} md={24}>
            {children}
          </Col>
        </Row>
      </Content>

      <Footer style={{ bottom: 0, height: 40 }}> 바닥</Footer>
    </Layout >
  )
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout;