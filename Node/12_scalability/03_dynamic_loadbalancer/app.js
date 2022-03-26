import { createServer } from 'http';
import consul from 'consul';
import portfinder from 'portfinder';
import { nanoid } from 'nanoid';

const serviceType = process.argv[2];
const { pid } = process;

async function main() {
  const consulClient = consul();
  const port = await portfinder.getPortPromise();   // 사용가능한 포트 찾기 (8000에서 시작), ADDRESS 환경변수로 설정도 가능
  const address = process.env.ADDRESS || 'localhost';
  const serivceId = nanoid();


  // 오타 조심합시다... 시벌 이것때문에 시간을 엄나ㅏ 날려...
  function registierService() {
    consulClient.agent.service.register({
      id: serivceId,
      name: serviceType,
      address,
      port,
      tags: [serviceType]
    }, () => {
      console.log(`${serviceType} registered successfully`);
    });
  };

  function unregisterSerivce(err) {
    err && console.error(err);
    console.log(`deregistering ${serivceId} 이건 마저하고 가야지 이것아`);
    consulClient.agent.service.deregister(serivceId, () => {
      process.exit(err ? 1 : 0);
    })
  };

  // 의도적 || 오류 발생시 함수 호출, 서비스에서 등록 해제
  process.on('exit', unregisterSerivce);
  process.on('uncaughtException', unregisterSerivce);
  process.on('SIGINT', unregisterSerivce);

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) { i-- };
    console.log(`Handling request from ${pid}`);
    res.end(`${serviceType} response from ${pid} \n`);
  });

  server.listen(port, address, () => {
    // 서버 시작시 자동으로 호출
    registierService();
    console.log(`Started ${serviceType} at ${pid} on port ${port}`);
  });
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });



/*
12-2-4 동적 수평 확장
예측 된 트래픽 기반으로 어플 용량을 동적으로 조절할 수있음, 가용성과 응답성을 유지하면서 IT 인프라 비용을 크게 줄일 수있지

최대 트래픽으로 인해 성능 저하를 겪을 경우 새로운 서버를 생성
활용되지 않는 리소스 제거
네트워크 토폴로지를 최신상태로 유지하고 어느 서버가 작동중인지 알고 잇어야 함

서비스 레지스트리 (service registry) 사용
  일반적 패턴 : 실행중인 서버와 이를 제공하는 서비스를 추적하는 서비스 레지스트리라는 [중앙 저장소] 사용

  구성 : 로드밸런서 + 다수의 API 서버 + 서비스 레지스트 ( 로드밸런서 + API 서버 상호 연결 )
  ex) example.com 요청 수신 => 로드밸런서에서 요청 경로의 prefix 확인
  prefix : /api 인 경우, 사용가능한 인스턴스 중 한곳으로 전달함으로서 부하 분산
  (api1.example.com + api2.exaple.com) 으로 구성된 서버
  로드 밸런서는 서비스 레지스트리로부터 모든 서버에서 실행중인 서버 및 서버 인스턴스 목록을 가져옴

  완전 자동을 위해서 인스턴스가 온라인 상태일때 레지스트리에 등록, 중지되면 등록을 취소해야 함
  로드밸런서는 네트워크에서 사용가능한 자원에 대해 최신 정보를 항상 유지할 수 있쥬
  
  * 서버를 서비스 인스턴스로 각각 분리할수있는 장점

http-proxy & Consul 을 사용한 동적 로드밸런서 구현
  동적 네트워크 인프라 지원을 위해 Nginx || HAProxy 와 같은 역방향 프록시 사용해야 함
  설정 정보 갱신후, 로드밸런서가 변공된 정보를 가져가도록 수정해야 함
  nginx => nginx -s reload 로 수행
  node 로만 구성 => 훨씬 많은 자유도를 제공
  로드밸런싱 알고리듬 구현등에는 좋음...
  
  여기서는 Consuul 을 서비스 레지스트리로 사용하여 앞의 멀티 서비스 아키텍처를 구체화 해볼겁니다.
  사용하는 패키지 : http-proxy, portfinder, consul
  이전에는 단순한 http 서버였지만 이번에는 각 서버가 시작되는 순간 서비스 레지스트리에 자신의 정보를 등록해야 함

  consul 설치는 https://learn.hashicorp.com/tutorials/consul/get-started-install
  여기서 따라 해보세요
  choco install consul



두개의 서버, 세개의 인스턴스 만들기
forever start --killSignal=SIGINT app.js api-service
forever start --killSignal=SIGINT app.js api-service
forever start --killSignal=SIGINT app.js webapp-service

curl localhost:8080/api
curl localhost:8080/

값 확인하세요!

  
*/