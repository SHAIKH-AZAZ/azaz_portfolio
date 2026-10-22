'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const ITEMS = [
  { title: 'Maxgen Web Technologies', text: 'QA Manual and Automations Engineer Intern. Manual test cases and automated scripts for reliable releases.' },
  { title: 'Buniyadbyte', text: 'Full Stack IT Engineer. Shipping business automation and logistics web apps.' },
  { title: 'POC Waste Optimizer', text: 'Bar-cutting algorithms that minimize raw material waste, with a full project interface.' },
  { title: 'Excel Cleaner Tool', text: 'Strips hidden macros and messy formatting from XLSX files into clean, structured data.' },
  { title: 'FastShipment', text: 'Logistics platform with checkout, real-time shipment tracking and partner tools.' },
  { title: 'LangChain RAG System', text: 'AI assistant grounded in a custom knowledge base.' },
  { title: 'LangGraph AI Agent', text: 'Stateful multi-step agent with tool use, branching and memory.' },
];

// Chronological items alternate above/below the desktop rail, left to right.
// Windows are fractions of the horizontal track's scroll progress.
const REVEAL_WINDOWS = [[0.06, 0.26], [0.16, 0.36], [0.26, 0.46], [0.35, 0.55], [0.45, 0.65], [0.55, 0.75], [0.65, 0.85]];

function Item({ item, index }) {
  return (
    <li className="tl-item" style={{ '--tl-index': index }}>
      <div className="tl-marker" aria-hidden="true">
        <span className="tl-dot" />
        <span className="tl-line" />
      </div>
      <div className="tl-copy">
        <h3 className="tl-title">{item.title}</h3>
        <p className="tl-text">{item.text}</p>
      </div>
    </li>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;
    const mm = gsap.matchMedia(section);

    // The server-rendered layout stays vertical until desktop animation is ready.
    // matchMedia reverts the enhancement on width or motion preference changes.
    mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
      const trackTween = gsap.fromTo(
        sliderRef.current,
        { xPercent: 0 },
        {
          xPercent: -65,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
        },
      );

      gsap.fromTo(section.querySelector('.tl-rail'), { width: '0%' }, {
        width: '98%',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      });

      section.classList.add('timeline--animated');

      const splits = Array.from(section.querySelectorAll('.tl-item'), (el, index) => {
        const [start, end] = REVEAL_WINDOWS[index];
        const scrollPosition = (progress) => {
          const trigger = trackTween.scrollTrigger;
          return trigger.start + (trigger.end - trigger.start) * progress;
        };

        return SplitText.create(el.querySelectorAll('.tl-title, .tl-text'), {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(copy) {
            return gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: section,
                start: () => scrollPosition(start),
                end: () => scrollPosition(end),
                scrub: true,
              },
            })
              .fromTo(el.querySelector('.tl-line'), { scaleY: 0 }, { scaleY: 1, duration: 0.5 })
              .fromTo(el.querySelector('.tl-dot'), { scale: 0 }, { scale: 1, duration: 0.5 }, 0)
              .fromTo(copy.lines, { yPercent: 100 }, { yPercent: 0, duration: 1.2, stagger: 0.02, ease: 'power2.out' }, 0);
          },
        });
      });

      // Re-measure the triggers against the newly enhanced sticky stage.
      ScrollTrigger.refresh();

      return () => {
        splits.forEach((split) => split.revert());
        section.classList.remove('timeline--animated');
        // Wait until matchMedia finishes reverting all animation contexts.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="timeline" aria-labelledby="experience-heading">
      <div className="tl-stage">
        <div ref={sliderRef} className="tl-track">
          <div className="tl-photo" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/poc-waste.webp" alt="" width="1440" height="900" loading="lazy" decoding="async" draggable={false} />
          </div>

          <div className="tl-body">
            <div className="tl-lead">
              <h2 id="experience-heading">My professional journey</h2>
              <p>Roles I&apos;ve held and systems I&apos;ve shipped.</p>
            </div>

            <div className="tl-axis" aria-hidden="true">
              <span className="tl-cap" />
              <span className="tl-rail" />
              <span className="tl-cap" />
            </div>

            <ol className="tl-list" role="list">
              {ITEMS.map((item, index) => <Item key={item.title} item={item} index={index} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
