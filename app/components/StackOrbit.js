'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* Orbit hero: tools, live projects and status chips float on two arcs around the
 * stats. Laid out on a fixed 1200x490 stage that is scaled down to fit (never below
 * MIN_SCALE; on narrower screens the arc ends are cropped and chips that would be cut
 * off are left out). Entrance animations are CSS,
 * started by the `is-visible` class; only the count-up and the scale need JS. */
const STAGE_W = 1200;
const STAGE_H = 490;
const CENTER = { x: 600, y: 620 };
const RADIUS = { outer: 492, inner: 404 };
const MIN_SCALE = 0.6;
const COUNT_MS = 1600;

const ITEMS = [
  // outer ring, left to right
  { kind: 'status', ring: 'outer', angle: 132, label: 'Shipped to production' },
  { kind: 'logo', ring: 'outer', angle: 112.6, logo: 'nextjs.svg', alt: 'Next.js' },
  { kind: 'pill', ring: 'outer', angle: 90, label: 'POC Waste Optimizer' },
  { kind: 'pill', ring: 'outer', angle: 67.6, label: 'Excel Cleaner' },
  { kind: 'logo', ring: 'outer', angle: 50.9, logo: 'python.svg', alt: 'Python' },
  { kind: 'pill', ring: 'outer', angle: 35.2, label: 'ShamGym' },
  // inner ring, left to right
  { kind: 'logo', ring: 'inner', angle: 137.2, logo: 'react.svg', alt: 'React' },
  { kind: 'pill', ring: 'inner', angle: 116.6, label: 'CI/CD', logo: 'githubactions.svg' },
  { kind: 'monogram', ring: 'inner', angle: 90, label: 'AS' },
  { kind: 'logo', ring: 'inner', angle: 63.3, logo: 'docker.svg', alt: 'Docker' },
  { kind: 'check', ring: 'inner', angle: 41.8 },
];

const TAGS = [
  { label: 'Live projects', href: '#work', icon: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /> },
  { label: 'Automation', href: '#features', icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /> },
  { label: 'How I deliver', href: '#how-it-works', icon: <path d="M4 6h10M4 12h16M4 18h7M17 3l3 3-3 3" /> },
  { label: 'Start a project', href: '#contact', icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /> },
];

// px strings rounded to 2 decimals: the browser rounds long floats when it parses the
// server HTML, so raw numbers would not match on hydration
function positionOnRing(ring, angle) {
  const rad = (angle * Math.PI) / 180;
  const r = RADIUS[ring];
  return {
    left: `${(CENTER.x + r * Math.cos(rad)).toFixed(2)}px`,
    top: `${(CENTER.y - r * Math.sin(rad)).toFixed(2)}px`,
  };
}

// arc from the stage's bottom-left edge, over the top, to the bottom-right edge
function arcPath(r) {
  const dy = CENTER.y - STAGE_H;
  const dx = Math.sqrt(r * r - dy * dy);
  return `M ${CENTER.x - dx} ${STAGE_H} A ${r} ${r} 0 0 1 ${CENTER.x + dx} ${STAGE_H}`;
}

const Check = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function OrbitItem({ item }) {
  switch (item.kind) {
    case 'logo':
      return (
        <span className="orbit-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logos/${item.logo}`} alt={item.alt} width="30" height="30" />
        </span>
      );
    case 'pill':
      return (
        <span className="orbit-pill">
          {item.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/logos/${item.logo}`} alt="" width="16" height="16" />
          ) : (
            <span className="orbit-live-dot" aria-hidden="true" />
          )}
          {item.label}
        </span>
      );
    case 'status':
      return <span className="orbit-status"><Check />{item.label}</span>;
    case 'check':
      return <span className="orbit-check" aria-label="Checks passing"><Check /></span>;
    default:
      return <span className="orbit-monogram">{item.label}</span>;
  }
}

export default function StackOrbit({ stats, headline }) {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  // scale of the stage, and how far from the centre (in stage px) is still on screen
  const [fit, setFit] = useState({ scale: 1, half: STAGE_W / 2 });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(stats.map(() => 0));

  // fit the fixed stage into the frame
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const measure = () => {
      const width = frame.clientWidth;
      const scale = Math.min(1, Math.max(MIN_SCALE, width / STAGE_W));
      setFit({ scale, half: width / scale / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  // start everything once the section scrolls into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // count the stats up, staggered like their reveal
  useEffect(() => {
    if (!visible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(stats.map(() => 1));
      return undefined;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const next = stats.map((_, i) => {
        const t = Math.min(Math.max((now - start - (900 + i * 120)) / COUNT_MS, 0), 1);
        return 1 - Math.pow(1 - t, 4);
      });
      setProgress(next);
      if (next.some((p) => p < 1)) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, stats]);

  return (
    <div ref={rootRef} className={`orbit${visible ? ' is-visible' : ''}`}>
      <div ref={frameRef} className="orbit-frame" style={{ height: STAGE_H * fit.scale }}>
        <div className="orbit-stage" style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${fit.scale})`, '--orbit-scale': String(fit.scale) }}>
          <svg className="orbit-arcs" width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} fill="none" aria-hidden="true">
            <path className="orbit-arc orbit-arc-outer" d={arcPath(RADIUS.outer)} pathLength="1" />
            <path className="orbit-arc orbit-arc-inner" d={arcPath(RADIUS.inner)} pathLength="1" />
          </svg>

          {ITEMS.map((item, i) => ({ item, i, pos: positionOnRing(item.ring, item.angle) }))
            // chips need ~70 stage px from their centre to the frame edge to show whole
            .filter(({ pos }) => Math.abs(parseFloat(pos.left) - CENTER.x) <= fit.half - 70)
            .map(({ item, i, pos }) => (
              <div
                key={`${item.kind}-${item.angle}`}
                className="orbit-item"
                style={{
                  ...pos,
                  '--i': String(i),
                  '--float-dur': `${(4 + (i % 4) * 0.6).toFixed(1)}s`,
                  '--float-delay': `${((i * 0.4) % 2).toFixed(1)}s`,
                }}
              >
                <div className="orbit-float">
                  <OrbitItem item={item} />
                </div>
              </div>
            ))}

          <dl className="orbit-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="orbit-stat" style={{ '--i': String(i) }}>
                <dt>{s.label}</dt>
                <dd>{Math.round(s.value * progress[i])}{s.suffix}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h2 className="orbit-headline">{headline}</h2>

      <nav className="orbit-tags" aria-label="Jump to">
        {TAGS.map((t, i) => (
          <a key={t.label} href={t.href} className="orbit-tag" style={{ '--i': String(i) }}>
            <span className="orbit-tag-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {t.icon}
              </svg>
            </span>
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
