document.querySelector('#button').addEventListener('click', () => {
  //input 말고는 다 textContent 써야됨.. input 만 valuecf
  let word = document.querySelector('#word').textContent;
  const lastIndex = word.length - 1;
  const input = document.querySelector('#input');

  const error = document.querySelector('#error');
  if (word[lastIndex] === input.value[0]) {
    word = input.value;
    document.querySelector('#log').textContent = input;
    input.value = '';
    error.textContent = '';
    input.focus();
  
  } else {
    word = '틀렸음'
    input.value = '';
    input.focus();
  }
});

// form 은 submit 임 그러면 엔터를 쳐도 넘어감
// 그렇게 안하려면 keydown 이벤트 걸어서 keycode === 13 이렇게 사용하셈