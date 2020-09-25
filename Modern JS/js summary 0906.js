// 옵셔널 체이닝 ?.   : 프로퍼티가 없는 중첩 객체에도 에러 없이 안전하게 접근 가능
  let user = {};
  alert(user.address.street);   // Cannot read property.
  let html = documnet.querySelector('.my-elem').innerHTML;    // Cannot read property 'innerHTML'

  // ?.은 앞의 평가대상이 undefined나 null이면 평가를 멈추고 undefined를 반환   %%%%%
  alert(user?.address?.street)    // undefined 로 에러가 발생하지 않음.
  // 옵셔널 체이닝 남용하지는 마세요! 여부가 필요한 항목에만 사용, 그 이외는 디버깅이 어려움
  // ?. 앞으 변수는 선언되어 있어야 함;

  let user = null;    let x= 0;   
  user?.sayHi(x++); // 아무 일도 일어나지 않음
  alert(x)  // 0, x와 값은 증가하지 않음

  // ?.() 는 존재 여부가 확실치 않은 함수 호출 시 사용
  let user1 = { admin() { alert('관리자 계정임')} };
  let user2 = {};
  user1.admin?.();  // 관리자 계정임
  user2.admin?.();  // 에러 없이 그냥 멈춤

  // ?.[] 는 프로퍼티 존재 여부가 확실치 않은 경우 읽을 대 사용
  let user1 = { firstName: 'Violet', };   let user2 = null; // user2는 권한이 없는 사용자 가정
  let key = "firstName";
  laert( user1?.[key]);   // Violet
  alert( user2?.[key]);   // undefined
  alert( user1?.[key]?.somthing?.not?.existing);    // undefined

  delete user?.name;  // user 가 존재하면 user.name 을 삭제, 쓰기에는 사용 불가능

// Symbol type
  let id = Symbol();    // 유일한 식별자를 만듦
  let id2 = Symbol("id");   // symbol ID 에 "id" 라는 설명이 붙음
  let id3 = Symbol("id");
  alert(id2 == id3);  // false

  // 숨김 프로퍼티         외부코드에서 접근 불가능, 값도 덮어 쓸수 없음
  let user = { name: 'John' };    let id = Symbol("id");
  user[id] = 1;
  alert(user[id]);    // 심볼을 키로 사용해서 데이터 접근 가능  => 서드파티 코드가 모르게 식별자 부여

  // for ... in  구문 동작 불가, 하나씩 개별로 접근 가능
  // 지금 당장은 필요해 보이지 않으니 다음에 찾아보고 사용을 합시다
  // React keyExtractor 에서 키값을 따로 빼주는거랑 비슷한 거일듯? 관리 편리성을 위해서?

// 객체를 원시형으로 변환하기
  /* 참고사항
    객체는 논리 평가시 Boolean,   숫자형, 문자형 으로만 형 변한
    숫자형 변환은 객체끼리 연산, 수학 관련 함수 사용시 일어남
    문자형 변환은 객체를 출력 (문자열 기대하는 연산 수행) 시 일어남
    기대하는 자료형이 확실치 않을때 default가 됨
  */
  