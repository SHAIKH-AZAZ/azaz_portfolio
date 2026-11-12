'use client';

import { useEffect } from 'react';

/* Page-level behaviour with no markup of its own:
 * - header hairline once the page scrolls
 * - `is-visible` on each `.reveal` as it enters view; content is never hidden by this,
 *   it only starts component-level effects (e.g. the integration card pop-in)
 * - Lenis smooth scroll, skipped for reduced motion */
export default function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('has-motion');

    const header = document.querySelector('.site-header');
    const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    let lenis = null;
    let rafId = 0;
    let lenisScript = null;
    if (!reduced) {
      lenisScript = document.createElement('script');
      lenisScript.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';
      lenisScript.async = true;
      lenisScript.onload = () => {
        lenis = new window.Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothTouch: false,
        });
        lenis.on('scroll', setHeaderState);
        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      };
      document.head.appendChild(lenisScript);
    }

    return () => {
      window.removeEventListener('scroll', setHeaderState);
      cancelAnimationFrame(rafId);
      io.disconnect();
      lenisScript?.remove();
      lenis?.destroy();
      document.body.classList.remove('has-motion');
    };
  }, []);

  return null;
}
