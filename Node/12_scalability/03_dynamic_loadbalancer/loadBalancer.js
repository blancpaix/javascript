import { createServer } from 'http';
import httpProxy from 'http-proxy';
import consul from 'consul';

// 로드밸런서 경로 정의, 여기서는 매핑된 경로로 요청 처리함
const routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0,     // 추가적으로 인덱스로 라운드로빈 처리하기 위함
  },
  {
    path: '/',
    service: 'webapp-service',
    index: 0,
  },
];

const consulClient = consul();      // 레지스트리에 엑세스 할 수 있도록 인스턴스화
const proxy = httpProxy.createProxyServer();

const server = createServer((req, res) => {
  // 가장 먼저 처리해야 할 일은 url 찾기임, 결과는 서비스 이름이 포함된 설명자 descriptor 임
  const route = routing.find(route => {
    return req.url.startsWith(route.path);
  });
  // consul로 부터 요청을 처리하기 위해 필요한 서비스 구성 서버의 목록을 받음. Tags 속성으로 모든 서비스 필터링하고 서비스 가능한 서버 주소를 찾음
  consulClient.agent.service.list((err, services) => {

    console.log('나는 이거가 궁금하다', Object.values(services));
    const servers = !err && Object.values(services)
      .filter(ser => ser.Tags.includes(route.service));
    console.log('서버는 확인해야지??', servers);

    if (err || !servers.length) {
      res.writeHead(502);
      return res.end('Bad gateway');
    };

    // 요청을 대상으로 라우팅 함. 라운드로빈 방식에 ㄸ라 목록에서 다음 서버를 가리키도록 index 갱신... index로 서버 선택, req,res 와 함께 프록시 웹으로 전달
    route.index = (route.index + 1) % servers.length;
    const server = servers[route.index];
    const target = `http://${server.Address}:${server.Port}`;
    proxy.web(req, res, { target })
  })
});

server.listen(8080, () => {
  console.log(`Load balancer started on port 8080`);
});


/*
  간단하게 로드밸런서 만들어봣는데
  최적화는 의도적으로 생략함
  단일 요청에 대해 등록된 모든 서비스 목록을 얻기 위해 consul 을 써서 조회중
  로드밸런서가 높은 빈도로 요청을 수신하는 경우 오버헤드 발생 => 서비스 목록은 10초마다 캐시하고 새고로치는것이 효율적

  또 다른 최적화로 cluster 모듈로 로드밸런서의 여러 인스턴스를 실행하고 모든 코어에 로드를 분산하는것


서버 시작하기
// 서버 레지스트리 시작
consul agent -dev   
// 로드밸런서 시작, 서버 미 시작시 502 에러 반환 - Bad gateway
forever start loadBalancer.js


  이 패턴은 직접적이라서 좋음
  consul은 웹 ui 지원. => localhost:8500
  모니터링도 지원....하는데 뭐 consul-checks 에서 확인하기 바람


  
*/