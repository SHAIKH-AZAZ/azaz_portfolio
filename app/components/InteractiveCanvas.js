'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const tiltRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    // Add motion class after hydration (client-only)
    document.body.classList.add('has-motion');
    const header = document.querySelector('.site-header');
    headerRef.current = header;
    const setHeaderState = () => {
      header?.classList.toggle('is-scrolled', window.scrollY > 18);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    // ── Lenis smooth scroll ──
    let lenis = null;
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';
    lenisScript.onload = () => {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenis.on('scroll', (e) => {
        const thumb = document.querySelector('.scroll-progress-thumb');
        if (thumb) thumb.style.transform = `scaleY(${e.progress})`;
        setHeaderState();
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    document.head.appendChild(lenisScript);

    // ── Reveal on scroll ──
    document.body.classList.add('has-motion');
    const revealElements = [...document.querySelectorAll('.reveal')];
    const counters = [...document.querySelectorAll('[data-counter]')];

    const animateCounter = (el) => {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';
      const target = Number(el.dataset.counter || 0);
      const suffix = el.dataset.suffix || '';
      if (prefersReducedMotion) { el.textContent = `${target}${suffix}`; return; }
      const duration = 1400;
      const start = performance.now();
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      counters.forEach(animateCounter);
    } else {
      const revealObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } }),
        { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
      );
      revealElements.forEach((el) => revealObs.observe(el));

      const counterObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } }),
        { threshold: 0.6 }
      );
      counters.forEach((el) => counterObs.observe(el));
    }

    // ── Cursor glow ──
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && !prefersReducedMotion && supportsFinePointer) {
      const moveGlow = (e) => {
        cursorGlow.style.transform = `translate3d(${e.clientX - 160}px, ${e.clientY - 160}px, 0)`;
      };
      window.addEventListener('pointermove', moveGlow, { passive: true });
    }

    // ── Tilt card ──
    const tiltCard = document.querySelector('[data-tilt]');
    if (tiltCard && !prefersReducedMotion && supportsFinePointer) {
      const handleMove = (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const rotateX = (0.5 - (e.clientY - rect.top) / rect.height) * 14;
        tiltCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      };
      const handleLeave = () => { tiltCard.style.transform = ''; };
      tiltCard.addEventListener('pointermove', handleMove);
      tiltCard.addEventListener('pointerleave', handleLeave);
    }

    // ── Parallax orbs ──
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    if (parallaxItems.length && !prefersReducedMotion) {
      const updateParallax = () => {
        const vc = window.innerHeight / 2;
        parallaxItems.forEach((item) => {
          const speed = Number(item.dataset.parallax || 0);
          const rect = item.getBoundingClientRect();
          const offset = Math.max(-32, Math.min(32, (rect.top + rect.height / 2 - vc) * speed));
          item.style.marginTop = `${offset}px`;
        });
      };
      updateParallax();
      window.addEventListener('scroll', updateParallax, { passive: true });
      window.addEventListener('resize', updateParallax);
    }

    // ── Particle canvas ──
    const canvas = canvasRef.current;
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = 0, height = 0, animId = 0, particles = [];

      const createParticles = () => {
        const count = Math.max(24, Math.min(64, Math.floor((width * height) / 26000)));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
          radius: 1 + Math.random() * 2.2,
        }));
      };

      const resizeCanvas = () => {
        width = window.innerWidth; height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
        canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createParticles();
      };

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -12 || p.x > width + 12) p.vx *= -1;
          if (p.y < -12 || p.y > height + 12) p.vy *= -1;
          ctx.beginPath(); ctx.fillStyle = 'rgba(255,255,255,0.42)';
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
          for (let j = i + 1; j < particles.length; j++) {
            const o = particles[j];
            const dist = Math.hypot(o.x - p.x, o.y - p.y);
            if (dist > 120) continue;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(78,216,255,${(1 - dist / 120) * 0.12})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        });
        animId = requestAnimationFrame(render);
      };

      resizeCanvas(); render();
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('beforeunload', () => cancelAnimationFrame(animId), { once: true });
    }

    return () => {
      window.removeEventListener('scroll', setHeaderState);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <canvas className="particle-canvas" aria-hidden="true" ref={canvasRef} />
      <div className="cursor-glow" aria-hidden="true" />
    </>
  );
}
