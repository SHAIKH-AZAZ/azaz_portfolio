'use client';

import { useState, useEffect } from 'react';

/**
 * TypewriterText — phase-based state machine
 * Phase cycle: 'pause' → 'erasing' → 'typing' → 'pause' → ...
 */
export default function TypewriterText({ phrases }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  // Start with first phrase already visible so SSR matches client
  const [displayedText, setDisplayedText] = useState(phrases?.[0] ?? '');
  // 'pause' | 'erasing' | 'typing'
  const [phase, setPhase] = useState('pause');

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIdx];
    let timeout;

    if (phase === 'pause') {
      // Hold the fully-typed phrase for 2.5 seconds, then start erasing
      timeout = setTimeout(() => setPhase('erasing'), 2500);

    } else if (phase === 'erasing') {
      if (displayedText.length === 0) {
        // Fully erased — advance to the next phrase and begin typing
        const nextIdx = (phraseIdx + 1) % phrases.length;
        setPhraseIdx(nextIdx);
        setPhase('typing');
      } else {
        // Erase one character every 40 ms
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 40);
      }

    } else if (phase === 'typing') {
      if (displayedText.length >= currentPhrase.length) {
        // Fully typed — go back to pause
        setPhase('pause');
      } else {
        // Type one character every 70 ms
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 70);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, phraseIdx, phrases]);

  return (
    <span className="typewriter-container">
      <span className="highlight-gradient typewriter-text">{displayedText}</span>
    </span>
  );
}
