const body = document.body;
const header = document.querySelector(".site-header");
const scrollThumb = document.querySelector(".scroll-progress-thumb");

// Initialize Lenis for smooth Apple-like scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', (e) => {
  if (scrollThumb) {
    scrollThumb.style.transform = `scaleY(${e.progress})`;
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
const revealElements = [...document.querySelectorAll(".reveal")];
const counters = [...document.querySelectorAll("[data-counter]")];
const tiltCard = document.querySelector("[data-tilt]");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
const cursorGlow = document.querySelector(".cursor-glow");
const particleCanvas = document.querySelector(".particle-canvas");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReducedMotion = reduceMotionQuery.matches;
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

body.classList.add("has-motion");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const revealAll = () => {
  revealElements.forEach((element) => element.classList.add("is-visible"));
};

const animateCounter = (element) => {
  if (element.dataset.counted === "true") {
    return;
  }

  element.dataset.counted = "true";

  const target = Number(element.dataset.counter || 0);
  const suffix = element.dataset.suffix || "";

  if (prefersReducedMotion) {
    element.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 1400;
  const start = performance.now();

  const updateValue = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const currentValue = Math.round(target * eased);

    element.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(updateValue);
    }
  };

  window.requestAnimationFrame(updateValue);
};

const setupRevealObserver = () => {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealAll();
    counters.forEach(animateCounter);
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
};

const setupCursorGlow = () => {
  if (!cursorGlow || prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  const moveGlow = (event) => {
    cursorGlow.style.transform = `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`;
  };

  window.addEventListener("pointermove", moveGlow, { passive: true });
};

const setupTiltCard = () => {
  if (!tiltCard || prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  const handleMove = (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const rotateY = ((offsetX / rect.width) - 0.5) * 16;
    const rotateX = (0.5 - (offsetY / rect.height)) * 14;

    tiltCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleLeave = () => {
    tiltCard.style.transform = "";
  };

  tiltCard.addEventListener("pointermove", handleMove);
  tiltCard.addEventListener("pointerleave", handleLeave);
};

const setupParallax = () => {
  if (!parallaxItems.length || prefersReducedMotion) {
    return;
  }

  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + (rect.height / 2);
      const offset = Math.max(-32, Math.min(32, (itemCenter - viewportCenter) * speed));

      item.style.marginTop = `${offset}px`;
    });
  };

  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
};

const setupParticleCanvas = () => {
  if (!particleCanvas || prefersReducedMotion) {
    return;
  }

  const context = particleCanvas.getContext("2d");

  if (!context) {
    return;
  }

  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let particles = [];

  const createParticles = () => {
    const particleCount = Math.max(24, Math.min(64, Math.floor((width * height) / 26000)));

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      radius: 1 + (Math.random() * 2.2),
    }));
  };

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    particleCanvas.width = Math.floor(width * dpr);
    particleCanvas.height = Math.floor(height * dpr);
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
  };

  const render = () => {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -12 || particle.x > width + 12) {
        particle.vx *= -1;
      }

      if (particle.y < -12 || particle.y > height + 12) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.fillStyle = "rgba(255, 255, 255, 0.42)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
        const other = particles[otherIndex];
        const deltaX = other.x - particle.x;
        const deltaY = other.y - particle.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 120) {
          continue;
        }

        const alpha = 1 - (distance / 120);
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(78, 216, 255, ${alpha * 0.12})`;
        context.lineWidth = 1;
        context.stroke();
      }
    });

    animationFrame = window.requestAnimationFrame(render);
  };

  resizeCanvas();
  render();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener(
    "beforeunload",
    () => {
      window.cancelAnimationFrame(animationFrame);
    },
    { once: true },
  );
};

setHeaderState();
setupRevealObserver();
setupCursorGlow();
setupTiltCard();
setupParallax();
setupParticleCanvas();

window.addEventListener("scroll", setHeaderState, { passive: true });
