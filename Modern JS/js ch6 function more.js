// 함수 심화학습

// 재귀     함수구현에 조금 더 편리함을 추구
// 재귀 구현 방식 1: 반복적 사고, 2: 자귀적 사고
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
};

// 스택 은 알아서 하시고

// 연결 리스트    빠르게 삽입 혹은 삭제를 해야 할 경우 사용
// 요소 : value, next: 다음 연결 리스트 요소를 참조하는 프로퍼티, 다음 요소가 없으면 null이 됨
let list = { value: 1 }; list.next = { value: 2 }; list.next.next = { value: 3 };
// 이런식으로 연결해서 쓰고
list.next = list.next.next;   // 하면 next값 가비지 컬렉터가 수집하여 삭제

// 나머지 매개변수와 전개 문법
// 나머지 매개변수는 항상 마지막에 위치
function sumAll(...args) {     // args의 매개변수를 싸그리모아서 쓴다!
  alert(args[0]); alert(args[1]);
}

// arguments 변수 => 인덱스를 사용해서 모든 인수에 접근 가능
// 화살표 함수에는 사용 불가능
function showName() {
  alert(amrguments.length); alert(arguments[0]); alert(arguments[1]);
};
showName("1번 ", "2번 ");

// ... 사용 예제
let arr = [3, 5, 1];
alert(Math.max(arr)); // NaN
alert(Math.max(...arr)); // 5  배열끼리 합칠떄도사용 가능

// 변수 유효범위와 클로저
// 코드 블록
// {...} 안에서 선언한 변수는 블록 안에서만 사용 가능
{ let a = 1; } { let a = 2; }

// 중첩함수
function makeCounter() {
  let count = 0;
  return function () { return count++; }
};
let counter = makeCounter(); alert(count()); // X3 => 0,1,2
/*
  렉시컬 환경  구성 : 환경 레코드(내부 객체), 외부 렉시컬 환경
    단계 1. 변수
    환경 레코드 : 모든 지역변수를 프로퍼티로 저장하고 있는 객체 (현재 실행 중인 함수와 코드 블록, 스크립트와 연관됨)
    외부 렉시컬 환경에 대한 참조 : 외부 코드와 연관됨
    변수는 환경레코드의 프로퍼티일 뿐, 변수 데이터 변경은 환경레코드 프로퍼티 변경임
  
    단계 2. 함수 선언문
    함수선언문으로 선언한 함수는 일반 변수와는 달리 바로 초기된다는점에서 차이
    함수는 렉시컬 환경 생성시 바로 사용, 변수는 let 을 만나 선언될때 까지 사용 불가능, 선언하기 이전에 사용 가능한 이유임
    
    단계 3. 내부와 외부 렉시컬 환경
    함수를 호출해 실행함녀 새로운 렉시컬 환경 생성, 여기에 호출시 넘겨 받은 매개변수와 지역변수 등 저장됨
    내부 렉시컬 환경에서 검색 후 원하는 변수 찾지 못하면 외부 렉시컬 환경으로 확장, 계속해서 반복
      따라서 변수는 내부 렉시컬에서 처리하는게 좋다는건가?
  
    단계 4. 반환 함수
    function makeCounter() { let count = 0; return function() { return count++; }}
    let counter = makeCounter();
    makeCounter();    // 호출할 떄마다 새로운 렉시컬 환경 객체가 만들어짐
      변수값 갱신은 렉시컬 환경에서 이뤄짐

  ** 클로저 (외부변수를 기억하고 이 외부변수에 접근 할 수 있는 함수를 의미)

  자바스크립트 함수는 숨김 프로퍼티인 [[Environment]]를 이용해 자신이 어디서 만들어졌는지 기억, 함수 내부의 코드는 이를 이용해 외부변수에 접근
  프런트엔드 개발자 채용 인터뷰에서 "클로저가 무엇입니까?"라는 질문을 받으면, 클로저의 정의를 말하고 자바스크립트에서 왜 모든 함수가 클로저인지에 관해 설명하면 될 것 같습니다. 이때 [[Environment]] 프로퍼티와 렉시컬 환경이 어떤 방식으로 동작하는지에 대한 설명을 덧붙이면 좋습니다.

  함수를 호출하고 결과를 어딘가에 저장을 하면 렉시컬 환경이 메모리에 유지됨. 삭제 안됨 결과 null 처리시 메모리에서 제거
*/

// 즉시 실행 함수 표현식
(function () { });

// 전역 객체
//var 로 선언한 변수는 전역 객체의 프로퍼티가 됨 근데 잘 안씀, let은 전역으로 안올라감
let gLet = 5; alert(window.gLet); // undefined 
// 굳이 중요한 변수라서 전역으로 만들어줘야 한다면 직접 프로퍼티를 추가해주세요
window.currentUser = { name: "John" };

// 객체로서의 함수와 기명 함수 표현식
// 함수의 자료형은??? 객체임, 호출 가능한 행동 객체
function sayHi() { alert('hi!') }; alert(sayHi.name) // sayHi
let sayHi = function () { }; alert(sayHi.name);      // 익명함수
function f(sayHi = function () { }) { alert(sayHi.name) }; f();   // 기본값 할당
sayHi.name // 으로 함수 이름 도출

sayHi.length  // 으로 함수 호출에 필요한 매개변수 길이 도출
// 이거 사용하면 매개변수 개수에 따라 달라지는 함수 만들때 효율적
// 커스텀 프로퍼티
function sayHi() { alert('Hi'); sayHi.counter++; }; sayHi.counter = 0; sayHi(); sayHi(); alert('호출횟수 : ', sayHi.counter);
// ** 프로퍼티는 변수가 아님, 함수내에 지역변수 counter가 안만들어짐. let counter 과는 무관
// 클로저는 함수 프로퍼티로 대체 가능 근데 외부에서 접근 불가능, 오직 중첩함수 내부에서만 수정 가능

/* 기명 함수 표현식 
  1. 이름을 사용해서 함수 표현식 내부에서 자기자신 참조 가능
  2. 기명 함수 표현식 외부에서 이름 사용 불가  */
let sayHi = function func(who) {
  if (who) { alert(`Hello ${who}`) } else {
    func("Guest");    // 자신을 호출,
  }
}; sayHi();  // Hello Guest
func(); // 는 불가능

// new Function 문법    동적 컴파일, 복잡한 웹 어플 등 구현 시 사용
// 런타임에 받은 문자열을 이용해서 함수를 만들 수 있음! 어떤 문자열도 함수로 바꿀 수 잇음
// 서버에서 전달받은 문자열을 이용해 새로운 함수를 만들고 실행 가능
let func = new Function([arg1, arg2, ...argN], functionBody);
new Function('a', 'b', 'return a + b'); // 기본 문법
new Function('a,b', 'return a + b'); // 쉼표로 구분
new Function('a , b', 'return a + b'); // 쉼표와 공백으로 구분

// new Function 클로저
// [[Environment]]프로퍼티가 렉시컬 환경이 아닌 전역 렉시컬 환경을 잠조함
// 외부 변수에 접근 불가, 오직 전역 변수만 접근 가능
// 압축기 = 난독화 ?? 같은거인듯?

// setTimeout, setInterval 을 이용한 호출 스케쥴링
function sayHi(who) { alert(who + '안녕?') };
let timerId = setTimeout(sayHi, 1000, '너는 누구냐?');  // 10초 후 호출
timerId();
clearTimeout(timerId);  // 스케줄링 취소

setInterval(sayHi, 1000); // 10초마다 반복

// 중첩 setTimeout
// Ex) 서버 과부하 상태 요정 간격 조절
let delay = 5000;
let timerId = setTimeout(function request() {
  // ...요청 보내기... if (서버 과부하로인한 요청 실패) // 요청 간격 늘림
  if (true) { delay *= 2; }
  timerId = setTimeout(request, delay);
}, delay);

// 대기시간이 0인 setTimeout
setTimeout(func, 0); setTimeout(func) // 대기시간 0으로 설정 가능
setTimeout(() => alert('world!'));
alert('Hello');   // Hello, world! 순서대로 호출됨
// 스크립트 먼저 다 실행 한 다음 setTimeout에 있는 것 사용

// 6.9 부터는 다음에 다루겠습니다... 조금 어렵네됴??



// call / apply 와 데코레이터, 포워드
// 함수를 다룰 때 탁원한 유연성을 제공, 이곳 저곳 전달, 객체로 사용 가능 함수가 말이여
// 함수간에 호출을 어떻게 포워딩 하는지, 함수를 어떻게 데코레이팅 하는지 알아봅시다

// 코드변경없이 캐싱 기능 추가
function slow(x) {
  // cpu 집약적인 작업이 여기에 위치
  alert(`slow(${x})를 호출함`); return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {    // 여기 function(x)가 래퍼, 이거는 func(x)의 호출 결과를 캐싱 로직으로 감쌈
    if (cache.has(x)) { return cache.get(x) };  // 해당 키가 존재하면 대응 값 읽어옴
    let result = func(x); // 그렇지 않으면
    cache.set(x, result); // 결과를 캐싱(저장) 함
    return result;
  }
}
// 파라미터에 함수를 집어넣어 놓고 새로운 함수를 다시 생성햇따는건가???
slow = cachingDecorator(slow);    // 이게 어떻게 작동하는건지 잘 모르겠다.. %%%%%
alert(slow(1)); // slow(1) 이 저장
alert('다시 호출 : ' + slow(1)); // 동일
alert(slow(2)); // slow(2) 이 저장
alert('다시 호출 : ' + slow(2)); // 동일
// cachingDecorator 같이인수로 받은 함수의 행동을 변경시켜주는 함수를 데코레이터라 함
// 모든 함수 대상으로 호출 가능 (유용하게 사용함)
// 캐싱 관련 코드를 함수코드와 분리 가능 => 코드 간결해짐

// 래퍼 함수 (cachingDecorator) 사용 시 이점
// 재사용 가능, 어디에서든 래퍼 함수 적용 가능
// 캐싱 로직이 분리되어 slow 자체의 복잡성 증가 ㄴㄴ
// 필요하면 여러개의 데코레이터 조합해서 사용 가능

//  func.call 을 사용해 컨텍스트 지정
// 위에서 사용한거는 객체 메서드에 사용하기에는 비적합  (제대로 동작 X)

let workder = { // ...
  slow(x) { alert('알랄라'); return x * this.someMethod(); }
}
let result = func(x); // (**) 이부분에서 문제여
alert(worker.slow(2));  // 에러 발생! cannot read prperty 'someMethod' of undefined
    // this.someMethod 접근에 실패!   => this 의 컨텍스트 사라짐
    // this 를 명시적으로 고정해 함수를 호출하는 func.all(context, arg1, arg2, ...)

