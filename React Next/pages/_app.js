// 페이지 안에 공통되는 것 처리 여기서는 atnd css 파일 로딩하는것
// 컴포넌트 이름은 상관없는데 _app.js 라는 파일이 index 의 부모역할을 한다고???
// 모든 페이지에서 공통인 것은 _app.js 에다가 넣으면 되고 특정 파일에서 공통인 것은 Layout 만들어서 감싸면 됨
// pages 폴더의 공통 => _app.js

import React from 'react';
import Head from 'next/head'; // Head 태그를 다룰 수 있는 컴포넌트?
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';
// import withReduxSaga from 'next-redux-saga'; // 사가는 이 HOC 로, 리덕스는 밑에서 바로
// ssr 사용하면서 withReduxSaga 는 불필요 => 패키지도 삭제 최대한 가볍게  여기서는 안그럴겨

import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = ({ Component }) => (
  <>
    {/* 예전버전 Provider로 감싸기 필요, 6버전 이후로 알아서 감싸줌 */}
    <Head>
      <meta charSet="utf-8" />
      <title>NordBird</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired, // Component 가 필요!
};

// export default App;  밑에는 redux 붙임
// export default wrapper.withRedux(withReduxSaga(App));
export default wrapper.withRedux(App);
