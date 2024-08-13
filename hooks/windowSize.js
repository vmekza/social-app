import { useState, useEffect } from 'react';

export default function windowSize() {
  const hasWindow = typeof window !== 'undefined';

  function getWindowSize() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowSize(getWindowSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowSize;
}
