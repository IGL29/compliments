import { useRef } from 'react';
import { getDebounce } from '~src/utils/getDebounce';

const useDebounce = (delay: number) => {
  const debouce = useRef(getDebounce(delay));
  return debouce.current;
};

export { useDebounce };
