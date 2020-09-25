// 커스텀 훅 만들기 
import { useState, useCallback } from 'react';

const UseInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
}

export default UseInput;