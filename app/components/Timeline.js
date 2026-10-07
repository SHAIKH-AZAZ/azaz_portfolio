'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Reveal order is left-to-right on the track, so sides alternate top/bottom.
// Top row holds 4 slots, bottom row 3: keep that split or the WINDOWS below drift.
const ITEMS = [
  { side: 'top', title: 'Maxgen Web Technologies', text: 'QA Manual and Automations Engineer Intern. Manual test cases and automated scripts for reliable releases.' },
  { side: 'bottom', title: 'Buniyadbyte', text: 'Full Stack IT Engineer. Shipping business automation and logistics web apps.' },
  { side: 'top', title: 'POC Waste Optimizer', text: 'Bar-cutting algorithms that minimize raw material waste, with a full project interface.' },
  { side: 'bottom', title: 'Excel Cleaner Tool', text: 'Strips hidden macros and messy formatting from XLSX files into clean, structured data.' },
  { side: 'top', title: 'FastShipment', text: 'Logistics platform with checkout, real-time shipment tracking and partner tools.' },
  { side: 'bottom', title: 'LangChain RAG System', text: 'AI assistant grounded in a custom knowledge base.' },
  { side: 'top', title: 'LangGraph AI Agent', text: 'Stateful multi-step agent with tool use, branching and memory.' },
];

// Per-item scroll window, % of section height: [start, end].
const WINDOWS = {
  desktop: [[6, 26], [16, 36], [26, 46], [35, 55], [45, 65], [55, 75], [65, 85]],
  mobile: [[22, 32], [28, 38], [36, 46], [45, 55], [52, 62], [60, 70], [69, 79]],
};

function Item({ item, index }) {
  const isTop = item.side === 'top';
  const marker = (
    <div className="tl-marker">
      {isTop ? <><div className="tl-dot" /><div className="tl-line" /></> : <><div className="tl-line" /><div className="tl-dot" /></>}
    </div>
  );

  return (
    <div className={`tl-item tl-item--${item.side}`} data-index={index}>
      {marker}
      <div className="tl-copy">
        <h4 className="tl-title">{item.title}</h4>
        <p className="tl-text">{item.text}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const section = sectionRef.current;

    // matchMedia re-runs the setup on breakpoint / motion-pref change and reverts
    // everything (ScrollTriggers, SplitText) in between. ScrollTrigger handles plain resizes.
    const mm = gsap.matchMedia(section);
    // `desktop` is only there so at least one query always matches: matchMedia skips the callback otherwise.
    mm.add({ mobile: '(max-width: 600px)', desktop: '(min-width: 601px)', reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { mobile, reduce } = ctx.conditions;

      gsap.fromTo(
        sliderRef.current,
        { xPercent: 0 },
        {
          xPercent: mobile ? -57 : -65,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: mobile ? '82% 50%' : '92% bottom', scrub: true },
        },
      );

      const rail = section.querySelector('.tl-rail');
      const railWidth = mobile ? '65%' : '98%';
      if (reduce) {
        gsap.set(rail, { width: railWidth });
        return; // items stay fully visible
      }
      gsap.to(rail, {
        width: railWidth,
        ease: 'none',
        scrollTrigger: { trigger: section, start: mobile ? 'top 30%' : 'top 25%', end: mobile ? '80% 50%' : '92% bottom', scrub: true },
      });

      const windows = mobile ? WINDOWS.mobile : WINDOWS.desktop;
      section.querySelectorAll('.tl-item').forEach((el) => {
        const [start, end] = windows[el.dataset.index];
        const copy = SplitText.create(el.querySelectorAll('.tl-title, .tl-text'), { type: 'lines', mask: 'lines' });

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: section, start: `${start}% 30%`, end: `${end}% 50%`, scrub: true },
          })
          .fromTo(el.querySelector('.tl-line'), { scaleY: 0 }, { scaleY: 1, duration: 0.5 })
          .fromTo(el.querySelector('.tl-dot'), { scale: 0 }, { scale: 1, duration: 0.5 }, 0)
          .fromTo(copy.lines, { yPercent: 100 }, { yPercent: 0, duration: 1.2, stagger: 0.02, ease: 'power2.out' }, 0);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="timeline" aria-label="Experience and builds">
      <div className="tl-stage">
        <div ref={sliderRef} className="tl-track">
          <div className="tl-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/poc-waste.webp" alt="" draggable={false} />
          </div>

          <div className="tl-body">
            <div className="tl-axis" aria-hidden="true">
              <span className="tl-cap" />
              <span className="tl-rail" />
              <span className="tl-cap" />
            </div>

            <div className="tl-row tl-row--top">
              <div className="tl-lead">
                <h2>My professional journey</h2>
              </div>
              <div className="tl-list">
                {ITEMS.map((item, i) => item.side === 'top' && <Item key={item.title} item={item} index={i} />)}
              </div>
            </div>

            <div className="tl-row tl-row--bottom">
              <div className="tl-lead">
                <p>Experience &amp; builds</p>
              </div>
              <div className="tl-list">
                {ITEMS.map((item, i) => item.side === 'bottom' && <Item key={item.title} item={item} index={i} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
