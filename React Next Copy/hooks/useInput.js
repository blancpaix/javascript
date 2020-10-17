// 커스텀 훅 - Input Component 최적화 작업
import { useState, useCallback } from 'react';

const UseInput = (initialValue = null) => {
  const [term, setTerm] = useState(initialValue);
  const handler = useCallback((e) => {
    setTerm(e.target.value);
  }, []);

  return [term, handler, setTerm]; // 구조 맞춰주기
};

export default UseInput;
