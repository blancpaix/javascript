export function* generateTasks(searchHash, alphabet, maxWordLength, batchSize) {
  let nVariatons = 0;
  for (let n = 1; n <= maxWordLength; n++) {    // 가능한 가장 킨 길이 maxWordLength 에서 끝남
    nVariatons = Math.pow(alphabet.length, n)   // 1부터 정수간격을생성, 0  빈 변형으로 제외
  };

  console.log(`Finding the hashsum source string over ${nVariatons}  possible variations`);

  let batchStart = 1;
  while (batchStart <= nVariatons) {
    const batchEnd = Math.min(batchStart + batchSize - 1, nVariatons);

    yield {
      searchHash,
      alphabet,
      batchStart,
      batchEnd,
    };

    batchStart = batchEnd + 1;    // 이게 뭔지 잘 모르겠다
  };
};

// 매우 큰 정수는 BigInt 사용하면 됨.. Number.MAX_SAFE_INTEGER