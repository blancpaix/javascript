import React from 'react';  // next 에서는 굳이 써줄 필요가 없음
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const Wrapper = ({ Component }) => {
  return (
    <>
      <Head>
        <meata charSet="utf-8" />
        <title>개발 ㅂㄷㅂㄷ</title>
      </Head>
      <Component />
    </>
  )
};

// 프롭이니까 이걸 써줌
// 이걸 점검하면 서비스 안정성이 조금 올라갑니다 ㅎㅎ 귀챃아도 점검 한번씩 하는거를 추천합니다.
Wrapper.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(Wrapper);
