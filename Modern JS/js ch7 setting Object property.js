// 객체 프로퍼티 설정
// 객체에는 프로퍼티가 저장됨 (지금까지는 키-값 쌍으로 다룸)
// 사실 프로퍼티는 더 강력함!

// 여기서는 객체 프로퍼티 추가 구성 옵션 몇가지를 다루고 옵션을 이용해 쉽게 setter getter 함수를 만들어봄

/* 프로퍼티 플래그
  객체 프로퍼티는 value와 함께 flag 라는 특별한 속성 세가지를 가짐
  writable : true-값을 수정 가능, 아니면 읽기만 가능
  enumerable: true-반복해서 나열 가능, 아니면 불가능
  configurable: true-삭제,플래그 수정 가능, 아니면 불가능
  일반적으로 객체 생성시 플래그는 모두 true임
*/
// 플래그를 얻는 방법
Object.getOwnPropertyDescriptor(obj, propertyName)   // 특정 프로퍼티에 대한 정보 모두 얻음
// obj: 대상 객체, propertyName: 프로퍼티 설명자라는 객체 반환, 프로퍼티 값과 세 플래그 정보 담김

// 플래그를 수정하는 방법
Object.defineProperty(obj, propertyName, descriptor)
// obj, propertyName: 위 참조, descriptor: 적용하고자 하는 프로퍼티 설명자
// 플래그 정보가 없으면 자동으로 플래그값이 false 로 변경

let user = { name: 'John' };

// writable 플래그 설정 (값이 없으면 자동으로 false)
Object.defineProperty(user, "name", {
  writable: false,
  // value: 'Park', enumerable: true, configurable: true,
});
// enumerable 플래그
// 커스텀 메서드 toString 을 추가하면 for...in 에 toString 이 나타나서 열거 가능
let user = { name: 'John', toString() { return this.name; } };
for (let key in user) alert(key);   // name, toString    열거 가능
// 플래그 enumerable: false 지정시 열거 불가능
Object.defineProperty(user, "toString", { enumerable: false });
// configurable 플래그    (Math.PI 쓰기와 열거, 구성이 불가능함)
// 구성 가능하지 않음을 나타냄  false 설정시 해당 프로퍼티는 객체에서 삭제 불가
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
alert(JSON.stringify(descriptor, null, 2));
// {"value": 3.141592653589793, "writable": false, "enumerable": false, "configurable": false }
// 값을 삭제하거나 덮어쓰는것 불가능 // wriable 플래그가 true 이면 프로퍼티 값 변경은 가능함... ㅋㅋㅋㅋ
// configurable 플래그 false 설정 시 돌이킬 방법이 없음 => 영원히 변경할 수 없는 값에만 사용

// 여러개의 프로퍼티 한번에 정의 
Object.defineProperties(obj, { prop1: descriptor1, prop2: descriptor2, });
// 프로퍼티 설명자 전부 가져오기
Object.getOwnPropertyDescriptors(obj);
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// 객체의 수정을 막아주는 다양한 메서드 필요시 갖다 쓰세요
// https://ko.javascript.info/property-descriptors#ref-1112


// 프로퍼티 getter와 setter
// 객체 프로퍼티는 두종류로 나뉨
// 1. 데이터 프로퍼티 (지금까지 사용한 모든 프로퍼티는 데이터 프로퍼티)
// 2. 접근자 프로퍼티 (새로운 종류의 프로퍼티, 본질은 함수, get, set 역할 담당)
// 객체 리터럴 안에서 getter,setter 메서드는 get,set 으로 나타냄
let obj = {
  get propName() {
    // getter, obj.propNAme 을 실행 시 실행되는 코드
  }, set propName(value) {
    // setter, obj.propName = value 를 실행할 때 실행되는 코드
  }
}

let user = {
  name="Jo", surName: "Smith",
  get fullName() { return `${this.name} ${this.surName}` },
  set fullName(value) { [this.name, this.surName] = value.split(" "); },
};
alert(user.fullName); // Jo Smith
for (let key in user) alert(key);   // name, surName
// fullName으로 접근 시 에러 발생 => 위 함수에 set 추가

// ** 주의사항 ** 접근자 프로퍼티나 데이터 프로퍼티 중 한 종류만 속하고 둘다 속할 수 없음!

// getter 와 setter 활용 잘하기
// 이것들을 실제 프로퍼티 값을 감사는 wrapper 처럼 사용하면 프로퍼티 값을 원하는 대로 통제 가능
// 실제 값은 별도의 프로퍼티 _name 에 저장됨
let user = {
  get name() { return this._name; },
  set name(value) {
    if (value.length < 4) {
      alert('너무 짧음');
      return;
    }
    this._name = value;
  }
};
user.name = "Pete"; alert(user.name);   // Pete
user.name = "";   // 너무 짧은 이름을 할당함 알림 띄움
// 기술적으로는 user._name 으로 바로 접근 가능하지만 _로 시작하는 프로퍼티는 객체 내부에서만 활용하고 외부에서 건드리지 않는 것이 관습입니다!

// 호환성을 위해 활용    기존의 객체 프로퍼티를 바꿔야 할때 기존 코드는 그대로 두고 조금 수정해봅시다잉
// 기존 name age => name, birthday
function User(name, age) { this.name = name; this.age = age; }
let john = new User("John", 25); alert(john.age); // 25
// 변환
function User(name, birthday) {
  this.name = name; this.birthday = birthday;
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear = this.birthday.getFullYear();
    }
  });
};
let john = new User("John", new Date(1992, 6, 1));
alert(john.birthday); // birthday를 사용할 수 있습니다.
alert(john.age);      // age 역시 사용할 수 있습니다.