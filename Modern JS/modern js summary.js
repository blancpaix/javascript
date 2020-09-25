let calculator = {
  firstInput = 0,
  secondInput = 0,
  read() {
    firstInput = +prompt('첫번째 값?', 0);
    secondInput = +prompt('두번쨰 값?', 0);
  },
  sum() {
    return firstInput + secondInput;
  },
  mul() {
    return firstInput * secondInput;
  }
};
calculator.read();
alert(calculator.sum());
alert(calculator.mul());

let calculator = {
  // 이렇게 바로 만들어버리면 바로 삭제되는것이 아닌가???   // 뭐임 이거는??
  read() {
    this.a = +prompt('첫번쟤 값?', 0);
    this.b = +prompt('두번째 값?', 0);
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  }
};

// 메서드 체이닝
let ladder = {
  step: 0,
  up() { this.step++; return this; },
  down() { this.step--; return this },
  showStep() { alert(this.step); return this; }
};

ladder.up().up().down().showStep();