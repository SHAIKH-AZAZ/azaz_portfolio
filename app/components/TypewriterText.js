'use client';

import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const ERASE_MS = 40;

// Cycles through phrases: hold, erase, type the next. Starts on the first phrase fully typed,
// so the server HTML is real text; under reduced motion it stays there.
export default function TypewriterText({ phrases, hold = 2500, className = 'typewriter-text' }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let word = 0;
    let chars = phrases[0].length;
    let erasing = true;
    let timer;

    const tick = () => {
      if (erasing && chars > 0) {
        chars -= 1;
        setText(phrases[word].slice(0, chars));
        timer = setTimeout(tick, ERASE_MS);
        return;
      }
      if (erasing) {
        erasing = false;
        word = (word + 1) % phrases.length;
      }
      if (chars < phrases[word].length) {
        chars += 1;
        setText(phrases[word].slice(0, chars));
        timer = setTimeout(tick, TYPE_MS);
        return;
      }
      erasing = true;
      timer = setTimeout(tick, hold);
    };

    timer = setTimeout(tick, hold);
    return () => clearTimeout(timer);
  }, [phrases, hold]);

  return <span className={className}>{text}</span>;
}
