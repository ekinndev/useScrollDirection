import { useEffect, useState } from 'react';

function useScrollDirection() {
  if (typeof window === 'undefined') return;
  const isClient = typeof window === 'object';

  const getSize = () => {
    return isClient ? window.scrollY : undefined;
  };

  const [scrollY, setScrollY] = useState(getSize());
  const [scrollDirection, setScrollDirection] = useState(undefined);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleScroll() {
      const newY = getSize();
      setScrollY(prevstate => {
        setScrollDirection(prevstate > newY ? 'up' : 'down');
        return newY;
      });
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
}

export default useScrollDirection;
