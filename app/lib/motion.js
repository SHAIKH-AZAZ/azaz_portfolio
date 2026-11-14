'use client';

import { useEffect, useState } from 'react';

// true while the element is on screen; with `once`, stays true after the first time
export function useInView(ref, { threshold = 0, once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (once && entry.isIntersecting) observer.disconnect();
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
}

// Linear 0 → 1 over `duration` ms, starting `delay` ms after `start` first turns true.
// It never resets, and jumps straight to 1 under prefers-reduced-motion.
export function useProgress(start, duration, delay = 0) {
  const [started, setStarted] = useState(false);
  const [t, setT] = useState(0);
  if (start && !started) setStarted(true);

  useEffect(() => {
    if (!started) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let t0 = null;
    const tick = (now) => {
      t0 ??= now;
      const p = reduced ? 1 : Math.min(Math.max((now - t0 - delay) / duration, 0), 1);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, duration, delay]);

  return t;
}

// Stand-in glyph while text "decodes". Deterministic in (index, tick), so renders stay pure.
export function scrambleChar(chars, index, tick) {
  return chars[(index * 17 + tick * 7) % chars.length];
}
