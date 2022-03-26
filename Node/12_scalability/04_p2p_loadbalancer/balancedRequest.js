import { request } from 'http';
import getStream from 'get-stream';

const servers = [
  { host: 'localhost', port: 8081 },
  { host: 'localhost', port: 8082 },
];

let i = 0;

export function balanacedRequest(options) {

  return new Promise((resolve) => {
    // 라운드 로빈, 사용ㄱ 나으한 서범고록에서 선택한 서버로 요청할 호스트명과 포트 재정의 하도록 http.requestAPI 를 감쌈
    // 단순화를 위해 get-stream 사용, 버퍼에 전체 응답 본문인 응답 스트림을 담음
    // 실제 사용은 client.js 에서
    i = (i + 1) % servers.length;
    options.hostname = servers[i].host;
    options.port = servers[i].port;
    console.log('옵션은뭐임??', options);

    request(options, (response) => {
      resolve(getStream(response));
    }).end();
  })
};