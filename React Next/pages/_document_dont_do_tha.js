import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // app, document 에서 getInitialProps 쓰는듯 나중에 없어질듯??
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      // 이부분이 서버사이드 렌더링일때
      context.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
      const initialProps = await Document.getInitialProps(context);
      console.log('initialProps : ', initialProps);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (err) {
      console.error(err);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <body>
            <Main />
            {/* IE 를 위한 폴리필..ㅜㅠ */}
            <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

// 이게 기본 꼴임
// import React from 'react';
// import Document, { Head, Html, Main, NextScript } from 'next/document';

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//     };
//   }
//   render() {
//     return (
//       <Html>
//         <Head>
//           <body>
//             <Main />
//             <NextScript />
//           </body>
//         </Head>
//       </Html>
//     );
//   }
// }
