'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const thumbRef = useRef(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      thumb.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div className="scroll-progress-track" />
      <div ref={thumbRef} className="scroll-progress-thumb" />
    </div>
  );
}
