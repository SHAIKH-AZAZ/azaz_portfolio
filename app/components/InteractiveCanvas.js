'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const cleanupFns = [];

    document.body.classList.add('has-motion');

    const header = document.querySelector('.site-header');
    const setHeaderState = () => {
      header?.classList.toggle('is-scrolled', window.scrollY > 18);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
    cleanupFns.push(() => window.removeEventListener('scroll', setHeaderState));

    const context = gsap.context(() => {
      const revealElements = gsap.utils.toArray('.reveal');
      const counters = gsap.utils.toArray('[data-counter]');
      const titleWords = gsap.utils.toArray('.hero-copy h1 .title-word');

      const setCounterValue = (el, value) => {
        el.textContent = `${Math.round(value)}${el.dataset.suffix || ''}`;
      };

      const finishCounter = (el) => {
        if (el.dataset.counted === 'true') return;
        el.dataset.counted = 'true';
        setCounterValue(el, Number(el.dataset.counter || 0));
      };

      if (prefersReducedMotion) {
        gsap.set(revealElements, { autoAlpha: 1, y: 0 });
        gsap.set(titleWords, { autoAlpha: 1, yPercent: 0, skewY: 0, filter: 'blur(0px)' });
        revealElements.forEach((el) => el.classList.add('is-visible'));
        counters.forEach(finishCounter);
      } else {
        const heroCopy = document.querySelector('.hero-copy');
        const heroStage = document.querySelector('.hero-stage');
        const regularReveal = revealElements.filter((el) => el !== heroCopy && el !== heroStage);

        // Delay initial hide slightly to let React hydrate client components first
        gsap.set(revealElements, { autoAlpha: 0, y: 32 });
        gsap.set(titleWords, {
          autoAlpha: 0,
          filter: 'blur(6px)',
          skewY: 5,
          yPercent: 110,
          transformOrigin: 'left bottom',
        });

        // Small delay before hero reveal to ensure TypewriterText is hydrated
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
        heroTimeline
          .to(heroCopy, {
            autoAlpha: 1,
            duration: 0.35,
            y: 0,
          })
          .to(titleWords, {
            autoAlpha: 1,
            duration: 0.8,
            filter: 'blur(0px)',
            skewY: 0,
            stagger: 0.08,
            yPercent: 0,
            onComplete: () => heroCopy?.classList.add('is-visible'),
          }, '-=0.1')
          .to(heroStage, {
            autoAlpha: 1,
            duration: 0.85,
            scale: 1,
            y: 0,
            onComplete: () => heroStage?.classList.add('is-visible'),
          }, '-=0.5');

        ScrollTrigger.batch(regularReveal, {
          once: true,
          start: 'top 88%',
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.08,
              y: 0,
              onComplete: () => batch.forEach((el) => el.classList.add('is-visible')),
            });
          },
        });

        counters.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              if (el.dataset.counted === 'true') return;
              el.dataset.counted = 'true';
              const counter = { value: 0 };
              gsap.to(counter, {
                value: Number(el.dataset.counter || 0),
                duration: 1.25,
                ease: 'power3.out',
                onUpdate: () => setCounterValue(el, counter.value),
                onComplete: () => setCounterValue(el, Number(el.dataset.counter || 0)),
              });
            },
          });
        });

        gsap.utils.toArray('[data-parallax]').forEach((item) => {
          gsap.to(item, {
            ease: 'none',
            marginTop: Number(item.dataset.parallax || 0) * 160,
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }

      const scrollThumb = document.querySelector('.scroll-progress-thumb');
      if (scrollThumb) {
        const setProgress = gsap.quickTo(scrollThumb, 'scaleY', { duration: 0.12, ease: 'none' });
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => setProgress(self.progress),
        });
      }

      const tiltCard = document.querySelector('[data-tilt]');
      if (tiltCard && !prefersReducedMotion && supportsFinePointer) {
        gsap.set(tiltCard, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
        const rotateX = gsap.quickTo(tiltCard, 'rotationX', { duration: 0.45, ease: 'power3.out' });
        const rotateY = gsap.quickTo(tiltCard, 'rotationY', { duration: 0.45, ease: 'power3.out' });
        const lift = gsap.quickTo(tiltCard, 'y', { duration: 0.45, ease: 'power3.out' });

        const handleMove = (event) => {
          const rect = tiltCard.getBoundingClientRect();
          rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 12);
          rotateX((0.5 - (event.clientY - rect.top) / rect.height) * 10);
          lift(-4);
        };
        const handleLeave = () => {
          gsap.to(tiltCard, {
            duration: 0.55,
            ease: 'elastic.out(1, 0.55)',
            rotationX: 0,
            rotationY: 0,
            y: 0,
          });
        };

        tiltCard.addEventListener('pointermove', handleMove);
        tiltCard.addEventListener('pointerleave', handleLeave);
        cleanupFns.push(() => {
          tiltCard.removeEventListener('pointermove', handleMove);
          tiltCard.removeEventListener('pointerleave', handleLeave);
        });
      }

    });

    // ── Lenis smooth scroll ──
    let lenis = null;
    let rafId = null;
    let lenisScript = null;
    let lenisTimeout = null;

    if (!prefersReducedMotion) {
      lenisScript = document.createElement('script');
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

        lenis.on('scroll', () => {
          ScrollTrigger.update();
          setHeaderState();
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      };

      lenisTimeout = setTimeout(() => {
        document.head.appendChild(lenisScript);
      }, 100);
    }

    // ── Dot field background: rings spread every few seconds and from wherever you click ──
    // Ported from heroDots (newPortfolio frameworks/shared/effects.js), stretched to the viewport.
    const canvas = canvasRef.current;
    let animId = 0;
    let dotTimer = 0;
    let themeObs = null;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      const SP = 26, R = 1.2, SPEED = 220, RING = 90, AMP = 1.8, EVERY = 2600, MAX = 6, TAU = Math.PI * 2;
      let W = 0, H = 0, rings = [], next = performance.now() + 600;
      let dotColor = '', hotRgb = '', base = 0.2;

      // Palette comes from the CSS tokens; re-read whenever the theme toggles
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
        if (prefersReducedMotion) { rings = []; draw(now); return; }
        if (now >= next) {
          rings.push({ x: W * (0.15 + Math.random() * 0.7), y: H * (0.15 + Math.random() * 0.7), born: now });
          next = now + EVERY;
        }
        draw(now);
        // between rings nothing moves: sleep until the next one instead of drawing every frame
        if (rings.length) animId = requestAnimationFrame(tick);
        else { clearTimeout(dotTimer); dotTimer = setTimeout(wake, Math.max(16, next - now)); }
      };
      const wake = () => { if (!animId) { clearTimeout(dotTimer); animId = requestAnimationFrame(tick); } };

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
        if (prefersReducedMotion) return;
        rings.push({ x: e.clientX, y: e.clientY, born: performance.now() });
        while (rings.length > MAX) rings.shift();
        wake();
      };
      const onTheme = () => { readPalette(); draw(performance.now()); };

      readPalette();
      themeObs = new MutationObserver(onTheme);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      window.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
      document.addEventListener('visibilitychange', wake);
      cleanupFns.push(() => {
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', wake);
        clearTimeout(dotTimer);
      });

      resize();
      wake();
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      context.revert();
      clearTimeout(lenisTimeout);
      lenisScript?.remove();
      lenis?.destroy();
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animId);
      themeObs?.disconnect();
      document.body.classList.remove('has-motion');
    };
  }, []);

  return (
    <>
      <canvas className="particle-canvas" aria-hidden="true" ref={canvasRef} />
    </>
  );
}
