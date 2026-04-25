import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width < breakpoint (default 768px).
 * SSR-safe: starts as false, updates after mount.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, [breakpoint]);

  return isMobile;
}
