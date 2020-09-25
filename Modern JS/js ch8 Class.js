/* 클래스 */

/* 클래스와 기본 문법
  동일한 종류의 객체를 여러개 생성해야 하는 경우 사용
  new 연산자와 new function(생성자 함수)를 사용
  class 문법을 사용하면 객체 지향에서 사용하는 기능을 JS 에서 사용 가능
*/

// 기본 문법
class MyClass {
  contructor() { ... }    // 객체의 기본 상태 설정해주는 생성자 메서드 contructor() 은 new 에 의해 자동으로 호출됨(특별한 절차 없이 객체 초기화 됨)
  method1() { ... }  // 여러 메서드 정의 가능
  method2() { ... } // 메서드 사이에는 쉼표가 없음
}
class User {
  contructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
let user = new User("John"); user.sayHi();    // 새로운 객체 생성, 넘겨 받은 인수와 함께 Contructor 가 자동 실행

// 클래스란 (함수의 한 종류임)
alert(typeof User); // function
alert(User === User.prototype.contructor);  // true
alert(User.prototype.sayHi);    // alert(this.name);
alert(Object.getOwnPropertyNames(User.prototype));  // contructor, sayHi  (현재 프로토타입에는 메서드가 두개)
/* class User {...} 가 하는 일
  1. User 라는 함수를 만듦. 본문은 생성자 메서드constructr 에서 가져옴, 없으면 비워진 채 생성
  2. sayHi 같은 클래스 내 정의 메서드를 User.prototype 에 저장
*/

/* 클래스는 단순한 편의 문법이 아님
  [[FunctionKind]]:"classContructor"가 만들어지고 이걸로 검증을 함
    따라서 클래스 생성자를 new 와 함께 호출하지 않으면 에러 발생
  클래스 메서드는 열거 불가능 (enumarable 플래그는 false)
    for..in 으로 객체 순회 시 메서드는 순회대상에서 제외하고자 하는 경우가 많아서 이 특징은 유용함
  클래스는 항상 엄격모드로 실행됨(use strict), 클래스 생성자 안 코드 전체에 자동으로 엄격모드 됨
*/

// 클래스 표현식
let User = class { sayHi() { alert('Hello') } };
let User = class MyClass { ... }  // 기명 클래스 표현식 (오직 클래스 내부에서만 사용 가능)
function makeClass(phrase) { return class { sayHi() { alert(phrase) }; }; } // 클래스를 선언하고 이를 반환함
let User = makeClass('Hello');  // 새로운 클래스 생성

// getter setter 계산된 프로퍼티 (computed property)를 포함 할 수도 잇음
class User {
  constructor(name) { this.name = name }
  get name() { return this._name }
  set name(value) {
    if (value.length < 4) { alert('이름이 잛소'); return; }
    this._name = value;
  }
}
// User.prototype 에 getter setter 이 생성되어 get set 사용 가능

// 계산된 메서드 이름 [...]     리터럴 객체와 유사한 형태를 띠기 대문에 사용법을 외우기 쉽다
class USer { ['say' + 'Hi']() { alert('hello!') } }

// 클래스 필드         이 문법을 사용하면 어떤 종류의 프로퍼티도 클래스에 추가 할 수 있음
class User { name = "John"; sayHi() { alert(`Hello, ${this.name}!`); } }
// 클래스 정의 시 <프로퍼티 이름> = <값>을 서주면 간단하게 클래스 필드 만들 수 있음
// 중요한 특징은 User.prototype 이 아닌 개별 객체에만 클래스 필드가 설정됨!

// Making bound methods with class fields
// JS 함수는 동적인 this 를 가짐, 여기저기 전달해서 다른 컨텍스트에서 호출하면 this는 원래 객체 참조 안함
classs Button { constructor(){... } click() {... } }
setTimeout(button.click, 1000); // undefined
// 여기의 this 는 losing this (잃어버린 this) 라고 함
/* 위의 문제 해결법
  1.setTimeout(() => button.click, 1000)  같이 래퍼 함수 전달
  2. 생성자 안 등에서 메서드를 객체에 바인딩하기
    click = () => { alert(this.value);}
    화살표 함수는 Button 객체마다 독립적인 함수를 만들고 함수의 this 를 해당 객체에 바인딩 시켜줌
    button.click 을 아무곳에나 전달 할 수 있고 this에 의도한 값이 들어가게 됨
  이러한 기능은 브라우저 환경에서 메서드를 이벤트 리스너로 설정해야 할때 유용함
*/


/* 클래스 상속
    클래스를 른 클래스로 확장 가능 => 기존에 존재하던 기능을 토대로 새로운 기능 만들기 가능 */

// extends 키워드     프로토타입을 기반으로 동작
// Rabbit.prototype.[[Prototpye]]을 Animal.prototype 으로 설정함. Rabbit.prototype에서 메서드 찾지 못하면 Animal.prototype에서 가져옴
class Child extends Parent { }  // Parnet의 contructor, method 다 상속

// extends 뒤에 표현식도 가능
function f(phrase) { return class { sayHi() { } } }
class User extends f('Hello') { }; new User().sayHi(); // Hello

// 메서드 오버라이딩
// 특별한 일이 없으면 Rabbit은 Animal 메서드 그대로 상속, Rabbit 에서 메서드 자체적으로 정의 => 자체 메서드 사용됨
/* super 의 사용
  super.method(...)는 부모 클래스에 정의된 method 를 호출함
  super(...) 는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 가능

  화살표 함수에는 super를 지원하지 않음. super 에 접근하면 외부 함수에서 가져옴 (의도대로 동작)
  실행;   실행 불가;
*/
setTimeout(() => super.stop(), 1000); setTimeout(function () { super.stop() }, 1000);

// 생성자 오버라이딩
// 1. 자체 생성자가 없는 경우  
class Rabbit extends Animal {
  //  자체 생성자가 없는 클래스를 상속받으면 자동으로 만들어짐
  constructor(...args) { // 자체적으로 부모 contructor 호출
    super(...args)
  }
}
// 2. 자체 생성자가 있는 경우
class Rabbit extends Animal {
  constructor(name, earLength) { this.speed = 0; this.name = name; this.earLength = earLength; }
}
let rabbit = new Rabbit("흰토끼", 10);  // 동작 불가!! 이유는 하단에
/*
  상속 클래스 생성자엔 반드시 super(...)을 호출해야 함. 근데 안해서 에러 발생
  super(...)는 this 를 사용하기 전에 반드시 호출해야 함! 
  해야하는 이유?

  상속 클래스의 생성자가 호출될 때 구분자가 생성됨    [[ContructorKind]]:"derived" 가 붙음
  -일반 클래스가 new와 실행 시 빈객체 생성과 this에 객체를 할당함
  -상속 클래스의 생성자 함수 실행시 위의 일 발생X, 빈객체 생성, this에 객체 할당은 부모클래스의 생성자가 처리해주길 기대!
    => super 을 호출해서 부모 생성자를 실행 해줘야 함.
*/
class Rabbit extends Animal { contructor(name, tall) { super(name); this.tall = tall; } }
    // 근데 name 도 받고 speed 도, tall 도 받는데?? 뭐임?

    // 체인에서 위로 올라가지 못하는 경우(순환 참조) 
    // 함수전용 특수 내부 프로퍼티 [[HomeObject]]     super.method() 로 계속해서 위로 올리는듯?

    // 9.2 마지막 부분은 [[HomeObject]]에서 대충 넘김