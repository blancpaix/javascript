// _app.js 파일명 고정. 전체 페이지(pages 폴더 안 페이지) 공통 처리
// antd.css 파일 로드

import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

const App = ({ Component }) => {

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Next Sample</title>
      </Head>
      <Component />
    </>
  )
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,    // Component 가 필요!
}

export default wrapper.withRedux(App);