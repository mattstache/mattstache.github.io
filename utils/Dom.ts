import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce'

export const useIsSmallScreen = (maxWidth: string): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const resetIsMobile = debounce(() => {
      return setIsMobile(() => getIsMobileSize(maxWidth));
    }, 200);
    window.addEventListener('resize', resetIsMobile);
    resetIsMobile();
    return () => window.removeEventListener('resize', resetIsMobile);
  }, [maxWidth]);
  return isMobile;
};

export const useIsMobile = (): boolean => useIsSmallScreen('650px');

const getIsMobileSize = (maxWidth: string): boolean => window.matchMedia(`(max-width: ${ maxWidth })`).matches;