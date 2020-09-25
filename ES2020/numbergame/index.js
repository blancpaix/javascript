const input = document.querySelector('#input');
const check = document.querySelector('#check');
const logs = document.querySelector('#logs');

let count = 0;

// const single = String(Math.floor(Math.random() * 10));
// const dual = String(Math.floor(Math.random() * 10));
// const triple = String(Math.floor(Math.random() * 10));
// const quard = String(Math.floor(Math.random() * 10));
// 변수는 최대한 적을수록 좋음  속성도 비슷하고 해서 뭔가 이거는 아까움
// 그룹화가 가능한데 이럴때 쓰는게 배열
let answer = [
];
let numbers = [];
let numberss = Array(10).fill().map((v, i) => i)
for (i = 0; i < 10; i++) {
  numbers[i] = i;
};
let n = 0;
for (let i = 0; i < 4; i+=1) {
  const index = Math.floor(Math.random() * (10 - i));   // numbers.length
  answer.push(numbers[index]);
  numbers.splice(index, 1);
};
console.log(answer);

check.addEventListener('click', () => {
  const value = input.value;
  // 여기서 value = truthy value
  if (value && value.length == 4) {
    if (answer.join('') === value) {    // 배열을 join 으로 문자열로 바꿔줌 '' 면  , 없이 들어감, () 이면 , 사이에 들어감
      logs.textContent('Home Run!');
    } else {
      console.log('다르다!');
      let strike = 0;
      let ball = 0;
      // entries 이거는 뭐임?? 자리까지 표현을 한다는거임? 배열 뒤에만 붙일 수 있음
      for (const [index, n] of answer.entries()) {    // 구조분해 할당 문법이라는데???
        for (const [index2, iString] of input.value.split('').entries()) {
          if (n === Number(iString)) {            
            if (index === index2) {
              strike += 1;
            } else {
              ball += 1;
            }
          }
        }
      }
      logs.appendChild(document.createTextNode(`${value} = ${strike} Strike! ${ball} ball!\t \n`));
      logs.appendChild(document.createElement('br'));   // 이거때문에 제이쿼리을 쓴다고???
    }
  }
  if (count > 10) {
    console.log('더이상 게임 진행 불가 ㅋㅋ');
  } else {
    count += 1;
  }
});


