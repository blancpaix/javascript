// BigInt 자료형  제일 뒤에 n 을 붙임
const bigInt = 123213213213213213213213n;
// 일반적으로 datetime 을 쓰면 뒤에 n값은 안붙어서 처리가 복잡해짐

// undefined 는 할당되지 않은 변수의 초기값을 위한 예약어
// 변수 재할당에는 null 사용 권장
// Symbol 객체의 고유 식별자 생성 시 사용

typeof 'n'; typeof 10n; typeof true; typeof 'foo'
typeof null;  // 하위호환성 유지를 위해 오류 남겨둠 %%%

// 브라우저 상호 동작
alert('알림');  // 단순 알림
let defaultValue = 0;
let yourValue = prompt('값 입력', defaultValue);  // yourValue 값 입력
confirm('니가 보스여?');    // true / false 반환

// 형변환
String(1234);   // '1234'
Number("1234")  // 1234
Number(null)    // 0
Number(undefined) // NaN
Boolean(1)      // true
Boolean(0)      // false
Boolean("0")    // 비어있지 않은 문자열은 언제너 true 입니다
// 0, null, undefined, NaN. "" => false   // [], {} => true

// 연산자   왼쪽부터 진행
console.log(5 % 2);
console.log(5 ** 2);    // ^2   pow(x, n);
console.log('1' + 2);   // 피연산자가 하나라도 문자열이면 모두 문자열 변환

// 연산자의 형변환    숫자형이 아닌 자료형에 +를 앞에 붙이면 숫자 형변환 발생
console.log(+true)  // 1
console.log(+"")    // 0

let apple = '2'; let orange = '3';
alert(+apple + +orange)   // 5

// 비교 연산자    기초 수학 연산자
console.log(2 == 2)   // true
// 다른 형 값을 가진 자료형일 경우 숫자형으로 바꾼 후 비교
// === 일치 연산자 좀더 엄격함

// if문     단순화된 다중 ?
let age = prompt('나이?', 10);
let message = (age < 3) ? '아기야 안녕?' :
  (age > 18) ? '안녕 청소년?' :
    (age < 100) ? '안녕하세요...?' :
      '나이가 아주 많으시네요!';
alert(message);

// null 병합 연산자 ??
// 처음으로 정의된 값을 리턴함
// 연산자의 우선순위가 낮기 때문에 복잡할때는 () 사용 추천
a ?? b // 평가 결과 : a가 null 이 아니고 undefined 도 아니면 a, 그 외 b
x = (a != null && a != undefined) ? a : b;
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
alert(firstName ?? lastName ?? nickName ?? "Anonymous");    // Supercoder

let height = 0;
alert(height || 100); // 100
alert(height ?? 100); // 0

// switch 문    Edge와 Chrom은 묶어서 실행
switch (browser) {
  case 'Edge':
  case 'Chrome':
    console.log('Edge & Chrome!!!');
    break;
  case 'Firefox':
    console.log('FireFox!!');
    break;
}

// Function
function showMessage(text) {
  text = text || '빈 문자열';
  // ...
}
function showCount(count) {
  count = count || 'unknown';
}
// return 은 즉시 중료 또는 undefined 반환
return
(returnValue) // 이런식으로 쓰지마세요 return 뒤에는 자동으로 ; 붙기 때문에
return (
  returnValue     // 이런식으로 사용해야 합니다
);
/* 함수 요구사항
!! 함수는 동작 하나만 담당을 해야 함
함수 이름에 언급되는 동작을 정확히 수행하고 그 이외 동작은 수행하지 않아야 함
getAge 함수는 나이를 얻는 동작만, alert 는 따로 빼줍니다
createForm 함수는 form 을 만들고 이를 반환하는 동작만, form 을 문서에 추가하는거는 따로
checkPermission 함수는 승인 여부 확인 결과 반환만 동작, 승인 여부 메시지는 따로

함수 선언문 function func1() { return alpha; }
함수 표현식 let sum = function() { return alpha; }
  화살표 함수로 목진화?

함수 선언문은 선언문이 정의되기 이전에 호출 가능 (전역 함수)
함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성,
그 이후부터 함수 사용 가능
*/

let age = prompt('나이를 알려주세요', 18);
let welcome = (age < 18) ?
  function () { alert('안녕? ') } :
  function () { alert('안녕하세요?') };
welcome();    // 동작



// 코딩 스타일
// Linter EsLinter 작성한 코드 스타일 가이드 준수 여부 확인 (버그 예방)
// 주석
// 주석 좋은 내용 : 고차원 수준 아키텍처, 함수 용례, 당장 봐서는 명확하지 않은 해결방법에 대한 설정
// 나쁜 주석 : 코드 동작 운리, 코드 기능 설명, 코드만으로 해석 불가할 경우만 쓰세요

/*
닌자코드?? 비꼬는건가?? 훈련하려고 만든거??
  1. 코드 최대한 압축해서 짧게 쓰기
  2. 글자 하나만 사용하여 다른 사람이 쉽게 해석하지 못하도록 (이건 배포단계 아님?)
  3. 약어 사용 list=lst userAgent=ua brower=brsr ...  직감이 뛰어난 사람만 읽도록?
  4. 포괄적 명사 사용 data, obj, value, item, elem, str, num ...
  5. 철자가 유사한 단어 사용 data, date => 주의력이 떨어지는 개발자 걸러냄
  6. 동의어 사용
  7. 이름 재사용    함수 구현시 변수 선언 최소화, 매개변수 넘어온 값만 활용
    => 직관력과 암기력 높임
  8. 외부 변수 덮어쓰기 이거 하면 기존 돌아가는거는 막히는거 아님?
*/

// 테스트 자동화와 mocha 는 좀 알아봐야 할듯

// 폴리필 - 바벨 (트랜스파일러) 브라우저 ES6 지원하면서 그 이상의 문법 사용시는 바벨 필요할듯?


/* 객체 */
// 원시값: 메모리에 고정된 크기로 value 저장, 메모리 영역 직접적으로 접근 Access by value
// 참조값: 데이터 크기 미정, 변수가 가지고 있는 메모리 주소값으려 접근 Access by Reference
// const 선언된 객체는 내부가 바뀔 수 있음 안바뀌는거는     프로퍼티 플래그와 설명자 여기서 다룸
let user = new Object(); // 객체 생성자 문법
const userr = {};        // 객체 리터럴 문법    !주로 사용!
let user1 = {
  age: 30,
  name: 'user1name',
  "likes birds": true,     // 여러 단어 조합 시 "" 로 묶음
}
delete user1.age;   // 프로퍼티 삭제
// 키가 유효한 식별자가 아닌경우의 접근법
user1["likes birds"] = false;
// user1[age] : 30
let key = "likes birds";
user[key] === user["likes birds"];

// in 연산자로 프로퍼티 존재 여부 확인
let user2 = {};
alert(user2.noSuchProperty === undefined);  // true 는 해당 프로퍼티가 없음
"key" in object
alert("age" in user1); // true
alert("blabla" in user);  // false;
// undefined 도 true 로 해당하는 key가 존재하면 true 아니면 false;

// 객체 정렬 방식
// 객체는 특별한 방식으로 정렬됨.   정수 프로퍼티는 자동 정렬, 그외는 추가된 순서대로 정렬
// key에 +를 앞에 붙이면 숫자대로 정렬이 되지 않도록 함
let codes = {
  "+49": '독일',
  "+41": "스위스",
}

// 자바 스크립트는 객체 복제 내장 메서드를 지원하지 않음  => 객체를 복제할 일이 거의 없다!
// 참조에 의한 복사로 해결
let user = {
  name: "John",
  age: 30
};
let clone = {}; // 새로운 빈 객체
for (let key in user) { // 빈 객체에 user 프로퍼티 전부를 복사해 넣습니다.
  clone[key] = user[key];
}

// Object.assign
let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };
// permissions1과 permissions2의 프로퍼티를 user로 복사합니다.
Object.assign(user, permissions1, permissions2);
// now user = { name: "John", canView: true, canEdit: true }

// 이렇게도 복제 가능
let user = { name: "John", age: 30 };
let clone = Object.assign({}, user);

// deep cloning (객체의 구조 또한 복사) => _.cloneDeep(obj) 로 사용

// 가비지 컬렉션
// 도달 불가능한 상태면 메모리에서 제거
family = null; // 하면 family 에 할당되어있던 값들이 도달 불가능 한 상태로 모두 제거됨

// 메서드와 this
// 메서드 단축 구문
user = { sayHi() { alert('hello!') } };
// 메서드 내부에서 this 키워드 사용해서 객체에 접근 가능

// this가 없는 화살표 함수 = 외부 컨텍스트에 잇는this 를 이용하고 싶은 경우 유용함
// 콘솔에서는 this 를 못찍는다는게 정설인듯?? 함수 내부에서 this 를 활용하고....
// 함수 내부에서 this.a 같이 이렇게 선언한것은 외부에서 객체 명.a 로 접근이 가능하다! 는 것이 정설
// 그러면 가비지 컬럭터는 언제 저거를 회수해 가는지 잘 모르겠다?


// new 연산자와 생성자 함수 {...} 을 사용하여 객체 생성, new 사용하면 유사한 객체 더 쉽게 생성 가능
// 객체를 생성 할때는 this 가 유용하게 쓰일듯??
function User(name) {
  this.name = name;
  this.isAdmin = false;
};
// !! 첫글자가 대문자인 함수는 new 를 붙여 사용해야 한다! 클래스 처럼 그런거지?

// new function() { ... }  재사용할 필요가 없는 복잡한 객체 생성시 사용
let user = new function () { this.name = "John"; this.isAdmin = false; };
// 위 생성자 함수는 익명함수, 어디도 저장되지 않음. 한번만 호출 후 재사용 불가 => 캡슐화

// 생성자와 return 문
  // 생성자 함수에는 보통 return 문이 없음. 반환해야 할 것들은 모두 this 에 저장 => 반환문 명시 필요 X
  // 객체를 return 하면 this 대신 객체가 반환됨   // 이거 쓸 일이 있나??
  // 원시형 return 하면 return 문 무시
