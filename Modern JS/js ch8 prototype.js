/* 프로토 타입 상속 */

/*
  프로토 타입 상속

  기존에 있는 기능 확장 할 경우 (user 객체와 비슷한 admin/guest 객체를 만들 경우)
  user의 메서드를 복사/재구현 하지 않고 기능을 숟가락 얹듯이 사용???

  자바스크립트 객체는 [[Prototype]]이라는 숨김 프로퍼티를 가짐. 값은 null 이거나 다른 객체 참조시 참조 대상임
  object 에서 프로퍼티를 읽으려고 하는데 없으면 자동으로 프로토타입에서 프로퍼티를 찾음=> 프로토타입 상속
  ** [[Prototype] 은 내부 프로퍼티면서 숨김 프로퍼티이지만 다양한 방버을 사용해 개발자가 값 설정 가능
  __proto__ 를 사용해 값을 설정 _ 2개씩...
*/
let animal = { eats: true }; let rabbit = { jumps: true };
rabbit.__proto__ = animal;
/*
  __proto는 [[Prototype]]용 getter/setter 입니다!
  최근에는 __proto__ 사용보다는 Object.getPRototypeOf, .setProtptypeOf 를 사용해 설정
  브라우저 환경에서 지원하도록 만들었는데 서버에서도 지원함.
    순환참조 불가
    __proto__ 의 값은 null 이나 객체만 가능


  쓸 떄는 프로토타입을 사용하지 않습니다! (프로퍼티를 추가, 수정, 삭제 연산은 직접 해야 함.) 직접 됨..?
  중복된 함수를 호출하면 프로토타입은 호출이 안되고 객체에 있는 메서드 호출됨
*/
let user = {
  name: "John",
  surname: "Smith",
  set fullName(value) { [this.name, this.surname] = value.split(" "); },
  get fullName() { return `${this.name} ${this.surname}`; }
};
let admin = { __proto__: user, isAdmin: true };

alert(admin.fullName); // John Smith (*)
// setter 함수가 실행됩니다!
admin.fullName = "Alice Cooper"; // (**)

// 여기서 this 는 프로토타입에 영향을 받지 않습니다! this는 언제나 .앞에 존재하는 객체가 됩니다.


// for ... in 반복문 => 상속 프로퍼티도 순회 대상에 포함됨
let animal = { eats: true }; let rabbit = { jumps: true, __proto__: animal };
// Object.keys는 객체 자신의 키만 반환함
alert(Object.keys(rabbit)); // jumps
// for ...in 은 객체 자신의 키와 상속 프로퍼티의 키 모두 순회
for (let prop in rabbit) alert(prop); // jumps, eats
rabbit.hasOwnProperty(prop);  // 객체 자신만의 프로퍼티만 가져옴, 상속 프로퍼티 거름
// hasOWnProperty 는 열거 가능한 프로퍼티가 아니기 떄문에 외부로 드러나지 않음.

/* 
   키-값을 순회하는 메서드는 대부분 상속 프로퍼티를 제외하고 동작을 합니다
    Object.keys, Object.values 같이 객체의 키-값을 대상으로 하는 무언가를 하는 메서드를 말함
    프로토타입에서 상속받은 프로퍼티는 제외, 해당 객체에서 정의한 프로퍼티만 연산 대상에 포함됨
*/


/* 함수의 prototype 프로퍼티
  new F() 생성자 함수를 통해 새로운 객체 생성 가능
  F.prototype 이 객체면 new 연산자는 F.prototype 을 사용해 새로 생성된 객체의 [[prototype]]을 설정함
    근데 여기서 prototype 은 일반 프로퍼티임 ㅋㅋㅋ 이거를 이용하는 이유를 여기서 다룰예정이여
  F.prototype 프로퍼티는 new F 가 호출될 떄만 사용됨. 만든 후 프로퍼티가 바뀌면 또 다르 객체를 갖게 됨. 기존에 것은 유지됨
*/
let animal = { eats: true }; function Rabbit(name) { this.name = name; };
Rabbit.prototype = animal;  // new Rabbit 을 호출해 만든 새 객체의 [[Prototype]]을 animal 로 설정하라는것
let rabbit = new Rabbit("White Rabbit");    // rabbit.__proto__ == animal;
alert(rabbit.eats);     // true

// 함수의 prototype 프로퍼티와 contructor 프로퍼티
// 모든 함수는 prototype 프로퍼티를 가짐
// 기본 프로퍼티인 protptype 은 contructor 프로퍼티 하나만 있는 객체를 가르킴, contructor 은 함수 자신을 가리킴
// 특별한 조작을 하지 않으면 Rabbit 을 구현한 객체 모두에서 [[prototype]]을 거쳐 contructor 프로퍼티 사용 가능
function Rabbit() { // 기본 prototype
  Rabbit.prototype = { contructor: Rabbit };
}
alert(Rabbit.prototype.contructor == Rabbit); // true

// contructor 속성은 프로토타입 객체를 생성한 함수에 대한 참조를 나타냄
// 근데 .contructor 로 지정을 해주면 JS 는 알맞은 "contructor" 값을 보장하지 않아요 이거는 진짜 알아서 하세요네??
// prototype 값을 다른 객체로 바꾸면 객체에는 contructor 값이 바뀌는거임.. 그래서 false 뜸
// => 이러한 상황 방지하기 위해서 prototype 전체를 덮어쓰지 말고 prototype 에 원하는 프로퍼티를 추가/제거 해야 함
function Rabbit() { }
// Rabbit.prototype 전체를 덮어쓰지 말고 원하는 것만 추가하세요
Rabbit.prototype.jumps = true;    // 이렇게하면 contructor 유지됨 아니면
Rabbit.prototype = { jumps: true, contructor: Rabbit }; // 수동으로 추가했기 떄문에 유지됨


// 네이티브 프로토타입
// prototype 프로퍼티는 광범위하게 사용됨. 모든 내장 생성자 함수에서 사용함...
let obj = {}; // 이 객체의 [[Prototype]] 은 Object.prototype 을 참조함 이 위에는 없음!
// Array, Date, Function 을 비롯한 내장 객체 도한 프로토타입에 메서드 저장해놓음    근데 꼭대기에는 Object.prototype 이 잇음

// 내장 메서드를 바꾸는거는 좋은 방법이 아닙니다! String.prototype.show = function() { alert(this) };  뭐 이런거 있잖어...
// 네이티브 프로토타입 변경을 허용하는 경우는 폴리필을 만들 떄 말고는 없음!


// 프로토타입 메서드와 __proto__ 가 없는 객체     __proto__ 브라우저 대상으로 개바라고 있으면 더는 사용치 마라!
let animal = { eats: true };
Object.create(proto, [descriptors]);  // [[prototype]]이 protp 를 참조하는 빈 객체 생성, 프로퍼티 설명자를 추가로 넘길 수 있음
let rabbit = Object.create(animal, { jumps: { value: true } }); alert(rabbit.jumps);  // true
// 이걸 사용하면 for...in 을 사용해 프로퍼티 복사하는것보다 효율적으로 객체 복사 가능
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptor(obj));  // 완벽한 사본이여!
Object.getPrototypeOf(obj); // obj 의 [[Prototype]]을 반환
Object.setPrototypeOf(obj, proto);  //   obj 의 [[Prototype]]이 proto 가 되도록 설정

/* __proto__ 에 대해서
  __proto__ 는 객체이거나 null 이어야 함, 문자열은 프로토타입이 될 수 없다! 그래서
  let key = prompt('asdfads", "__proto__"); 이면 obj[key] = "...값...";
  alert(obj[key]);  // [object Object] 이 출력됨    => __proto__ 일때 값이 제대로 저장되지 않음!

  내장 메서드를 할당할 댸 예상치 못한 일이 일어남
  해결방법은 => 객체 대신 map 을 사용하면 해결됨
*/
let obj = Object.create(null);  // 이거는 getter/setter 상속 안받음. 근데 내장 메서드가 없음 ㅋㅋㅋ