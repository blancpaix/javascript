const CompressPlugin = require('compression-webpack-plugin');

// 웹팩 설정 - immer 써도 됨(불변성 무시)
module.exports = {
  webpack(config, { webpack }) {
    // config 을 통해서 설정을 바꾸주는 형식으로
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    if (prod) { // 배포 환경일 경우
      // JS TS CSS 파일 gzip 으로 압축해서 올려줌 브라우저가 알아서 압축풀어서 제공함
      plugins.push(new CompressPlugin());
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      // hidden-source-map 안하면 배포환경에서 소스코드 다 노출됨
      devtool: prod ? 'hidden-source-map' : 'eval',
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
};
