'use client';

import { useEffect } from 'react';
import 'lenis/dist/lenis.css';

// Page-wide motion. Any element with `.reveal` fades up the first time it scrolls in (the
// transition is CSS in base.css; this only adds `.is-visible`). `body.has-motion` gates those
// styles, so without JS nothing is hidden. Elements revealed together stagger by 80 ms.
export default function Motion() {
  useEffect(() => {
    const body = document.body;
    body.classList.add('has-motion');

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          const el = entry.target;
          el.style.setProperty('--reveal-i', i);
          el.addEventListener('transitionend', () => el.style.removeProperty('--reveal-i'), { once: true });
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    let lenis = null;
    let cancelled = false;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      import('lenis').then(({ default: Lenis }) => {
        if (!cancelled) lenis = new Lenis({ duration: 1.2, autoRaf: true });
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      lenis?.destroy();
      body.classList.remove('has-motion');
    };
  }, []);

  return null;
}
