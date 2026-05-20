'use client';

import { useState, useEffect } from 'react';

export default function TypewriterText({ phrases }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    
    const activeWord = phrases[currentIdx];
    let timer;

    if (isDeleting) {
      // Erasing characters smoothly
      timer = setTimeout(() => {
        setDisplayedText(activeWord.slice(0, displayedText.length - 1));
      }, 45);
    } else {
      // Typing characters letter by letter
      timer = setTimeout(() => {
        setDisplayedText(activeWord.slice(0, displayedText.length + 1));
      }, 75);
    }

    // When typing reaches the end of the phrase, pause
    if (!isDeleting && displayedText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    }

    // When erasing is complete, advance to next word
    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentIdx, phrases]);

  return (
    <span className="typewriter-container">
      <span className="highlight-gradient">{displayedText}</span>
      <span className="typewriter-caret" />
    </span>
  );
}
