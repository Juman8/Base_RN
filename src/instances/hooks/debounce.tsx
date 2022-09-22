import {useEffect, useRef, useState} from 'react';

function useDebounceValue(value: number | string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function useDebounceFunction(callBack: () => void, delay = 500) {
  const timer = useRef<any>();

  const onPlay = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callBack();
    }, delay);
  };

  return onPlay();
}

export {useDebounceValue, useDebounceFunction};
