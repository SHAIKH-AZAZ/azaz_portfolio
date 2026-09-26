'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Timing ──────────────────────────────────────────────────────────
 * The left card loops through the 4 steps of an example run. The running
 * step's bar fill is a CSS animation; JS only flips the step index.
 */
const STEP_MS = 1100;
const HOLD_MS = 2400;
const COUNT_MS = 1200;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ── The 4 steps behind most manual back-office work ── */
const STEPS = [
  { title: 'Collect the data', text: 'From sheets, email, forms and APIs' },
  { title: 'Clean and check it', text: 'Remove duplicates, fix formats, flag gaps' },
  { title: 'Apply your rules', text: 'Pricing, routing and approvals' },
  { title: 'Deliver the result', text: 'Dashboard, report or alert' },
];

/* ── Typical before → after on shipped workflows ── */
const METRICS = [
  { label: 'Time spent on manual data work', before: 40, after: 3, unit: 'h a week' },
  { label: 'Errors that slip through', before: 9, after: 1, unit: '% of records' },
  { label: 'Wait for a report', before: 45, after: 2, unit: 'min' },
];

const STATE_TEXT = { 'is-done': 'Done', 'is-active': 'Running', 'is-idle': 'Waiting' };

const withUnit = (value, unit) => (unit.startsWith('%') ? `${value}${unit}` : `${value} ${unit}`);

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function BusinessImpact() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  const shellRef = useRef(null);
  const rafRef = useRef(0);
  const countedRef = useRef(false);

  /* Reduced motion + two-way visibility, so the loop pauses offscreen. */
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = shellRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Step loop. step === STEPS.length means "finished", held before restarting. */
  useEffect(() => {
    if (reduced) {
      setStep(STEPS.length);
      return undefined;
    }
    if (!visible) return undefined;

    let timer;
    const run = (current) => {
      timer = setTimeout(() => {
        const next = current >= STEPS.length ? 0 : current + 1;
        setStep(next);
        run(next);
      }, current >= STEPS.length ? HOLD_MS : STEP_MS);
    };
    setStep(0);
    run(0);
    return () => clearTimeout(timer);
  }, [reduced, visible]);

  /* One-shot: the "after" bars shrink from the "before" length and the numbers count down. */
  useEffect(() => {
    if (reduced) {
      setCount(1);
      return undefined;
    }
    if (!visible || countedRef.current) return undefined;
    countedRef.current = true;

    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / COUNT_MS, 1);
      setCount(easeOut(progress));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced, visible]);

  const finished = step >= STEPS.length;

  return (
    <div ref={shellRef} className="bi-grid" style={{ '--bi-step': `${STEP_MS}ms` }}>
      {/* ── LEFT: what gets automated ── */}
      <article className="bi-card">
        <header className="bi-head">
          <p className="bi-kicker">What gets automated</p>
          <h3>Kill the manual step.</h3>
          <p>
            Wherever your team retypes, re-checks or re-sends the same data, I replace it with a
            workflow that runs on its own, and tells you the moment something looks wrong.
          </p>
        </header>

        <div className="bi-panel">
          <div className="bi-panel-bar">
            <span>Example run</span>
            <span className={`bi-status${finished ? ' is-done' : ''}`} aria-live="polite">
              {finished ? 'Finished in 1.8 s' : 'Running…'}
            </span>
          </div>

          <ol className="bi-steps">
            {STEPS.map((s, i) => {
              const state = finished || i < step ? 'is-done' : i === step ? 'is-active' : 'is-idle';
              return (
                <li key={s.title} className={`bi-step ${state}`}>
                  <span className="bi-step-num" aria-hidden="true">
                    {state === 'is-done' ? <CheckIcon /> : i + 1}
                  </span>
                  <span className="bi-step-copy">
                    <span className="bi-step-title">{s.title}</span>
                    <span className="bi-step-text">{s.text}</span>
                  </span>
                  <span className="bi-step-state">{STATE_TEXT[state]}</span>
                  <span className="bi-step-track" aria-hidden="true" />
                </li>
              );
            })}
          </ol>

          <p className={`bi-result${finished ? ' is-shown' : ''}`}>
            12,480 records processed, 0 manual steps.
          </p>
        </div>
      </article>

      {/* ── RIGHT: what changes for you ── */}
      <article className="bi-card">
        <header className="bi-head">
          <p className="bi-kicker">What changes for you</p>
          <h3>You get hours back.</h3>
          <p>
            Every build starts from the task that eats your week and ends with the number that
            proves it moved: fewer hours lost, fewer mistakes, answers on demand.
          </p>
        </header>

        <div className="bi-panel">
          <ul className="bi-metrics">
          {METRICS.map((m) => {
            const after = Math.round(m.before + (m.after - m.before) * count);
            const afterWidth = 100 - (100 - (m.after / m.before) * 100) * count;
            const drop = Math.round((1 - m.after / m.before) * 100);
            return (
              <li key={m.label} className="bi-metric">
                <div className="bi-metric-head">
                  <span className="bi-metric-label">{m.label}</span>
                  <span className="bi-metric-drop">{drop}% less</span>
                </div>
                <div className="bi-bar-row">
                  <span className="bi-bar-name">Before</span>
                  <span className="bi-bar bi-bar-before" style={{ width: '100%' }} aria-hidden="true" />
                  <span className="bi-bar-value">{withUnit(m.before, m.unit)}</span>
                </div>
                <div className="bi-bar-row">
                  <span className="bi-bar-name">After</span>
                  <span className="bi-bar bi-bar-after" style={{ width: `${afterWidth}%` }} aria-hidden="true" />
                  <span className="bi-bar-value">{withUnit(after, m.unit)}</span>
                </div>
              </li>
            );
          })}
          </ul>
          <p className="bi-note">Typical before and after on workflows I&apos;ve shipped.</p>
        </div>
      </article>
    </div>
  );
}
