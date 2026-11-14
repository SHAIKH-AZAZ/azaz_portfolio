'use client';

import { useRef } from 'react';
import { useInView, useProgress } from '../lib/motion';

// Stack section: headline, count-up stats and jump links beside a 5x5 window of tool tiles that
// drifts left to right, cycling through every tool (after the "integrations-4" block's look).
// Entrance is CSS, started by `is-visible`; JS only counts the stats up.
const COUNT_MS = 1600;
// the stats fade in (stack-grid.css) and count up on the same schedule
const COUNT_START = 900;
const COUNT_STAGGER = 120;

// The tile board: ROWS high, PERIOD columns per loop (even, so the checkerboard lines up at the
// seam). Logos sit on the odd squares and take the tools in turn; the rest are empty tiles.
const ROWS = 5;
const PERIOD = 10;
let logoSlot = 0;
const CELLS = Array.from({ length: ROWS * PERIOD }, (_, k) => {
  const row = k % ROWS;
  const col = Math.floor(k / ROWS);
  return (row + col) % 2 ? { row, col, slot: logoSlot++ } : { row, col };
});

const TAGS = [
  { label: 'Live projects', href: '#work', icon: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /> },
  { label: 'Automation', href: '#features', icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /> },
  { label: 'How I deliver', href: '#how-it-works', icon: <path d="M4 6h10M4 12h16M4 18h7M17 3l3 3-3 3" /> },
  { label: 'Start a project', href: '#contact', icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /> },
];

export default function StackGrid({ stats, headline, tools }) {
  const rootRef = useRef(null);
  const visible = useInView(rootRef, { threshold: 0.25, once: true });

  const total = COUNT_START + (stats.length - 1) * COUNT_STAGGER + COUNT_MS;
  const t = useProgress(visible, total);
  const progress = stats.map((_, i) => {
    const local = Math.min(Math.max((t * total - (COUNT_START + i * COUNT_STAGGER)) / COUNT_MS, 0), 1);
    return 1 - Math.pow(1 - local, 4);
  });

  return (
    <div
      ref={rootRef}
      className={`stack${visible ? ' is-visible' : ''}`}
      style={{ '--stat-start': `${COUNT_START}ms`, '--stat-stagger': `${COUNT_STAGGER}ms` }}
    >
      <div className="stack-copy">
        <h2 className="stack-headline">{headline}</h2>

        <dl className="stack-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="stack-stat" style={{ '--i': i }}>
              <dt>{s.label}</dt>
              <dd>{Math.round(s.value * progress[i])}</dd>
            </div>
          ))}
        </dl>

        <nav className="stack-tags" aria-label="Jump to">
          {TAGS.map((tag, i) => (
            <a key={tag.label} href={tag.href} className="stack-tag" style={{ '--i': i }}>
              <span className="stack-tag-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {tag.icon}
                </svg>
              </span>
              {tag.label}
            </a>
          ))}
        </nav>
      </div>

      {/* decorative: every tool is also listed by name in the About section */}
      <div className="stack-visual" aria-hidden="true">
        <div className="stack-window" style={{ '--period': PERIOD }}>
          <div className="stack-track">
            {[0, 1].map((copy) =>
              CELLS.map(({ row, col, slot }) => (
                <span
                  key={`${copy}-${row}-${col}`}
                  className={slot === undefined ? 'stack-tile' : 'stack-tile has-logo'}
                  style={{ '--row': row, '--col': col + copy * PERIOD }}
                >
                  {slot !== undefined && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/logos/${tools[slot % tools.length].logo}`} alt="" width="40" height="40" />
                  )}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
