'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Easing ──────────────────────────────────────────────────────── */
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/* ── Timing ──────────────────────────────────────────────────────── */
const PHASE_MS  = 1400; // travel duration per leg
const PAUSE_MS  = 420;  // dwell at each node
const STEP_MS   = PHASE_MS + PAUSE_MS;
const CYCLE_MS  = STEP_MS * 4; // CLIENT→AZAZ→LIVE→AZAZ→CLIENT

/* ── Rotating arc SVG ────────────────────────────────────────────── */
function RotatingArc({ diameter = 68, dashFraction = 0.28, speed = '3s', reverse = false }) {
  const r    = diameter / 2 - 2.5;
  const circ = 2 * Math.PI * r;
  const dash = circ * dashFraction;
  const gap  = circ - dash;
  return (
    <svg
      className={`wf-arc${reverse ? ' wf-arc-reverse' : ''}`}
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      aria-hidden="true"
      style={{ '--wf-arc-dur': speed }}
    >
      <circle
        cx={diameter / 2}
        cy={diameter / 2}
        r={r}
        fill="none"
        stroke="rgba(250,93,25,0.78)"
        strokeWidth="2"
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Static connector (dashed line + arrowhead, NO animated dot) ── */
function StaticConnector() {
  const W = 110, H = 28, cy = H / 2;
  return (
    <div className="wf-connector" aria-hidden="true">
      {/* Horizontal */}
      <svg viewBox={`0 0 ${W} ${H}`} className="wf-connector-svg" fill="none">
        <line x1="4" y1={cy} x2={W - 4} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line
          x1="4" y1={cy} x2={W - 4} y2={cy}
          stroke="rgba(250,93,25,0.25)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          className="wf-dash-anim"
        />
        {/* forward arrow */}
        <polyline
          points={`${W-10},${cy-4} ${W-3},${cy} ${W-10},${cy+4}`}
          stroke="rgba(250,93,25,0.45)" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* return arrow */}
        <polyline
          points={`10,${cy-4} 3,${cy} 10,${cy+4}`}
          stroke="rgba(250,93,25,0.3)" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      {/* Vertical (mobile) */}
      <svg viewBox="0 0 28 72" className="wf-connector-svg-v" fill="none">
        <line x1="14" y1="4" x2="14" y2="68" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line
          x1="14" y1="4" x2="14" y2="68"
          stroke="rgba(250,93,25,0.25)" strokeWidth="1.2"
          strokeDasharray="6 8" strokeLinecap="round"
          className="wf-dash-anim-v"
        />
        <polyline points="9.5,60 14,68 18.5,60" stroke="rgba(250,93,25,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9.5,12 14,4 18.5,12"  stroke="rgba(250,93,25,0.3)"  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Hub (center) node ───────────────────────────────────────────── */
function HubNode({ nodeRef }) {
  return (
    <div ref={nodeRef} className="wf-node-card wf-node-hub" role="img" aria-label="Azaz Shaikh hub node">
      {/* Fixed-size container so arcs don't affect card height.
          Outer arc: 18s — slow ambient orbit.
          Inner arc: 32s reverse — matches Firecrawl's exact cache-or-web overlay speed. */}
      <div className="wf-hub-arcs-wrap" aria-hidden="true">
        <RotatingArc diameter={88} dashFraction={0.18} speed="18s" />
        <RotatingArc diameter={68} dashFraction={0.28} speed="32s" reverse />
        <div className="wf-hub-inner">
          <span className="wf-hub-initials">AS</span>
        </div>
      </div>
      <span className="wf-node-label">AZAZ SHAIKH</span>
      <span className="wf-node-sublabel">Full-Stack Engineer</span>
    </div>
  );
}

/* ── Regular side node ───────────────────────────────────────────── */
function RegularNode({ node, nodeRef, arcSpeed = '4s' }) {
  return (
    <div ref={nodeRef} className="wf-node-card" role="img" aria-label={node.label}>
      <div className="wf-node-icon-wrap">
        <RotatingArc diameter={56} dashFraction={0.3} speed={arcSpeed} />
        <div className="wf-node-icon-inner" aria-hidden="true">
          {node.icon}
        </div>
      </div>
      <span className="wf-node-label">{node.label}</span>
      <span className="wf-node-sublabel">{node.sublabel}</span>
    </div>
  );
}

/* ── Node definitions ────────────────────────────────────────────── */
const NODES = [
  {
    id: 'client',
    label: 'CLIENT',
    sublabel: 'You & your team',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'system',
    label: 'LIVE SYSTEM',
    sublabel: 'Deployed & running',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
      </svg>
    ),
  },
];

/* ── Main component ──────────────────────────────────────────────── */
export default function WorkflowDiagram() {
  const [reduced, setReduced]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const [dot, setDot]           = useState(null); // { x, y, paused }

  const containerRef = useRef(null);
  const rowRef       = useRef(null);
  const leftRef      = useRef(null);
  const hubRef       = useRef(null);
  const rightRef     = useRef(null);
  const rafRef       = useRef(null);
  const t0Ref        = useRef(null);

  /* Visibility trigger */
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = containerRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Sequential pipeline dot animation
   *
   * Phase sequence (repeating):
   *   0: CLIENT  →  AZAZ        (left connector, forward)
   *   1: AZAZ    →  LIVE SYSTEM (right connector, forward)
   *   2: LIVE SYSTEM → AZAZ    (right connector, return)
   *   3: AZAZ    →  CLIENT      (left connector, return)
   */
  useEffect(() => {
    if (reduced || !visible) return undefined;

    const tick = (now) => {
      if (!t0Ref.current) t0Ref.current = now;
      const elapsed   = (now - t0Ref.current) % CYCLE_MS;
      const phaseIdx  = Math.floor(elapsed / STEP_MS);
      const inPhase   = elapsed % STEP_MS;
      const progress  = easeInOut(Math.min(inPhase / PHASE_MS, 1));
      const paused    = inPhase >= PHASE_MS; // dwelling at node

      const row   = rowRef.current;
      const left  = leftRef.current;
      const hub   = hubRef.current;
      const right = rightRef.current;

      if (row && left && hub && right) {
        const rBox = row.getBoundingClientRect();
        const lBox = left.getBoundingClientRect();
        const hBox = hub.getBoundingClientRect();
        const xBox = right.getBoundingClientRect();

        const lx = lBox.left + lBox.width  / 2 - rBox.left;
        const hx = hBox.left + hBox.width  / 2 - rBox.left;
        const rx = xBox.left + xBox.width  / 2 - rBox.left;
        const cy = rBox.height / 2;

        // [from, to] per phase
        const legs = [
          [lx, hx], // 0: CLIENT → AZAZ
          [hx, rx], // 1: AZAZ → LIVE SYSTEM
          [rx, hx], // 2: LIVE SYSTEM → AZAZ
          [hx, lx], // 3: AZAZ → CLIENT
        ];
        const [from, to] = legs[phaseIdx];
        const x = from + (to - from) * progress;

        setDot({ x, y: cy, paused });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      t0Ref.current = null;
    };
  }, [reduced, visible]);

  return (
    <div
      ref={containerRef}
      className={`wf-shell ${visible ? 'wf-is-visible' : ''}`}
      aria-label="Workflow pipeline: Client → Engineer → Live System"
    >
      <div className="wf-grid-bg" aria-hidden="true" />

      {/* Header */}
      <div className="wf-header">
        <p className="wf-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          Live delivery pipeline
        </p>
        <h3 className="wf-headline">
          From brief to <span className="wf-headline-accent">live product</span>, end to end.
        </h3>
        <p className="wf-subtext">
          Scope it, architect it, ship it. A structured pipeline that takes your idea from
          a whiteboard to a running production system — reliably and on schedule.
        </p>
      </div>

      {/* Node row with sequentially animated dot overlay */}
      <div ref={rowRef} className="wf-nodes-row">

        {/* ── Single dot that travels CLIENT→AZAZ→LIVE→AZAZ→CLIENT ── */}
        {dot && !reduced && (
          <svg
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
              zIndex: 10,
            }}
          >
            {/* Outer soft halo */}
            <circle cx={dot.x} cy={dot.y} r={dot.paused ? 18 : 11} fill="rgba(250,93,25,0.1)" className="wf-dot-halo" />
            {/* Mid glow */}
            <circle cx={dot.x} cy={dot.y} r={dot.paused ? 10 : 6.5} fill="rgba(250,93,25,0.25)" />
            {/* Core */}
            <circle cx={dot.x} cy={dot.y} r="4.2" fill="#fa5d19" className="wf-dot-core" />
          </svg>
        )}

        {/* Side node arcs: ~2s matches Firecrawl's fast user-node arc (~1s) scaled for dark theme */}
        <RegularNode node={NODES[0]} nodeRef={leftRef} arcSpeed="2.2s" />
        <StaticConnector />
        <HubNode nodeRef={hubRef} />
        <StaticConnector />
        <RegularNode node={NODES[1]} nodeRef={rightRef} arcSpeed="2.8s" />
      </div>

      <div className="wf-bottom-glow" aria-hidden="true" />
    </div>
  );
}
