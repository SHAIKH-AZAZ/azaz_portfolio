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

        gsap.set(revealElements, { autoAlpha: 0, y: 32 });
        gsap.set(titleWords, {
          autoAlpha: 0,
          filter: 'blur(6px)',
          skewY: 5,
          yPercent: 110,
          transformOrigin: 'left bottom',
        });

        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
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

      const cursorGlow = document.querySelector('.cursor-glow');
      if (cursorGlow && !prefersReducedMotion && supportsFinePointer) {
        gsap.set(cursorGlow, { x: -160, y: -160 });
        const moveX = gsap.quickTo(cursorGlow, 'x', { duration: 0.45, ease: 'power3.out' });
        const moveY = gsap.quickTo(cursorGlow, 'y', { duration: 0.45, ease: 'power3.out' });
        const moveGlow = (event) => {
          moveX(event.clientX - 160);
          moveY(event.clientY - 160);
        };
        window.addEventListener('pointermove', moveGlow, { passive: true });
        cleanupFns.push(() => window.removeEventListener('pointermove', moveGlow));
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

      gsap.utils.toArray('.project-card').forEach((card) => {
        if (!supportsFinePointer) return;
        const handleMove = (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
        };
        card.addEventListener('pointermove', handleMove, { passive: true });
        cleanupFns.push(() => card.removeEventListener('pointermove', handleMove));
      });
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

    // ── Glowing grid canvas ──
    const canvas = canvasRef.current;
    let animId = 0;
    let canvasObs = null;
    let resizeCanvas = null;
    let beforeUnload = null;

    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = 0, height = 0, isCanvasVisible = true;
      let targetMouseX = -1000;
      let targetMouseY = -1000;
      let mouseX = -1000;
      let mouseY = -1000;
      let pulseAlpha = 0;

      const onPointerMove = (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
      };

      const onPointerLeave = () => {
        targetMouseX = -1000;
        targetMouseY = -1000;
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave, { passive: true });
      cleanupFns.push(() => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
      });

      resizeCanvas = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const render = () => {
        if (!isCanvasVisible) {
          animId = requestAnimationFrame(render);
          return;
        }

        ctx.clearRect(0, 0, width, height);

        // Smoothly interpolate mouse coordinates for elegant inertia
        if (targetMouseX > -1000) {
          if (mouseX === -1000) {
            mouseX = targetMouseX;
            mouseY = targetMouseY;
          } else {
            mouseX += (targetMouseX - mouseX) * 0.08;
            mouseY += (targetMouseY - mouseY) * 0.08;
          }
        } else {
          if (mouseX > -1000) {
            mouseX += (-1000 - mouseX) * 0.08;
            mouseY += (-1000 - mouseY) * 0.08;
            if (mouseX < -950) {
              mouseX = -1000;
              mouseY = -1000;
            }
          }
        }

        pulseAlpha += 0.012;
        const gridSpacing = 72;
        const plusSize = 4;

        // 1. Draw static background grid with subtle breathing effect
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.012 + Math.sin(pulseAlpha) * 0.003})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        // 2. Draw static plus intersection markers
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 + Math.sin(pulseAlpha) * 0.01})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < width; x += gridSpacing) {
          for (let y = 0; y < height; y += gridSpacing) {
            ctx.moveTo(x - plusSize, y);
            ctx.lineTo(x + plusSize, y);
            ctx.moveTo(x, y - plusSize);
            ctx.lineTo(x, y + plusSize);
          }
        }
        ctx.stroke();

        // 3. Render dynamic, glowing coordinate grid centered on mouse pointer position
        if (mouseX > -1000) {
          const glowRadius = 260;
          const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowRadius);
          // Firecrawl colors: Neon Heat Orange at center, Amethyst Purple transition, fading out
          grad.addColorStop(0, 'rgba(250, 93, 25, 0.32)');
          grad.addColorStop(0.35, 'rgba(160, 122, 255, 0.18)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.25;
          ctx.beginPath();

          // Optimize performance by only stroking lines in bounding box around the cursor
          const startX = Math.floor((mouseX - glowRadius) / gridSpacing) * gridSpacing;
          const endX = Math.ceil((mouseX + glowRadius) / gridSpacing) * gridSpacing;
          const startY = Math.floor((mouseY - glowRadius) / gridSpacing) * gridSpacing;
          const endY = Math.ceil((mouseY + glowRadius) / gridSpacing) * gridSpacing;

          for (let x = startX; x <= endX; x += gridSpacing) {
            if (x >= 0 && x <= width) {
              ctx.moveTo(x, Math.max(0, mouseY - glowRadius));
              ctx.lineTo(x, Math.min(height, mouseY + glowRadius));
            }
          }
          for (let y = startY; y <= endY; y += gridSpacing) {
            if (y >= 0 && y <= height) {
              ctx.moveTo(Math.max(0, mouseX - glowRadius), y);
              ctx.lineTo(Math.min(width, mouseX + glowRadius), y);
            }
          }
          ctx.stroke();

          // Stroke glowing plus intersection markers near the mouse
          ctx.beginPath();
          for (let x = startX; x <= endX; x += gridSpacing) {
            for (let y = startY; y <= endY; y += gridSpacing) {
              if (x >= 0 && x <= width && y >= 0 && y <= height) {
                const dx = x - mouseX;
                const dy = y - mouseY;
                const dist = Math.hypot(dx, dy);
                if (dist < glowRadius) {
                  ctx.moveTo(x - plusSize - 1, y);
                  ctx.lineTo(x + plusSize + 1, y);
                  ctx.moveTo(x, y - plusSize - 1);
                  ctx.lineTo(x, y + plusSize + 1);
                }
              }
            }
          }
          ctx.stroke();
        }

        animId = requestAnimationFrame(render);
      };

      canvasObs = new IntersectionObserver((entries) => {
        isCanvasVisible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      canvasObs.observe(canvas);

      resizeCanvas();
      render();
      window.addEventListener('resize', resizeCanvas, { passive: true });
      beforeUnload = () => {
        cancelAnimationFrame(animId);
        cancelAnimationFrame(rafId);
      };
      window.addEventListener('beforeunload', beforeUnload, { once: true });
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      context.revert();
      clearTimeout(lenisTimeout);
      lenisScript?.remove();
      lenis?.destroy();
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animId);
      canvasObs?.disconnect();
      if (resizeCanvas) window.removeEventListener('resize', resizeCanvas);
      if (beforeUnload) window.removeEventListener('beforeunload', beforeUnload);
      document.body.classList.remove('has-motion');
    };
  }, []);

  return (
    <>
      <canvas className="particle-canvas" aria-hidden="true" ref={canvasRef} />
      <div className="cursor-glow" aria-hidden="true" />
    </>
  );
}
