console.log('hello JS');

// 화면에 쓰기
document.write('heelo JS');



document.querySelector('#click').addEventListener('click', () => {
  const a = document.querySelector('#first').value;
  const b = document.querySelector('#second').value;
  const result = document.querySelector('#result');

  if (a) {
    if (b) {
      // span 은 textContent 로 써야함
      const c = a * b;
      result.textContent = c;
    } else {
      result.textContent = "두번째 값 ㄴㄴ";
    }
  } else {
    result.textContent = "첫번째 값 ㄴㄴ";
  };
})
