// 작업자 구현, 들어오는대로 작업을 처리할거임
import isv from 'indexed-string-variation';
import { createHash } from 'crypto';
const { generator } = isv;

// 주어진 범위 내에서 인덱스 반복, 인덱스에 해당하는 변형 문자들을 생성
export function processTask(task) {
  const variationGen = generator(task.alphabet);
  console.log(
    `Processing from ${variationGen(task.batchStart)} (${task.batchStart} to ${variationGen(task.batchEnd)} (${task.batchEnd}))`
  );

  for (let idx = task.batchStart; idx <= task.batchEnd; idx++) {
    const word = variationGen(idx);
    const shasum = createHash('sha1');  // sha1 알고리듬으로 주어진 값 넣어서 만들고, 16진수 변환 후 비교를 함, 맞다면 값을 호출자에게 리턴함
    shasum.update(word);
    const digest = shasum.digest('hex');

    if (digest === task.searchHash) {
      return word;
    }
  }
}