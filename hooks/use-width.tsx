import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

interface DebounceFunc {
  <F extends (...args: any[]) => any>(func: F, wait: number): F;
}

const debounce: DebounceFunc = (func, wait) => {
  let timeout: NodeJS.Timeout | null;

  return function (this: any, ...args: any[]) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait) as any;
  } as any;
};

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 200, height: 500 });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return windowDimensions;
}