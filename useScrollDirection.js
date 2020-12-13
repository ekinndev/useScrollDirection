import { useEffect, useState } from 'react';

function useScrollDirection() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState(undefined);

  useEffect(() => {
    function handleScroll() {
      const newY = window.scrollY;
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
