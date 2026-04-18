'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const cleanupFns = [];
    const animationFrameIds = new Set();

    const requestTrackedFrame = (callback) => {
      const id = window.requestAnimationFrame((time) => {
        animationFrameIds.delete(id);
        callback(time);
      });
      animationFrameIds.add(id);
      return id;
    };

    document.body.classList.add('has-motion');

    const header = document.querySelector('.site-header');
    const thumb = document.querySelector('.scroll-progress-thumb');

    const setHeaderState = () => {
      header?.classList.toggle('is-scrolled', window.scrollY > 18);
    };

    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      if (thumb) thumb.style.transform = `scaleY(${progress})`;
      setHeaderState();
    };

    let scrollRafId = 0;
    const scheduleScrollUpdate = () => {
      if (scrollRafId) return;
      scrollRafId = requestTrackedFrame(() => {
        scrollRafId = 0;
        updateScrollProgress();
      });
    };

    setHeaderState();
    updateScrollProgress();
    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
    window.addEventListener('resize', scheduleScrollUpdate);
    cleanupFns.push(() => window.removeEventListener('scroll', scheduleScrollUpdate));
    cleanupFns.push(() => window.removeEventListener('resize', scheduleScrollUpdate));

    const revealElements = [...document.querySelectorAll('.reveal')];
    const counters = [...document.querySelectorAll('[data-counter]')];
    let revealObs = null;
    let counterObs = null;

    const animateCounter = (el) => {
      if (el.dataset.counted === 'true') return;

      el.dataset.counted = 'true';
      const target = Number(el.dataset.counter || 0);
      const suffix = el.dataset.suffix || '';

      if (prefersReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1200;
      const start = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 4;
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestTrackedFrame(tick);
      };

      requestTrackedFrame(tick);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      counters.forEach(animateCounter);
    } else {
      revealObs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        }),
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );
      revealElements.forEach((el) => revealObs.observe(el));

      counterObs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        }),
        { threshold: 0.4 }
      );
      counters.forEach((el) => counterObs.observe(el));
    }

    cleanupFns.push(() => revealObs?.disconnect());
    cleanupFns.push(() => counterObs?.disconnect());

    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && !prefersReducedMotion && supportsFinePointer) {
      const moveGlow = (event) => {
        cursorGlow.style.transform = `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`;
      };

      window.addEventListener('pointermove', moveGlow, { passive: true });
      cleanupFns.push(() => window.removeEventListener('pointermove', moveGlow));
    }

    const tiltCard = document.querySelector('[data-tilt]');
    if (tiltCard && !prefersReducedMotion && supportsFinePointer) {
      const handleMove = (event) => {
        const rect = tiltCard.getBoundingClientRect();
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        const rotateX = (0.5 - (event.clientY - rect.top) / rect.height) * 10;
        tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };
      const handleLeave = () => {
        tiltCard.style.transform = '';
      };

      tiltCard.addEventListener('pointermove', handleMove);
      tiltCard.addEventListener('pointerleave', handleLeave);
      cleanupFns.push(() => tiltCard.removeEventListener('pointermove', handleMove));
      cleanupFns.push(() => tiltCard.removeEventListener('pointerleave', handleLeave));
    }

    const projectCards = [...document.querySelectorAll('.project-card')];
    if (projectCards.length && supportsFinePointer) {
      projectCards.forEach((card) => {
        const handlePointerMove = (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
        };

        card.addEventListener('pointermove', handlePointerMove, { passive: true });
        cleanupFns.push(() => card.removeEventListener('pointermove', handlePointerMove));
      });
    }

    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    if (parallaxItems.length && !prefersReducedMotion) {
      let ticking = false;

      const updateParallax = () => {
        if (ticking) return;

        ticking = true;
        requestTrackedFrame(() => {
          const viewportCenter = window.innerHeight / 2;
          parallaxItems.forEach((item) => {
            const speed = Number(item.dataset.parallax || 0);
            const rect = item.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const offset = Math.max(
                -25,
                Math.min(25, (rect.top + rect.height / 2 - viewportCenter) * speed)
              );
              item.style.marginTop = `${offset}px`;
            }
          });
          ticking = false;
        });
      };

      updateParallax();
      window.addEventListener('scroll', updateParallax, { passive: true });
      window.addEventListener('resize', updateParallax);
      cleanupFns.push(() => window.removeEventListener('scroll', updateParallax));
      cleanupFns.push(() => window.removeEventListener('resize', updateParallax));
    }

    const canvas = canvasRef.current;
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = 0;
      let height = 0;
      let particles = [];
      let isCanvasVisible = true;
      let particleRafId = 0;
      let canvasObserver = null;

      const createParticles = () => {
        const count = Math.max(16, Math.min(48, Math.floor((width * height) / 32000)));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: 0.8 + Math.random() * 1.8,
        }));
      };

      const resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.4);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        createParticles();
      };

      const render = () => {
        if (!isCanvasVisible) {
          particleRafId = requestTrackedFrame(render);
          return;
        }

        ctx.clearRect(0, 0, width, height);
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -10 || particle.x > width + 10) particle.vx *= -1;
          if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1;

          ctx.beginPath();
          ctx.fillStyle = 'rgba(99,102,241,0.25)';
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();

          for (let j = index + 1; j < particles.length; j += 1) {
            const other = particles[j];
            const distance = Math.hypot(other.x - particle.x, other.y - particle.y);

            if (distance > 110) continue;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - distance / 110) * 0.07})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });

        particleRafId = requestTrackedFrame(render);
      };

      if ('IntersectionObserver' in window) {
        canvasObserver = new IntersectionObserver(
          (entries) => {
            isCanvasVisible = entries[0]?.isIntersecting ?? true;
          },
          { threshold: 0.01 }
        );
        canvasObserver.observe(canvas);
      }

      resizeCanvas();
      render();
      window.addEventListener('resize', resizeCanvas, { passive: true });
      cleanupFns.push(() => window.removeEventListener('resize', resizeCanvas));
      cleanupFns.push(() => canvasObserver?.disconnect());
      cleanupFns.push(() => {
        if (particleRafId) window.cancelAnimationFrame(particleRafId);
      });
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      animationFrameIds.forEach((id) => window.cancelAnimationFrame(id));
      animationFrameIds.clear();
    };
  }, []);

  return (
    <>
      <canvas className="particle-canvas" aria-hidden="true" ref={canvasRef} />
      <div className="cursor-glow" aria-hidden="true" />
    </>
  );
}
