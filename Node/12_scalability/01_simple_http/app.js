import { createServer } from 'http';
import { cpus } from 'os';
import cluster from 'cluster';
import { once } from 'events';


// 첫 실행시 마스터 프로세스기 실행됨 여기서 할 부부은 cluster.fork 를 사용해 현재 프로세스를 포크하는것
if (cluster.isMaster) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(() => cluster.fork());

  cluster.on('exit', (worker, code) => {
    // exitedAfterDisconnect 플래그, 마스터에 의해 종료되어쓴지 확인. 오류도 포함이 되는건가?
    // autocannon 오류는 설정된 연결이 중단되엇을 경우 발생... 그래도 잘 작동을 하는거를 알 수있찌
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed. \n Starting a new worker!`)
      cluster.fork();
    };
  });

  cluster.on('SIGUSR2', async () => {
    const workers = Object.values(cluster.workers);
    for (const worker of workers) {
      console.log(`Stopping worker : ${worker.process.pid}`);
      worker.disconnect();
      await once(worker, 'exit');
      if (!worker.exitedAfterDisconnect) { continue; }
      const newWorker = cluster.fork();
      await once(newWorker, 'listening');
    }
  })

} else {
  // fork() 실행시 모듈이 다시 실행되지만 이번에는 작업자 모드 (cluster.isWorker)가 true 로 되어 작업을 처리할수잇으며 작업자는 새로운 http 서버를 시작시킴
  const { pid } = process;
  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) { i-- };
    console.log(`Handling request from ${pid}`);
    res.end(`HEllo from ${pid} \n`);
  });

  // 충돌 발생하도록
  setTimeout(() => {
    { throw new Error('Ooops!') }
  }, Math.ceil(Math.random() * 3) * 1000);
  // 외부에서 모니터링하지 않으면 요청 중지, 다시 시작을 할수는 있는데... 지연이 발생할 가능성이 높음
  // 모니터링 하지 않으면 꺼진지 알수 없음. 다시 시작 시 처리 지연 발생
  // 백업 프로세스 필요
  // 오류 시 코드종료 방지, 새로운 자업자 실행


  server.listen(8080, () => console.log(`Started at ${pid}`));
}


/*
  cluster.fork(), child_process.fork() api 사용하기 대문에 master worker 간 통신 가능한 채널 있음
  worker 프로세스는 cluster.workers 변수에서 엑세스 가능
  모든 프로세스에 메시지 브로드캐스팅 방법은 다음과 같음
  Objects.values((cluster.workers).forEach(worker => worker.send({`hello from the master`})));



// pid 를 보내는데.... 인스턴스 식별에 유용
// 이거는 프로세스 하나분이라서 pid 는 항상 동일함
// 1k requests in 10.21s, 0 B read      800 errors (0 timeouts)


--------------------------------------------
┌─────────┬────────┬─────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 287 ms │ 1455 ms │ 1886 ms │ 1997 ms │ 1282.1 ms │ 428.62 ms │ 2074 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬───────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Req/Sec   │ 135     │ 135     │ 147     │ 151     │ 145.9   │ 4.07  │ 135     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┤
│ Bytes/Sec │ 15.8 kB │ 15.8 kB │ 17.2 kB │ 17.7 kB │ 17.1 kB │ 475 B │ 15.8 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴───────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

2k requests in 10.11s, 171 kB read
---------------------------------------------------
┌─────────┬───────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%  │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼───────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 11 ms │ 316 ms │ 1633 ms │ 1862 ms │ 458.99 ms │ 467.71 ms │ 2393 ms │
└─────────┴───────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬───────┬───────┬─────────┬─────────┬─────────┬─────────┬───────┐
│ Stat      │ 1%    │ 2.5%  │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min   │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Req/Sec   │ 341   │ 341   │ 424     │ 455     │ 415.7   │ 30.53   │ 341   │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Bytes/Sec │ 40 kB │ 40 kB │ 49.7 kB │ 53.4 kB │ 48.7 kB │ 3.58 kB │ 40 kB │
└───────────┴───────┴───────┴─────────┴─────────┴─────────┴─────────┴───────┘
Req/Bytes counts sampled once per second.
# of samples: 10
4k requests in 10.11s, 487 kB read 
---------------------------------------------
한 3.3배 개션이라는데??


const { pid } = process;
const server = createServer((req, res) => {
  let i = 1e7;
  while (i > 0) { i-- };

  console.log('Handeling request from ', i);
  res.end(`Hello from ${pid} \n`);
});

server.listen(8080, () => console.log(`Started at ${pid}`));



  작업자는 모두 별도의 프로세스, 다른 작업자 영향 X
  살아있는 작업자 업슴녀 기존 연결 끊김, node 는 작업자 수를 자동으로 관리하지 않음
  작업자 풀 관리는 어플리케이션 책임

  충돌 발생하더라도 서비스 유지 => 복원력, 가용성에 기여



-다운타임 제로 서비스
  새 버전을 릴리즈할 경우 node 를 재시작 해야 함. 여러 인스턴스를 사용하면 가용성 유지에 도움이 됨
  SLA (Service-Level-Agreement 서비스 수준 계약??), 매우 자주 업데이트 되는 어플에서는 필수적임
  다운타임 없이 ㅈ싲가을 구현, 코드는 가용성에 영향 안주고 업데이트 됨
  한번에 하나씩 작업자를 다시 시작하면 됨

  작업자 재시작은 SIGUSR2 신호 수신 시 트리거 됨
    비동기 작업으로 수행되기에 비동기 함수 사용
  SIGUS2 신호 수신하면 cluster.workers 의 객체의 모든 값을 반복
    cluster.worekrs 내의 모든 요소는 작업자 풀에서 현재 활성화된 작업들의 객체임
  가장 먼저 하는 일은 worker.disconnect() 를 호출해서 작업자를 정상적으로 중지시킴. => 현재 작업중일 경우 작업 완료된 후 중단됨
  종료 예정 프로세스 종료시 새로운 작업자를 생성 할 수 있음
  새 작업자가 준비되고 새롱누 연결을 수신할때가지 대기
  
  근데 SIGUSR2 이게 어디서 넘어오는 메시지임? 어플에서 자체적으로 마들어야 하나???
  먼저 마스터 프로세스의 pid 를 얻어야 함
  ps -af 로 모든 프로세스 목록 식별 가능함
  여기선 ps 하면 나올듯
  마스터 프로세스는 노드 프로세스들의 부모여야 함.
  실행을 해봆디ㅏ
  kill -SIGUSR2 <PID>

  => 어플 가용성에 큰 영향을 미치지는 못함


12-2-2 상태 저장 통신 다루기
  클러스터 인스턴스들은 상태가 공유되지 않음
  >> 상태 저장이 필요 (세션 처리에서...)

  Ex) 세선#1 요청, 인스턴스#1에 세션 저장. 로드밸런스로 인스턴스#2에 접속

  s1) 여러 인스턴스 상태 공유
    모든 인스턴스에서 상태 공유 - PostgreSQL, mongoDB, CouchDB, Redis (Memcached)
    패턴 적용하기 위해 상당량을 리팩토링해야 함. 라이브러리 사용하는것도 괜찮
    리팩토링 불가 시 영향도가 덜한 고정 로드 밸런싱 (고정 세션) 추천

    고정 로드 밸런싱 - sticky-session
      로드밸런서가 세션과 관련된 모든 요청을 지정된 인스턴스로 라우팅되도록 함
      { session, server } 구조 db 저장
      로드밸런서가 특정 인스턴스로 매핑 생성, 알고리듬 우회해서 해당 인스턴스 선택
      세션ID 검사가 필요 (일반적으로 어플 또는 로드밸런서 자체의 쿠기에 포함됨)

      더 간단한 방법은 IP 주소를 사용, => 정보 저장 필요가 없음
      (다만 다른 네트워크로 로밍 과 같이 잦은 ip 변경에는 부적합)
      

      단점
        모든 인스턴스가 동일...
        다른 인스턴스가 멈춘 인스턴스를 대체하는 장점 대부분을 무효화..??
        따라서 고정 로드밸런싱을 피하고 공유 저장소에 세션 상태를 저정하는것이 좋음
      
12-2-3 역방향 프록시 확장 - [Nginx], HAProxy, Node.js 깁나 프로시, 클라우드 기반 프록시
  독립 실행형 인스턴스 => 역방향 프록시, 인스턴스 접근을 제공해서 트래픽 분산
  마스터 프로세스 없음, 그냥 단순히 프로세스의 집합으로 구성되어 있고 단일 액세스 포인트 제공
  요청이 있으면 대상 서버에 보내고 .... 등등
  역방향 프록시는 로드밸런서로도 사용 가능

  node 의 경우 클러스터 모듈 대신 이것을 성택하는 이유
  1. 여러 시스템에 부하 분산 가능
  2. 시장에서 가장 널리되는 역방향 프록시 = 고정 로드 밸런싱 지원???
  3. 언어, 플랫폼 관계 없이 라우팅 가능
  4. 로드 밸런싱 알고리듬 선택 가능
  5. URL 재작성, 캐싱, sSL 종료지점 ,보안 기능 등 추가 기능으로 완전한 웹 서버 기능 제공

  필요시 클러스터 모듈을 역방향 프로시와 결합 가능
  클러스터 => 시스템 수직 확장
  역방향 프록시 => 수평으로 확장


  Nginx 를 사용한 로드 밸런싱

    


*/