'use client';

import { useEffect, useRef, useState } from 'react';
import AITextLoading from './AITextLoading';

const SHOWCASE_WORDS = [
  'Crafting...',
  'Designing...',
  'Programming...',
  'Building...',
  'Deploying...',
];

const WORD_INTERVAL_MS = 1050;
const REVEAL_DELAY_MS = SHOWCASE_WORDS.length * WORD_INTERVAL_MS + 900;

export default function ProjectShowcaseReveal({ children }) {
  const containerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setHasStarted(true);
      setIsReady(true);
      return undefined;
    }

    let revealTimer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStartedRef.current) return;

        hasStartedRef.current = true;
        setHasStarted(true);
        revealTimer = window.setTimeout(() => {
          setIsReady(true);
        }, REVEAL_DELAY_MS);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (revealTimer) window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`project-showcase ${hasStarted ? 'has-started' : ''} ${isReady ? 'is-ready' : 'is-loading'}`}
    >
      <div className="project-showcase-loader" aria-hidden={isReady}>
        {hasStarted && (
          <AITextLoading
            texts={SHOWCASE_WORDS}
            interval={WORD_INTERVAL_MS}
            loop={false}
            className="project-showcase-loader-text"
          />
        )}
      </div>
      {children}
    </div>
  );
}
