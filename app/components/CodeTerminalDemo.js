'use client';

import { useEffect, useRef, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/_+-=#$%';
const SCRAMBLE_START_DELAY = 260;
const SCRAMBLE_LINE_STAGGER = 70;
const SCRAMBLE_TOKEN_STAGGER = 18;
const SCRAMBLE_OUTPUT_DELAY = 460;

function ScrambleToken({ text, className, playKey, delay = 0, duration = 520 }) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    const randomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !text.trim()) {
      setDisplayText(text);
      return undefined;
    }

    setDisplayText(
      text
        .split('')
        .map((char) => (char === ' ' ? char : randomChar()))
        .join('')
    );

    const start = performance.now() + delay;

    const tick = (now) => {
      if (now < start) {
        frameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);

      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return char;
            return index < revealed || progress === 1 ? char : randomChar();
          })
          .join('')
      );

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [delay, duration, playKey, text]);

  return <span className={className}>{displayText}</span>;
}

/* ── Tab Content ─────────────────────────────────────────────────── */
// Each line = array of tokens: { t: text, c: token class }
// Empty array = blank line
const TABS = [
  {
    id: 'profile',
    label: 'Profile',
    lines: [
      [{ t: '# Portfolio profile', c: 'comment' }],
      [{ t: 'const developer = ', c: 'normal' }, { t: '{', c: 'normal' }],
      [{ t: '  name: ', c: 'normal' }, { t: '"Azaz Shaikh"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  role: ', c: 'normal' }, { t: '"Full-Stack Engineer"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  focus: ', c: 'normal' }, { t: '"automation + scalable web apps"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  availableFor: ', c: 'normal' }, { t: '"freelance and remote work"', c: 'string' }],
      [{ t: '}', c: 'normal' }],
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    lines: [
      [{ t: '# Selected builds', c: 'comment' }],
      [{ t: 'projects.map((project) => ', c: 'normal' }, { t: 'ship', c: 'accent' }, { t: '(project))', c: 'normal' }],
      [],
      [{ t: '[', c: 'normal' }],
      [{ t: '  ', c: 'normal' }, { t: '"POC Waste Optimizer"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  ', c: 'normal' }, { t: '"Excel Cleaner"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  ', c: 'normal' }, { t: '"FastShipment"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  ', c: 'normal' }, { t: '"LangChain RAG System"', c: 'string' }],
      [{ t: ']', c: 'normal' }],
    ],
  },
  {
    id: 'stack',
    label: '{ } Stack',
    lines: [
      [{ t: '# Production toolkit', c: 'comment' }],
      [{ t: 'frontend: ', c: 'normal' }, { t: 'React, Next.js, GSAP', c: 'accent' }],
      [{ t: 'backend:  ', c: 'normal' }, { t: 'Node.js, Python, REST APIs', c: 'accent' }],
      [{ t: 'data:     ', c: 'normal' }, { t: 'SQL, MongoDB, Pandas', c: 'accent' }],
      [{ t: 'ai:       ', c: 'normal' }, { t: 'LangChain, LangGraph, RAG', c: 'accent' }],
      [],
      [{ t: 'optimize(', c: 'normal' }, { t: '"workflow"', c: 'string' }, { t: ') -> measurable impact', c: 'normal' }],
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    lines: [
      [{ t: '# Start a project', c: 'comment' }],
      [{ t: 'const inquiry = ', c: 'normal' }, { t: 'await', c: 'accent' }, { t: ' contactAzaz({', c: 'normal' }],
      [{ t: '  need: ', c: 'normal' }, { t: '"web app, automation, or AI system"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  priority: ', c: 'normal' }, { t: '"reliable, clean, scalable"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  timeline: ', c: 'normal' }, { t: '"ready to discuss"', c: 'string' }],
      [{ t: '})', c: 'normal' }],
      [],
      [{ t: 'return ', c: 'normal' }, { t: '"project discovery call"', c: 'string' }],
    ],
  },
];

const OUTPUT_LINES = [
  { t: '# Azaz Shaikh', c: 'h1' },
  { t: '', c: 'blank' },
  { t: 'Full-stack engineer for scalable web apps,', c: 'body' },
  { t: 'business automation, and AI-enabled workflows.', c: 'body' },
  { t: '', c: 'blank' },
  { t: '## Portfolio Signals', c: 'h2' },
  { t: '', c: 'blank' },
  { t: '- Business systems built for real workflows', c: 'li' },
  { t: '- Clean frontend motion and interaction design', c: 'li' },
  { t: '- Backend logic, data pipelines, and AI agents', c: 'li' },
];

/* ── Tab Icon SVGs ───────────────────────────────────────────────── */
function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M12 2C9.22 2 9 3.35 9 4.5v1.5h6v1H7.5C6.12 7 5 8.12 5 9.5v5C5 15.88 6.12 17 7.5 17H9v-2.5c0-1.38 1.12-2.5 2.5-2.5h5c1.38 0 2.5-1.12 2.5-2.5v-5C19 3.12 17.88 2 16.5 2H12zM10.5 4.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z"/>
      <path d="M12 22c2.78 0 3-.65 3-1.5V19h-6v-1h6.5c1.38 0 2.5-1.12 2.5-2.5v-5C18 9.12 16.88 8 15.5 8H14v2.5c0 1.38-1.12 2.5-2.5 2.5h-5C5.12 13 4 14.12 4 15.5v5C4 21.88 5.12 23 6.5 23H12zm1.5-2.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" opacity=".6"/>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.03.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.72-.2z"/>
    </svg>
  );
}

function CLIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <path d="M8 9l4 4-4 4M13 17h4"/>
    </svg>
  );
}

const TAB_ICONS = [PythonIcon, NodeIcon, null, CLIIcon];

/* ── Component ───────────────────────────────────────────────────── */
export default function CodeTerminalDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleTabClick = (idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setAnimKey((k) => k + 1);
  };

  const activeTab = TABS[activeIdx];

  return (
    <div className="ctd-shell">

      {/* Window chrome + Tab bar */}
      <div className="ctd-chrome">
        <span className="ctd-dot ctd-dot-red" />
        <span className="ctd-dot ctd-dot-yellow" />
        <span className="ctd-dot ctd-dot-green" />
        <div className="ctd-tabs" role="tablist" aria-label="Language selector">
          {TABS.map((tab, idx) => {
            const Icon = TAB_ICONS[idx];
            return (
              <button
                key={tab.id}
                role="tab"
                id={`ctd-tab-${tab.id}`}
                aria-selected={idx === activeIdx}
                aria-controls="ctd-tabpanel"
                className={`ctd-tab ${idx === activeIdx ? 'is-active' : ''}`}
                onClick={() => handleTabClick(idx)}
              >
                {Icon && <Icon />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="ctd-panels" id="ctd-tabpanel" role="tabpanel">

        {/* LEFT — Code panel */}
        <div className="ctd-code-panel">
          {activeTab.lines.map((line, lineIdx) => (
            <div
              key={`${animKey}-${lineIdx}`}
              className="ctd-line"
            >
              <span className="ctd-linenum">{lineIdx + 1}</span>
              <span className="ctd-code">
                {line.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.map((token, ti) => (
                    <ScrambleToken
                      key={`${animKey}-${lineIdx}-${ti}-${token.t}`}
                      className={`ctd-token ctd-token-${token.c}`}
                      text={token.t}
                      playKey={animKey}
                      delay={SCRAMBLE_START_DELAY + lineIdx * SCRAMBLE_LINE_STAGGER + ti * SCRAMBLE_TOKEN_STAGGER}
                      duration={680}
                    />
                  ))
                )}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT — Markdown output panel */}
        <div className="ctd-output-panel">
          <div className="ctd-output-chrome">
            <span className="ctd-dot ctd-dot-red" />
            <span className="ctd-dot ctd-dot-yellow" />
            <span className="ctd-dot ctd-dot-green" />
            <span className="ctd-output-label">Output</span>
          </div>
          <div className="ctd-output-body">
            {OUTPUT_LINES.map((line, idx) => (
              <div
                key={`${animKey}-out-${idx}`}
                className={`ctd-output-line ctd-out-${line.c}`}
              >
                {line.t ? (
                  <ScrambleToken
                    text={line.t}
                    playKey={animKey}
                    delay={SCRAMBLE_OUTPUT_DELAY + idx * 52}
                    duration={720}
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
