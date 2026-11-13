'use client';

import { useRef } from 'react';
import { useInView, useProgress, scrambleChar } from '../lib/motion';

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%+';
const DURATION = 900;
const GLYPH_MS = 40; // how often the stand-in glyphs change

// "Decodes" its text left to right the first time it scrolls into view.
export default function ScrambleText({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { threshold: 0.55, once: true });
  const p = useProgress(seen, DURATION, delay);

  const revealed = Math.floor(p * text.length);
  const tick = Math.floor((p * DURATION) / GLYPH_MS);
  const shown = p === 0 || p === 1
    ? text
    : [...text].map((c, i) => (c === ' ' || i < revealed ? c : scrambleChar(CHARS, i, tick))).join('');

  return <span ref={ref} className={className} aria-label={text}>{shown}</span>;
}
