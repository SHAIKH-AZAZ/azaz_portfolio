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
    let rafId = null;
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';
    lenisScript.async = true;
    lenisScript.onload = () => {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenis.on('scroll', (e) => {
        const thumb = document.querySelector('.scroll-progress-thumb');
        if (thumb) thumb.style.transform = `scaleY(${e.progress})`;
        setHeaderState();
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };
    // Defer non-critical script
    setTimeout(() => {
      document.head.appendChild(lenisScript);
    }, 100);

    // ── Reveal on scroll ──
    const revealElements = [...document.querySelectorAll('.reveal')];
    const counters = [...document.querySelectorAll('[data-counter]')];

    const animateCounter = (el) => {
      if (el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';
      const target = Number(el.dataset.counter || 0);
      const suffix = el.dataset.suffix || '';
      if (prefersReducedMotion) { el.textContent = `${target}${suffix}`; return; }
      const duration = 1200;
      const start = performance.now();
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 4; // Quicker ease out
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
        (entries) => entries.forEach((e) => { 
          if (e.isIntersecting) { 
            e.target.classList.add('is-visible'); 
            revealObs.unobserve(e.target); 
          } 
        }),
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );
      revealElements.forEach((el) => revealObs.observe(el));

      const counterObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } }),
        { threshold: 0.4 }
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
        const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // Reduced slightly for smoothness
        const rotateX = (0.5 - (e.clientY - rect.top) / rect.height) * 10;
        tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };
      const handleLeave = () => { tiltCard.style.transform = ''; };
      tiltCard.addEventListener('pointermove', handleMove);
      tiltCard.addEventListener('pointerleave', handleLeave);
    }

    // ── Project card hover ──
    const projectCards = [...document.querySelectorAll('.project-card')];
    if (projectCards.length && supportsFinePointer) {
      projectCards.forEach((card) => {
        card.addEventListener('pointermove', (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }, { passive: true });
      });
    }

    // ── Parallax orbs ──
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    if (parallaxItems.length && !prefersReducedMotion) {
      let ticking = false;
      const updateParallax = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const vc = window.innerHeight / 2;
            parallaxItems.forEach((item) => {
              const speed = Number(item.dataset.parallax || 0);
              const rect = item.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) { // Only if visible
                const offset = Math.max(-25, Math.min(25, (rect.top + rect.height / 2 - vc) * speed));
                item.style.marginTop = `${offset}px`;
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', updateParallax, { passive: true });
      window.addEventListener('resize', updateParallax);
    }

    // ── Particle canvas ──
    const canvas = canvasRef.current;
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = 0, height = 0, animId = 0, particles = [], isCanvasVisible = true;

      const createParticles = () => {
        const count = Math.max(16, Math.min(48, Math.floor((width * height) / 32000))); // Lower count
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          radius: 0.8 + Math.random() * 1.8,
        }));
      };

      const resizeCanvas = () => {
        width = window.innerWidth; height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.4); // Lower DPR cap
        canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createParticles();
      };

      const render = () => {
        if (!isCanvasVisible) {
          animId = requestAnimationFrame(render);
          return;
        }
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10 || p.x > width + 10) p.vx *= -1;
          if (p.y < -10 || p.y > height + 10) p.vy *= -1;
          ctx.beginPath(); ctx.fillStyle = 'rgba(255,255,255,0.35)'; // Slightly softer
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
          for (let j = i + 1; j < particles.length; j++) {
            const o = particles[j];
            const dist = Math.hypot(o.x - p.x, o.y - p.y);
            if (dist > 110) continue;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(78,216,255,${(1 - dist / 110) * 0.08})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        });
        animId = requestAnimationFrame(render);
      };

      const canvasObs = new IntersectionObserver((entries) => {
        isCanvasVisible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      canvasObs.observe(canvas);

      resizeCanvas(); render();
      window.addEventListener('resize', resizeCanvas, { passive: true });
      window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animId);
        cancelAnimationFrame(rafId);
      }, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', setHeaderState);
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <canvas className="particle-canvas" aria-hidden="true" ref={canvasRef} />
      <div className="cursor-glow" aria-hidden="true" />
    </>
  );
}
