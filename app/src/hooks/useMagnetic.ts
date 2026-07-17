import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

// Subtle cursor-follow effect for primary CTAs, matching the original
// prototype's "magnetic button" micro-interaction. Skipped entirely
// under prefers-reduced-motion.
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transition = 'transform .1s ease';
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const onLeave = () => {
      el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  return ref;
}
