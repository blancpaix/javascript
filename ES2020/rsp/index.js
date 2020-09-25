const computerTag = document.querySelector('#computer');
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
// 0 -142 -284

// setTimeout(() => {
//   computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) -142 0`;
//   setTimeout(() => {
//     computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) -284 0`;
//   }, 1000);
// }, 1000);

// const rsp = 'rock';
// rspCoord[rsp]
// rspCoord.rsp    // rspCoord['rsp'] 여기서는 이걸 뜻하니가 차이점을 꼭 알아두시고
// setInterval(() => {
//   if (coord === rspCoord.rock) {
//     coord = rspCoord.scissors;
//   } else if (coord === rspCoord.scissors) {
//     coord = rspCoord.paper;
//   } else if (coord === rspCoord.paper) {
//     coord = rspCoord.rock;
//   }
//   computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord} 0`;
// }, 200);

let computerChoice = 'rock';
const rspCoord = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const intervalMaker = () => {
  return setInterval(() => {
    if (computerChoice === 'rock') {
      computerChoice = 'scissors';
    } else if (computerChoice === 'scissors') {
      computerChoice = 'paper';
    } else if (computerChoice === 'paper') {
      computerChoice = 'rock';
    }
    computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord[computerChoice]} 0`;
  }, 100);
};

const intervalId = intervalMaker();
/*
const intervalId = setInterval(() => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }
  computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord[computerChoice]} 0`;
}, 100);
*/
const rockTag = document.querySelector('#rock');
const scissorsTag = document.querySelector('#scissors');
const paperTag = document.querySelector('#paper');
// 가위 1, 바위 0 보 -1
// 컴퓨터 가위 바위 보
//  가위  0   1   2
//  바위 -1   0   1
//  보   -2  -1   0
const score = {
  rock: 0,
  scissors: 1,
  paper: -1
};

clickBtn = (myChoice) => () => {  
  // 가져오고 조작하고 반영하고 3단계 형식으로
  // 고차함수
  // return () => {  // 리턴값이 파라미터에 그대로 들어간다??
  // 중괄호 다음 리턴이 바로 생기면 리턴 생략 가능
  clearInterval(intervalId);
  const myScore = score[myChoice];
  const computerScore = score[computerChoice];
  const diff = myScore - computerScore;
  const scoreTag = document.querySelector('#score');
  let accScore = Number(scoreTag.textContent);
  if (diff === 0) {
    // 사실 여기는 필요가 없음 
  } else if (diff === 2 || diff === -1) {
    accScore += 1;
  } else if (diff === -2 || diff === 1) {
    accScore -= 1;
  }
  scoreTag.textContent = accScore;
  setTimeout(() => {
    intervalId = intervalMaker();
  }, 2000)
}

rockTag.addEventListener('click', clickBtn('rock'));  // 두번째 파라미터 자리가 함수 자리니까 함수를 리턴해줘야함 ㅇㅇㅇ
  // 호출하는 함수의 함수 자체를 리턴해줘야 함.. 명목상의 함수 호출이 아니라!
  // 클릭 버튼을 하면 뒤에 함수가 도라가면 리턴값으로 바귄다고 생각하면 편함
  // 위의 함수에서는 return undefined 라서.. 여기서 이렇게 쓰면 ('click', undefined) 이렇게 들어가는거임
  // 그러면 어떻게 하냐면 함수가 함수를 리턴하면 됨
scissorsTag.addEventListener('click', clickBtn('scissors'));
paperTag.addEventListener('click', clickBtn('paper'));

// 여기서 다른거는 rock scissors paper 말고느 없어서 이거를 묶어줄거임

/*
rockTag.addEventListener('click', () => {
  let score = 0;
  if (coord === rspCoord.rock) {
  } else if (coord === rspCoord.scissors) {
    score += 1;
  } else if (coord === rspCoord.paper) {
    score -= 1;
  }
});
scissors.addEventListener('click', () => {
  let score = 0;
  if (coord === rspCoord.scissors) {
  } else if (coord === rspCoord.paper) {
    score += 1;
  } else if (coord === rspCoord.rock) {
    score -= 1;
  }
});
paper.addEventListener('click', () => {
  let score = 0;
  if (coord === rspCoord.paper) {
  } else if (coord === rspCoord.rock) {
    score += 1;
  } else if (coord === rspCoord.scissors) {
    score -= 1;
  }
});
*/