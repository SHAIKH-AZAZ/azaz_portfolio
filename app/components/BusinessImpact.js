'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Timing ──────────────────────────────────────────────────────────
 * The workflow card runs a looping 4-stage job. Stage fills are driven
 * by CSS width transitions (cheap, GPU-friendly); JS only flips the
 * stage index, so there is no per-frame React work.
 */
const STAGE_FILL_MS = 900;
const STAGE_GAP_MS = 220;
const HOLD_MS = 2200;
const COUNT_MS = 1200;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ── Pipeline stages: the shape of almost every manual back-office job ── */
const STAGES = [
  { icon: 'collect', label: 'Pull the data in', meta: 'sheets · email · forms · APIs' },
  { icon: 'check', label: 'Clean & validate', meta: 'dedupe · fix formats · flag gaps' },
  { icon: 'rules', label: 'Apply your business rules', meta: 'pricing · routing · approvals' },
  { icon: 'send', label: 'Deliver the result', meta: 'dashboard · report · alert' },
];

/* ── Outcome metrics (before → after) ─────────────────────────────── */
const METRICS = [
  { label: 'Time on manual data work', from: 40, to: 3, unit: 'h', scope: 'per week', drop: '−92%' },
  { label: 'Errors slipping through', from: 9, to: 1, unit: '%', scope: 'per batch', drop: '−89%' },
  { label: 'Wait time for a report', from: 45, to: 2, unit: 'min', scope: 'per request', drop: '−96%' },
];

/* ── Icons ───────────────────────────────────────────────────────────── */
function StageIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 14,
    height: 14,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };
  if (name === 'collect') {
    return (
      <svg {...common}>
        <path d="M12 3v10m0 0 4-4m-4 4-4-4" />
        <path d="M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
      </svg>
    );
  }
  if (name === 'check') {
    return (
      <svg {...common}>
        <path d="M21 11.5a9 9 0 1 1-5.2-8.2" />
        <path d="M8.5 11.5 11 14l9-9" />
      </svg>
    );
  }
  if (name === 'rules') {
    return (
      <svg {...common}>
        <path d="M4 21v-6M4 11V3M12 21v-9M12 8V3M20 21v-4M20 13V3" />
        <path d="M2 15h4M10 8h4M18 17h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M21 3 3 10l7 3 3 7 8-17z" />
      <path d="M10 13l4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function BusinessImpact() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [count, setCount] = useState(0);

  const shellRef = useRef(null);
  const rafRef = useRef(0);
  const countedRef = useRef(false);

  /* Detect reduced motion + observe visibility (two-way, so the loop
   * pauses while the section is offscreen instead of burning timers). */
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const el = shellRef.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Looping stage machine. stage === STAGES.length means "all done", which
   * holds for HOLD_MS before restarting. */
  useEffect(() => {
    if (reduced) {
      setStage(STAGES.length);
      return undefined;
    }
    if (!visible) return undefined;

    let cancelled = false;
    let timer;

    const run = (current) => {
      const delay = current >= STAGES.length ? HOLD_MS : STAGE_FILL_MS + STAGE_GAP_MS;
      timer = setTimeout(() => {
        if (cancelled) return;
        const next = current >= STAGES.length ? 0 : current + 1;
        setStage(next);
        run(next);
      }, delay);
    };

    setStage(0);
    run(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced, visible]);

  /* One-shot metric reveal: bars shrink and numbers count down once. */
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      setCount(1);
      countedRef.current = true;
      return undefined;
    }
    if (!visible || countedRef.current) return undefined;

    countedRef.current = true;
    setRevealed(true);

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

  const complete = stage >= STAGES.length;

  return (
    <div
      ref={shellRef}
      className={`bi-grid${visible ? ' bi-is-visible' : ''}`}
      /* single source of truth: CSS keyframe duration follows the JS timer */
      style={{ '--bi-fill': `${STAGE_FILL_MS}ms` }}
    >

      {/* ── LEFT: the workflow that replaces the manual step ── */}
      <article className="bi-card">
        <header className="bi-card-bar">
          <span className="bi-mono-label">
            <span className="bi-mono-fn">workflow</span>.run()
          </span>
          <span className={`bi-status${complete ? ' is-done' : ''}`}>
            <span className="bi-status-dot" aria-hidden="true" />
            {complete ? 'complete' : 'running'}
          </span>
        </header>

        <div className="bi-card-body">
          <ol className="bi-stages" aria-label="Automated workflow stages">
            {STAGES.map((s, i) => {
              const state = i < stage ? 'is-done' : i === stage ? 'is-active' : 'is-idle';
              return (
                <li key={s.label} className={`bi-stage ${state}`}>
                  <span className="bi-stage-dot" aria-hidden="true">
                    {i < stage || complete ? <CheckIcon /> : <StageIcon name={s.icon} />}
                  </span>
                  <div className="bi-stage-main">
                    <div className="bi-stage-head">
                      <span className="bi-stage-label">{s.label}</span>
                      <span className="bi-stage-meta">{s.meta}</span>
                    </div>
                    <span className="bi-stage-track" aria-hidden="true">
                      <span className="bi-stage-fill" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={`bi-result${complete ? ' is-shown' : ''}`}>
            <span className="bi-result-chip">
              <span className="bi-result-key">records</span>
              <span className="bi-result-val">12,480</span>
            </span>
            <span className="bi-result-chip">
              <span className="bi-result-key">runtime</span>
              <span className="bi-result-val">1.8s</span>
            </span>
            <span className="bi-result-chip bi-result-chip-accent">
              <span className="bi-result-key">manual steps</span>
              <span className="bi-result-val">0</span>
            </span>
          </div>
        </div>

        <footer className="bi-card-footer">
          <p className="bi-card-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
            </svg>
            Business Automation
          </p>
          <h3 className="bi-card-title">Kill the manual step.</h3>
          <p className="bi-card-desc">
            Wherever your team retypes, re-checks or re-sends the same data, I replace it
            with a workflow that runs on its own — and tells you the moment something
            looks wrong.
          </p>
        </footer>
      </article>

      {/* ── RIGHT: measured outcomes ── */}
      <article className="bi-card">
        <header className="bi-card-bar">
          <span className="bi-mono-label">
            <span className="bi-mono-fn">impact</span>.report
          </span>
          <span className="bi-legend">
            <span className="bi-legend-before" aria-hidden="true" />before
            <span className="bi-legend-after" aria-hidden="true" />after
          </span>
        </header>

        <div className="bi-card-body">
          <ul className="bi-metrics">
            {METRICS.map((m, i) => {
              const value = Math.round(m.from + (m.to - m.from) * count);
              const width = revealed ? (m.to / m.from) * 100 : 100;
              return (
                <li
                  key={m.label}
                  className="bi-metric"
                  aria-label={`${m.label}: ${m.from}${m.unit} ${m.scope} reduced to ${m.to}${m.unit}`}
                >
                  <div className="bi-metric-head">
                    <span className="bi-metric-label">{m.label}</span>
                    <span className="bi-metric-drop">{m.drop}</span>
                  </div>
                  <div className="bi-metric-row">
                    <span className="bi-metric-track" aria-hidden="true">
                      <span className="bi-metric-ghost" />
                      <span
                        className="bi-metric-fill"
                        style={{ width: `${width}%`, transitionDelay: `${i * 140}ms` }}
                      />
                    </span>
                    <span className="bi-metric-value" aria-hidden="true">
                      {value}
                      <span className="bi-metric-unit">{m.unit}</span>
                    </span>
                  </div>
                  <p className="bi-metric-scope">
                    was {m.from}{m.unit} {m.scope}
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="bi-metrics-note">
            Typical shape of the before/after on the workflows I ship.
          </p>
        </div>

        <footer className="bi-card-footer">
          <p className="bi-card-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-3-3-4 4" />
            </svg>
            Measured Outcomes
          </p>
          <h3 className="bi-card-title">You get hours back.</h3>
          <p className="bi-card-desc">
            Every build starts from the task that eats your week and ends with the number
            that proves it moved — fewer hours lost, fewer mistakes, answers on demand.
          </p>
        </footer>
      </article>
    </div>
  );
}
