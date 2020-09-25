const numberInput = document.querySelector('#input');
// input 의 value 값은 무조건 문자열이라서 치환을 해줍시다
// typeof 잘 활용하세용
const clearBtn = document.querySelector('#clear');
const plusBtn = document.querySelector('#plus');
const minusBtn = document.querySelector('#minus');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const calcBtn = document.querySelector('#calc');
const resultInput = document.querySelector('#result');

let temp;
let operator;

plusBtn.addEventListener('click', () => {
  if (numberInput.value) {
    temp = Number(numberInput.value);
    operator = '+'
    numberInput.value = null;
  }
});

clearBtn.addEventListener('click', () => {
  numberInput.value = '';
  temp = null;
  operator = null;

});

calcBtn.addEventListener('click', () => {
  if (operator) {
    if (numberInput.value) { 
      console.log(temp + operator + Number(numberInput.value));
      switch (operator) {
        case '+':
          resultInput.value = temp + Number(numberInput.value);
        case '-':
          resultInput.value = temp - Number(numberInput.value);
        case 'X':
          resultInput.value = temp * Number(numberInput.value);
        case '/':
          resultInput.value = temp / Number(numberInput.value);
        default :
          console.log('이거 잘못함...');
      }
      temp = resultInput.value; // 중복 처리
    }
  } else {
    if (numberInput.value) {
      resultInput.vaule = temp; 
    }
  }
});