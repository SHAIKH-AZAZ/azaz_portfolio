'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%+';

export default function ScrambleText({
  text,
  as: Component = 'span',
  className,
  chars = DEFAULT_CHARS,
  duration = 900,
  delay = 0,
}) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayText(text);
      return undefined;
    }

    let hasPlayed = false;
    let timeoutId;

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const play = () => {
      window.cancelAnimationFrame(frameRef.current);

      const start = performance.now();
      const length = text.length;

      const tick = (now) => {
        const elapsed = Math.max(0, now - start);
        const progress = Math.min(elapsed / duration, 1);
        const revealed = Math.floor(progress * length);

        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return char;
              return index < revealed || progress === 1 ? char : randomChar();
            })
            .join('')
        );

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(tick);
        }
      };

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayed) return;
        hasPlayed = true;
        timeoutId = window.setTimeout(play, delay);
        observer.disconnect();
      },
      { threshold: 0.55 }
    );

    observer.observe(element);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, [chars, delay, duration, text]);

  return (
    <Component ref={ref} className={className} aria-label={text}>
      {displayText}
    </Component>
  );
}
