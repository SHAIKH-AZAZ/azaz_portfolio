'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAME = 'Azaz Shaikh';
const KEY = 'intro-seen';

export default function IntroOverlay() {
  const root = useRef(null);
  const tlRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === '1'; } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) {
      setDone(true);
      return;
    }

    const el = root.current;
    const q = gsap.utils.selector(el);
    const count = { v: 0 };
    document.documentElement.style.overflow = 'hidden';

    const finish = () => {
      try { sessionStorage.setItem(KEY, '1'); } catch {}
      document.documentElement.style.overflow = '';
      setDone(true);
    };

    const tl = (tlRef.current = gsap.timeline({ onComplete: finish }));
    tl.to(count, {
      v: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(count.v);
        q('.intro-count')[0].textContent = String(n).padStart(3, '0');
        q('.intro-bar')[0].style.transform = `scaleX(${n / 100})`;
      },
    })
      .from(q('.intro-char'), { yPercent: 110, duration: 0.7, ease: 'power4.out', stagger: 0.035 }, '-=0.35')
      .from(q('.intro-role'), { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, '-=0.35')
      .to(q('.intro-meta'), { opacity: 0, duration: 0.3 }, '+=0.45')
      .to(q('.intro-char'), { yPercent: -110, duration: 0.5, ease: 'power3.in', stagger: 0.02 }, '<')
      .to(q('.intro-role'), { opacity: 0, duration: 0.3 }, '<')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.1');

    const skip = () => tl.progress(1);
    window.addEventListener('keydown', skip, { once: true });

    return () => {
      tl.kill();
      window.removeEventListener('keydown', skip);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="intro" role="presentation" onClick={() => tlRef.current?.progress(1)}>
      <div className="intro-center">
        <h2 className="intro-name" aria-label={NAME}>
          {[...NAME].map((c, i) => (
            <span key={i} className="intro-char-wrap" aria-hidden="true">
              <span className="intro-char">{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </h2>
        <p className="intro-role">Full-Stack Engineer · Automation · Interactive UI</p>
      </div>
      <div className="intro-meta">
        <span className="intro-count">000</span>
        <span className="intro-track"><span className="intro-bar" /></span>
        <span className="intro-hint">click or press any key to skip</span>
      </div>
    </div>
  );
}
