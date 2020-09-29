// require('dotenv').config(); 근데 이방식 말고 명령어를 칠때 그냥 이걸 설정하려면 package.json scrips 에서
// "build" : "ANALYZE=true NODE_ENV=production next build", 이렇게
// 하면됨 근데 이거는 문제가 윈도우에서 안됨 ㅋㅋㅋㅋ 리눅스나 맥에서는 되서
// 가능하게 하려면 npm i cross-env 설치를 해야 함 명령어 앞에서 cross-env 하나만 붙여주만 알아서 잘 돌아감

// 근데 이게 내장되어서 더이상 설치가 필요없답니다! 설정할 필요도 없고 그럼 next.config 들어가서 한번씩 읽어보세요
// const CompressPlugin = require('compression-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// 웹팩 설정 - immer 써도 됨(불변성 무시)
module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    // config 을 통해서 설정을 바꾸주는 형식으로
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins, // 불변성을 지켜줘~!
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\ko$/),
    ];
    // if (prod) { // 배포 환경일 경우
    //   // JS TS CSS 파일 gzip 으로 압축해서 올려줌 브라우저가 알아서 압축풀어서 제공함
    //   plugins.push(new CompressPlugin());
    // }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      // hidden-source-map 안하면 배포환경에서 소스코드 다 노출됨
      devtool: prod ? 'hidden-source-map' : 'eval', // eval 로 빠르게 개발한다느게 뭐임?
      // module: {
      //   ...config.module,
      //   rules: [
      //     ...config.module.rules,
      //     {

      //     }
      //   ],
      // }
      plugins,
    };
  },
});
