'use client';

import { useCallback, useEffect, useRef } from 'react';

function createPixel(ctx, canvas, x, y, color, baseSpeed, delay) {
  const rand = (min, max) => Math.random() * (max - min) + min;

  const pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.42,
    minSize: 0.45,
    maxSizeInt: 2.2,
    maxSize: rand(0.55, 2.2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
  };

  pixel.draw = () => {
    const offset = pixel.maxSizeInt * 0.5 - pixel.size * 0.5;
    ctx.fillStyle = pixel.color;
    ctx.fillRect(pixel.x + offset, pixel.y + offset, pixel.size, pixel.size);
  };

  pixel.appear = () => {
    pixel.isIdle = false;
    if (pixel.counter <= pixel.delay) {
      pixel.counter += pixel.counterStep;
      return;
    }

    if (pixel.size >= pixel.maxSize) pixel.isShimmer = true;
    if (pixel.isShimmer) pixel.shimmer();
    else pixel.size += pixel.sizeStep;
    pixel.draw();
  };

  pixel.disappear = () => {
    pixel.isShimmer = false;
    pixel.counter = 0;
    if (pixel.size <= 0) {
      pixel.isIdle = true;
      return;
    }

    pixel.size -= 0.12;
    pixel.draw();
  };

  pixel.shimmer = () => {
    if (pixel.size >= pixel.maxSize) pixel.isReverse = true;
    else if (pixel.size <= pixel.minSize) pixel.isReverse = false;

    pixel.size += pixel.isReverse ? -pixel.speed : pixel.speed;
  };

  return pixel;
}

export default function ProjectCardPixelCanvas({ gap = 7, speed = 32 }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(0);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const getCard = useCallback(() => wrapRef.current?.closest('.project-card'), []);

  const getPalette = useCallback(() => {
    const card = getCard();
    const styles = card ? window.getComputedStyle(card) : null;
    const accentRgb = styles?.getPropertyValue('--project-accent-rgb').trim() || '250, 93, 25';

    return [
      `rgba(${accentRgb}, 0.9)`,
      `rgba(${accentRgb}, 0.56)`,
      `rgba(255, 255, 255, 0.26)`,
    ];
  }, [getCard]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    const colors = getPalette();

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [gap, getPalette, speed]);

  const animate = useCallback((mode) => {
    window.cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = window.requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (mode === 'disappear' && pixels.every((pixel) => pixel.isIdle)) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = window.requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lastFrameRef.current = performance.now();
    init();

    const card = getCard();
    const resizeObserver = new ResizeObserver(init);
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    const handleEnter = () => animate('appear');
    const handleLeave = () => animate('disappear');

    card?.addEventListener('mouseenter', handleEnter);
    card?.addEventListener('mouseleave', handleLeave);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationRef.current);
      card?.removeEventListener('mouseenter', handleEnter);
      card?.removeEventListener('mouseleave', handleLeave);
    };
  }, [animate, getCard, init]);

  return (
    <div ref={wrapRef} className="project-pixel-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
