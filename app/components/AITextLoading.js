'use client';

import { useEffect, useMemo, useState } from 'react';

const DEFAULT_TEXTS = [
  'Crafting...',
  'Designing...',
  'Programming...',
  'Building...',
  'Deploying...',
];

export default function AITextLoading({
  texts = DEFAULT_TEXTS,
  className = '',
  interval = 1300,
  loop = true,
}) {
  const stableTexts = useMemo(() => texts.filter(Boolean), [texts]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (stableTexts.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setCurrentTextIndex((prevIndex) => {
        if (!loop && prevIndex >= stableTexts.length - 1) return prevIndex;
        return (prevIndex + 1) % stableTexts.length;
      });
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, loop, stableTexts.length]);

  const text = stableTexts[currentTextIndex] ?? DEFAULT_TEXTS[0];

  return (
    <div className={`ai-text-loading ${className}`} aria-live="polite">
      <span className="ai-text-loading-word" key={text}>
        {text}
      </span>
    </div>
  );
}
