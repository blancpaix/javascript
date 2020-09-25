/* 자료 구조와 자료형 */

// 원시값의 메서드
// 객체 사용 시 시스템 자원 소모 증가, 무겁고 추가 자원 사용
// 원시값에서 메서드 호출 시 임시객체 생성 => 내부 리소스 많이 사용 안함

// 숫자형
let billion = 1e9;
let hexEx1 = 0xff;   // 16진수, 숫자 앞 0x 붙임(대소문자 구분 X)   // 255;
let octaEx1 = 0o377;  // 8진수, 숫자 앞 0o 붙임
let dualEx1 = 0b111;  // 2진수, 숫자 앞 0b 붙임

// toString(base);    base=2 (비트 연산), 16(16진수), 36(url을 줄이는 것과같이 숫자로 된 긴 식별자를 ㅉ랍게 줄일때 유용)
alert(123456..toString(36));    // 2n9c
// 위 숫자를 대상으로 점 하나 사용시 소수로 인식 할 가능성 있음. .. 사요해서 소수가 없다고 판단시킴

Math.floor(-1.1);    // -2 내림
Math.ceil(-1.1);    // -1 올림
Math.round(3.6);    // 4  반올림
Math.trunc(3.1);    // 3  버림 (IE 미지원)

// 부정확한 계산 보정
let sum = 0.1 + 0.2;
alert(sum.toFixed(2));    // 0.30   소수점 2자리에서 보정?? (2)

alert(isNaN(NaN));   // isNaN 함수 : 인수를 숫자로 변환 한 다음 NaN인지 테스트. === NaN 은 사용 X

// parseInt, parseFloat
alert(parseInt('100px'));   // 100  숫자까지만 읽고 오류 발생시 읽은곳 까지만 반환
alert(parseFloat('12.5em')); // 12.5
alert(parseInt('a123'));  // NaN
alert(parseInt('oxff', 16));  // 255  첫번째는 값, 두번째는 진수 지정

Math.random();
Math.max(a, b, c);
Math.min(a, b, c);
Math.pow(n.power); // n을 power 번 거듭 제곱

// 문자열
// \n 줄바꿈,   \r 캐리지 리턴?,    \\ 역슬래시,  \t 탭
// .length 는 프로퍼티 입니다!
// 문자열은 불변입니다 따라서 배열[index]로 접근하여 변경이 불가합니다.

// 대 소문자 변경
alert('Interface'.toUpperCase()); // INTERFACE
alert('Interface'.toLowerCase()); // interface

// 부분 문자열 위치 반환 indexOf()
// 부분 문자열 위치 여부 확인   include(), startsWith(), endsWith()

// 배열
// 요소 변경
let arr = [];
arr.push(...items);   // 마지막에 요소 추가
arr.unshift(...items);    // 맨 앞 요소 추가
arr.pop();      // 마지막 요소 제거
arr.shift();    // 맨 앞 요소 제거

delete arr[1];  // 실행하면 ,, 은 남아있어 값만 제거되고 길이는 유지됨

// splice
arr.splice(index[, deleteCount, elem1, ..., eleN ]);
// index 부터 deleteCount 개수 만큼 삭제, 그자리에 elem1 ~ elemN 배열 대체
// slice
arr.splice([start], [end]); // start 부터 end 인덱스까지 요소 복사 후 새로운 배열 반환
// concat
arr.concat(arg1, arg2...);   // 새 배열을 만들거나 기존 배열에 요소를 추가할 경우 사용
// 배열 객체가 분해되지 않고 통으로 복사되어 더해짐
// 전체 순회
// forEach
arr.forEach((item, index, array) => { console.log(index) });
// 요소 찾기
// find, findIndex            index, array 는 잘 사용 안함
let result = arr.find((item, index, array) => { console.log(item.name) })
// 조건에 부합하면 true 반환되며 반복 멈춤 없으면 undefined 반환
// item - 호출할 요소, index, array - 배열 자기 자신
// filter
let results = arr.filter((item[, index, array]) => { return item.id < 3 });
// 조건을 충족하는 요소 전체를 담은 배열을 반환
// 배열 변경
// map
let result = arr.map((item, index, array) => item.length);
// 함수 호출 결과를 배열로 반환 (배열을 얻기 위해 사용)
// sort(fn)
let result = arr.sort();    // 배열 정렬 (사전순)
// 오름차순 정렬 함수
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
};
let arr = [1, 2, 15];
arr.sort(compareNumeric); alert(arr);
arr.sort((a, b) => a - b);   // 이게 더 축약한 건데 숫자 크고 작음만 나타내면 됨
// reverse  // 역순 정렬
arr.reverse();
// splite(', ');    ', '을 기준으로 나눠서 배열 만듦
// join(';');   각 배열의 요소들을 ; 을 더해서 이어줌
// reduce
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result);
// 최초 호출 시 초기값 0 에서 current 1(배열 요소 반복) 들어감,
// accumulator 인 sum 에서 값들이 쌓임 => 결과는 15 반환
// 마지막 인자인 초기값을 명시하는것 권장
// .isArray
alert(Array.isArray({})); // false
alert(Array.isArray([])); // true
// 배열 메서드와 thisArg    // 아래 항목들에서 자주 사용
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
let army = {
  minAGe: 18, maxAge: 27, canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};
let user = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 },];
// army.canJoin 호출 시 참을 반환해주는 user를 찾음
let solders = users.filter(army.canJoin, army);

// iterable     Symbol 과 같이 쓰이는듯 해서.. 다음기회에

// Map
// 삽입 순서 기억
new Map(); // 맵 생성
map.set(key, value);  // key 에 value 저장
map.get(key);   // key 에 해당 값 반환, 없으면 undefined;
map.has(key); // key 값 존재 여부 판단
map.delete(key);  // key 에 해당하는 값 삭제
map.clear();  // 맵 안의 모든 요소 제거
map.size;   // 맵 요소의 개수 반환

// 체이닝 가능
map.set().set().set();

// 맵 요소에 반복작업
map.keys(); // 각 요소의 키를 모은 반복 가능한 객체를 반환
map.values(); // 각 요소의 값을 모은 이터러블 객체를 반환
map.entries();  // 요소의 [키,값] 을 한쌍으로 이터러블 객체 반환

Object.entreis // 객체를 맵으로 바꾸기 (객체는 [key, value]구조여야 함)
let map = new Map(Object.enteries(obj));
Object.fromEntries  // 맵을 일반 객체로 바꾸기
let obj = OBject.fromEntries(map.entries()); // .entires() 생략 가능

// Set
// 중복을 허용하지 않음. 키가 없는 값이 저장됨
// 방문자 기록시 사용, Array 보다 find 함수 사용에 유용, 유일무이함 확인에 최적화
new Set(iterable);  // t셋 생성
set.add(value);   // 값 추가하고 셋 자신을 반환
set.delete(value);  // 값 제거, 성공시 true 반환 실패시 false 반환
set.has(value); // set 내 값 존재하면 true, 없으면 false 반환
set.clear();    // set 을 비움
set.size;   // set 요소 개수 반환

set.keys(); // 셋 내의 모든 값을 포함하는 이터러블 객체를 반환합니다.
set.values(); // set.keys와 동일한 작업을 합니다. 맵과의 호환성을 위해 만들어진 메서드입니다.
set.entries(); // 셋 내의 각 값을 이용해 만든 [value, value] 배열을 포함하는 이터러블 객체를 반환합니다. 맵과의 호환성을 위해 만들어졌습니다.

for (let value of set) alert(value);
// forEach를 사용해도 동일하게 동작합니다.
// 첫번째: 값, 두번째: 같은 값, 세번째 : 목표 객체(셋); 맵과의 호환성을 위해
set.forEach((value, valueAgain, set) => {
  alert(value);
});


// %%%%%%%%%%%%%%%%%%%%%% 이거는 좀이따 합시다잉...ㅜㅠ
// 위크맵   사용하면 키로 쓰인 객체가 가비지 컬렉션의 대상이 됨
// 맵과이 차이 : 위크맵의 키가 반드시 객체여야 한다. 원시값은 키가 될수 없음
let weakMap = new WeakMap(); let obj = {};
weakMap.set(obj, 'ok');
weakMap.set('test', 'Whoops');  // Error: inalid value used as weak map key
// 위크맵 키로 사용된 객체를 참ㅍ조하는것이 아무것도 없으면 자동으로 삭제됨
let john = { name: 'John' }; let weakMap = new WeakMap();
weakMap.set(john, '...');
john = null;  // 참조를 덮어씀, 메모리에서 John 은 지워짐

// 위크맵은 반복작업과 keys(), values(), entires() 메서드 지원 안함 => 키나 값 전체 얻는것이 불가능
// 지원 메서드
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)

// 유스케이스 : 추가 데이터, (부차적인 데이터를 저장할 곳이 필요할 떄 좋음)

// Object.keys, values, entries (심볼형 무시)
Object.keys(obj); // 키가 담긴 배열을 반환합니다.
Object.values(obj); // 값이 담긴 배열을 반환합니다.
Object.entries(obj); // [key, value] 쌍이 담긴 배열을 반환합니다.

// 구조 분해 할당   가장 많이 쓰이는 자료 구조
let [firstName, surName] = "Bora Lee".split(' ');
let [one, two, ...rest] = [1, 2, 3, 4, 5];
// ... 을 붙인 매개변수는 나머지 요소를 가져옴
let options = { title: "Menu", width: 100, height: 200 };
let { title, width, height } = options;
// title, width, height 로 접근 가능
let { width = 200, height = 300, title } = options;
// width, height 값 수정 가능
let { width: w = 100, height: h = 200, title } = options;
// w: 100, h: 200, title: Menu    새 값에 접근 가능

// let 없이 사용시 () 을 붙혀야 에러가 발생하지 않습니다. 
({ title, width, height } = { title: "Menu", width: 200, height: 100 });
// 배열은 let { items: [item1, item2]} 에서 item1,2 로 바로 접근

// JSON과 메서드
// 객체를 보내거나 로깅을 목적을 출력을 한다면 객체를 문자열로 전환해야 함
JSON.stringify  // 객체를 JSON 으로 바꿔줌    순환참조는 전환 불가
JSON.stringify(exampleObject, ['title']);   // title 이라는 프로퍼티만 인코딩
JSON.stringify(exampleObject, replacer, space); // space: 들여쓰기 횟수 지정

JSON.parse      // JSON 을 객체로 바꿔줌  
JSON.parse(exampleStr, [reviver]);    // reviver 로 원본 객체로 전환시킴
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str, function (key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
alert(meetup.date.getDate()); // 이제 제대로 동작하네요!
