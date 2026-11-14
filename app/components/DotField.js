'use client';

import { useEffect, useRef } from 'react';

// Fixed dot field behind the page: rings spread every few seconds and from wherever you click.
// Ported from heroDots (newPortfolio frameworks/shared/effects.js), stretched to the viewport.
const SP = 26, R = 1.2, SPEED = 220, RING = 90, AMP = 1.8, EVERY = 2600, MAX = 6, TAU = Math.PI * 2;

export default function DotField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, rings = [], next = performance.now() + 600;
    let animId = 0, timer = 0;
    let dotColor = '', hotRgb = '', base = 0.2;

    // colours are CSS tokens, so they follow the theme
    const readPalette = () => {
      const css = getComputedStyle(document.documentElement);
      dotColor = `rgb(${css.getPropertyValue('--ink-rgb').trim()})`;
      hotRgb = css.getPropertyValue('--accent-ink-rgb').trim();
      base = parseFloat(css.getPropertyValue('--dot-alpha')) || 0.2;
    };

    const draw = (now) => {
      const life = (Math.hypot(W, H) + RING) / SPEED;
      rings = rings.filter((r) => (now - r.born) / 1000 < life);
      const live = rings.map((r) => {
        const age = (now - r.born) / 1000;
        return { x: r.x, y: r.y, rad: age * SPEED, fade: 1 - age / life };
      });
      const cols = Math.ceil(W / SP) + 1, rows = Math.ceil(H / SP) + 1;
      const ox = (W - (cols - 1) * SP) / 2, oy = (H - (rows - 1) * SP) / 2;
      const hot = [];

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = base;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * SP, y = oy + j * SP;
          let e = 0;
          for (let k = 0; k < live.length; k++) {
            const d = Math.abs(Math.hypot(x - live[k].x, y - live[k].y) - live[k].rad);
            if (d >= RING) continue;
            const t = 1 - d / RING, v = t * t * (3 - 2 * t) * live[k].fade; // smoothstep across the ring
            if (v > e) e = v;
          }
          if (e < 0.01) { ctx.moveTo(x + R, y); ctx.arc(x, y, R, 0, TAU); } else hot.push(x, y, e);
        }
      }
      ctx.fill();
      ctx.fillStyle = `rgb(${hotRgb})`;
      for (let h = 0; h < hot.length; h += 3) {
        ctx.globalAlpha = base + (1 - base) * hot[h + 2];
        ctx.beginPath();
        ctx.arc(hot[h], hot[h + 1], R * (1 + AMP * hot[h + 2]), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      animId = 0;
      if (document.hidden) return;
      const now = performance.now();
      if (reduced) { rings = []; draw(now); return; }
      if (now >= next) {
        rings.push({ x: W * (0.15 + Math.random() * 0.7), y: H * (0.15 + Math.random() * 0.7), born: now });
        next = now + EVERY;
      }
      draw(now);
      // between rings nothing moves: sleep until the next one instead of drawing every frame
      if (rings.length) animId = requestAnimationFrame(tick);
      else { clearTimeout(timer); timer = setTimeout(wake, Math.max(16, next - now)); }
    };
    const wake = () => { if (!animId) { clearTimeout(timer); animId = requestAnimationFrame(tick); } };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const onPointerDown = (e) => {
      if (reduced) return;
      rings.push({ x: e.clientX, y: e.clientY, born: performance.now() });
      while (rings.length > MAX) rings.shift();
      wake();
    };

    readPalette();
    const themeObs = new MutationObserver(() => { readPalette(); draw(performance.now()); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', wake);
    resize();
    wake();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      themeObs.disconnect();
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', wake);
    };
  }, []);

  return <canvas className="dot-field" aria-hidden="true" ref={canvasRef} />;
}
