import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { useCallback, useState } from 'react';

const UseInput = (initalState = null) => {
  const [value, setValue] = useState(initalState);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default UseInput;