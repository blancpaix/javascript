import { useState, useCallback } from 'react';

export default (initialTerm = null) => {
  const [term, setTerm] = useState(initialTerm);
  const handler = useCallback(e => {
    setTerm(e.target.value);
  }, []);

  return [term, handler];
}