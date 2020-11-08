// require('dotenv').config(); 이거 말고 명령어 칠때 이거 설정하려면 package.json에서
// "build": "ANALYZE=true NODE_ENV=production next build" 이렇게
// 근데 이거는 윈도우에서 안됨 ㅋㅋㅋ 리눅스나 맥에서는 됨
// 가능하게 하려면 npm i cross-env 설치를 해야 함 명령어 앞에다가 cross-env 붙여야 함

// 근데 이게 내자오디어서 더이상 필요가 없고 설정할 필요도 없다! next.config 들어가서 확인해보고
// const CompressPlugin = require('compression-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    // config 을 통해서 설정을 바꿔주는 형식으로
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins, // 불변성을 지켜주세용
      // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\ko$/),
      // 위에거는 moment 라이브러리에서 ko 말고 다 제외
    ];
    // if (prod) {
    // JS TS CSS 파일 Gzip 으로 압축해서 브라우저가 알아서 압축 풀어서 쓴느데 이거는 그냥 지원임
    // plugins.push(new CompressPlugin());
    // }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      // hidden-source-map 안하면 배포에서 소스 다 노출됨
      devtool: prod ? 'hidden-source-map' : 'eval', // eval 로 빠르게 개발
      // module: { ...config.module, rules: [ ...config.module.rulds, {} ], }
      plugins,
    };
  },
});
