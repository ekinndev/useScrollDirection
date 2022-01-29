import { useEffect, useState } from 'react';

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

function useScrollDirection(time = 100) {
  if (typeof window === 'undefined') return;
  const isClient = typeof window === 'object';

  const getSize = () => {
    return isClient ? window.scrollY : undefined;
  };

  const [_, setScrollY] = useState(getSize());
  const [scrollDirection, setScrollDirection] = useState(undefined);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleScroll() {
      const newY = getSize();
      setScrollY(prevState => {
        setScrollDirection(prevState > newY ? 'up' : 'down');
        return newY;
      });
    }

    const debouncedHandleScroll = debounce(handleScroll, time);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  return scrollDirection;
}

export default useScrollDirection;
