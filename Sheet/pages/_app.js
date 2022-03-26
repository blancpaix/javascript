import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

import 'antd/dist/antd.css';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>악보팔이</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

// export default App;
export default wrapper.withRedux(App);