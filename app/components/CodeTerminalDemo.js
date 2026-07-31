'use client';

import { useEffect, useState } from 'react';

const TYPE_START_DELAY = 120;
const TYPE_CHAR_SPEED = 12;
const OUTPUT_AFTER_CODE_DELAY = 260;
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/_+-=#$%';
const SCRAMBLE_TRAIL = 4;

const getLineLength = (line) => line.reduce((sum, token) => sum + token.t.length, 0);
const getCodeLength = (lines) => lines.reduce((sum, line) => sum + getLineLength(line), 0);
const getOutputLength = (lines) => lines.reduce((sum, line) => sum + line.t.length, 0);

function getScrambleChar(index, tick) {
  return SCRAMBLE_CHARS[(index * 17 + tick * 7) % SCRAMBLE_CHARS.length];
}

function shouldScrambleChar(index, visibleChars, totalChars) {
  return visibleChars < totalChars && index >= visibleChars - SCRAMBLE_TRAIL && index < visibleChars;
}

function renderTokenLine(line, visibleChars, lineStart, globalVisibleChars, totalChars, scrambleTick) {
  let remaining = visibleChars;
  let tokenStart = 0;

  return line.map((token, ti) => {
    const tokenText = token.t.slice(0, Math.max(0, Math.min(token.t.length, remaining)));
    remaining -= token.t.length;
    const renderedText = tokenText
      .split('')
      .map((char, charIdx) => {
        const absoluteIndex = lineStart + tokenStart + charIdx;
        if (char === ' ' || !shouldScrambleChar(absoluteIndex, globalVisibleChars, totalChars)) return char;
        return getScrambleChar(absoluteIndex, scrambleTick);
      })
      .join('');

    tokenStart += token.t.length;

    return (
      <span key={`${ti}-${token.t}`} className={`ctd-token ctd-token-${token.c}`}>
        {renderedText}
      </span>
    );
  });
}

function renderOutputText(text, visibleChars, lineStart, globalVisibleChars, totalChars, scrambleTick) {
  return text
    .slice(0, visibleChars)
    .split('')
    .map((char, charIdx) => {
      const absoluteIndex = lineStart + charIdx;
      if (char === ' ' || !shouldScrambleChar(absoluteIndex, globalVisibleChars, totalChars)) return char;
      return getScrambleChar(absoluteIndex, scrambleTick);
    })
    .join('');
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
      [{ t: 'const ', c: 'keyword' }, { t: 'developer', c: 'variable' }, { t: ' = ', c: 'operator' }, { t: '{', c: 'normal' }],
      [{ t: '  name: ', c: 'property' }, { t: '"Azaz Shaikh"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  role: ', c: 'property' }, { t: '"Full-Stack Engineer"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  focus: ', c: 'property' }, { t: '"automation + scalable web apps"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  availableFor: ', c: 'property' }, { t: '"freelance and remote work"', c: 'string' }],
      [{ t: '};', c: 'normal' }],
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    lines: [
      [{ t: '# Selected production builds', c: 'comment' }],
      [{ t: 'const ', c: 'keyword' }, { t: 'ship', c: 'function' }, { t: ' = ', c: 'operator' }, { t: 'async ', c: 'keyword' }, { t: '(build) => ', c: 'operator' }, { t: 'deploy', c: 'accent' }, { t: '(build);', c: 'normal' }],
      [],
      [{ t: 'const ', c: 'keyword' }, { t: 'projects', c: 'variable' }, { t: ' = [', c: 'normal' }],
      [{ t: '  ', c: 'normal' }, { t: '"POC Waste Optimizer"', c: 'string' }, { t: ',', c: 'normal' }, { t: ' // Cutting algorithm', c: 'comment' }],
      [{ t: '  ', c: 'normal' }, { t: '"Excel Cleaner Tool"', c: 'string' }, { t: ',', c: 'normal' }, { t: ' // XLSX Data Stripper', c: 'comment' }],
      [{ t: '  ', c: 'normal' }, { t: '"FastShipment"', c: 'string' }, { t: ',', c: 'normal' }, { t: ' // Logistics Platform', c: 'comment' }],
      [{ t: '  ', c: 'normal' }, { t: '"LangChain AI Agent"', c: 'string' }, { t: ' // RAG Vector Workflow', c: 'comment' }],
      [{ t: '];', c: 'normal' }],
    ],
  },
  {
    id: 'stack',
    label: '{ } Stack',
    lines: [
      [{ t: '# Full-stack toolkit & AI tech', c: 'comment' }],
      [{ t: 'const ', c: 'keyword' }, { t: 'stack', c: 'variable' }, { t: ' = {', c: 'normal' }],
      [{ t: '  frontend: ', c: 'property' }, { t: '["React", "Next.js", "GSAP"]', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  backend: ', c: 'property' }, { t: '["Node.js", "Python", "REST APIs"]', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  data: ', c: 'property' }, { t: '["SQL", "MongoDB", "Pandas"]', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  ai: ', c: 'property' }, { t: '["LangChain", "LangGraph", "RAG"]', c: 'string' }],
      [{ t: '};', c: 'normal' }],
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    lines: [
      [{ t: '# Initialize project discovery', c: 'comment' }],
      [{ t: 'const ', c: 'keyword' }, { t: 'inquiry', c: 'variable' }, { t: ' = ', c: 'operator' }, { t: 'await ', c: 'keyword' }, { t: 'contactAzaz', c: 'function' }, { t: '({', c: 'normal' }],
      [{ t: '  need: ', c: 'property' }, { t: '"web app, automation, or AI system"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  priority: ', c: 'property' }, { t: '"scalable & production-ready"', c: 'string' }, { t: ',', c: 'normal' }],
      [{ t: '  timeline: ', c: 'property' }, { t: '"ready for discussion"', c: 'string' }],
      [{ t: '});', c: 'normal' }],
    ],
  },
];

const OUTPUT_LINES = [
  { t: '# Azaz Shaikh', c: 'h1' },
  { t: '', c: 'blank' },
  { t: 'Full-stack engineer specializing in scalable web platforms,', c: 'body' },
  { t: 'business automation tools, and autonomous AI systems.', c: 'body' },
  { t: '', c: 'blank' },
  { t: '## Portfolio Signals', c: 'h2' },
  { t: '', c: 'blank' },
  { t: '✓ High-performance web applications built for real workflows', c: 'li' },
  { t: '✓ Custom optimization algorithms (bar cutting, logistics)', c: 'li' },
  { t: '✓ End-to-end data pipelines & LangGraph AI agents', c: 'li' },
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
  const [codeVisibleChars, setCodeVisibleChars] = useState(0);
  const [outputVisibleChars, setOutputVisibleChars] = useState(0);
  const [scrambleTick, setScrambleTick] = useState(0);

  const handleTabClick = (idx) => {
    if (idx === activeIdx) {
      setAnimKey((k) => k + 1);
      return;
    }

    setActiveIdx(idx);
    setAnimKey((k) => k + 1);
  };

  const activeTab = TABS[activeIdx];
  const codeCharCount = getCodeLength(activeTab.lines);
  const outputCharCount = getOutputLength(OUTPUT_LINES);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setCodeVisibleChars(codeCharCount);
      setOutputVisibleChars(outputCharCount);
      return undefined;
    }

    let codeIntervalId = null;
    let outputIntervalId = null;
    let outputTimeoutId = null;

    setCodeVisibleChars(0);
    setOutputVisibleChars(0);

    const startTimeoutId = window.setTimeout(() => {
      let nextCodeCount = 0;

      codeIntervalId = window.setInterval(() => {
        nextCodeCount += 1;
        setCodeVisibleChars(nextCodeCount);

        if (nextCodeCount >= codeCharCount) {
          window.clearInterval(codeIntervalId);

          outputTimeoutId = window.setTimeout(() => {
            let nextOutputCount = 0;

            outputIntervalId = window.setInterval(() => {
              nextOutputCount += 1;
              setOutputVisibleChars(nextOutputCount);

              if (nextOutputCount >= outputCharCount) {
                window.clearInterval(outputIntervalId);
              }
            }, TYPE_CHAR_SPEED);
          }, OUTPUT_AFTER_CODE_DELAY);
        }
      }, TYPE_CHAR_SPEED);
    }, TYPE_START_DELAY);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (outputTimeoutId) window.clearTimeout(outputTimeoutId);
      if (codeIntervalId) window.clearInterval(codeIntervalId);
      if (outputIntervalId) window.clearInterval(outputIntervalId);
    };
  }, [activeIdx, animKey, codeCharCount, outputCharCount]);

  useEffect(() => {
    if (codeVisibleChars >= codeCharCount && outputVisibleChars >= outputCharCount) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setScrambleTick((tick) => tick + 1);
    }, 45);

    return () => window.clearInterval(intervalId);
  }, [codeCharCount, codeVisibleChars, outputCharCount, outputVisibleChars]);

  return (
    <div className="ctd-shell">
      {/* Window chrome + Tab bar */}
      <div className="ctd-chrome">
        <div className="ctd-dots" aria-hidden="true">
          <span className="ctd-dot ctd-dot-red" />
          <span className="ctd-dot ctd-dot-yellow" />
          <span className="ctd-dot ctd-dot-green" />
        </div>
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
        <div className="ctd-status-pill">
          <span className="ctd-status-glow" />
          <span>RUNNING</span>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="ctd-panels" id="ctd-tabpanel" role="tabpanel">
        {/* LEFT — Code panel */}
        <div className="ctd-code-panel">
          {(() => {
            let consumedChars = 0;
            let caretPlaced = false;

            return activeTab.lines.map((line, lineIdx) => {
              const lineStart = consumedChars;
              const lineLength = getLineLength(line);
              const visibleInLine = Math.max(0, Math.min(lineLength, codeVisibleChars - lineStart));
              const showCaret = !caretPlaced && lineLength > 0 && codeVisibleChars >= lineStart && codeVisibleChars < lineStart + lineLength;

              if (showCaret) caretPlaced = true;
              consumedChars += lineLength;

              return (
                <div key={`${animKey}-${lineIdx}`} className="ctd-line">
                  <span className="ctd-linenum">{lineIdx + 1}</span>
                  <span className="ctd-code">
                    {line.length === 0 ? <span>&nbsp;</span> : renderTokenLine(line, visibleInLine, lineStart, codeVisibleChars, codeCharCount, scrambleTick)}
                    {showCaret && <span className="ctd-typing-caret" aria-hidden="true" />}
                  </span>
                </div>
              );
            });
          })()}
        </div>

        {/* RIGHT — Markdown output panel */}
        <div className="ctd-output-panel">
          <div className="ctd-output-chrome">
            <span className="ctd-output-badge">● TERMINAL OUTPUT</span>
          </div>
          <div className="ctd-output-body">
            {(() => {
              let consumedChars = 0;
              let caretPlaced = false;

              return OUTPUT_LINES.map((line, idx) => {
                const lineStart = consumedChars;
                const lineLength = line.t.length;
                const visibleInLine = Math.max(0, Math.min(lineLength, outputVisibleChars - lineStart));
                const showCaret = !caretPlaced && outputVisibleChars > 0 && lineLength > 0 && outputVisibleChars >= lineStart && outputVisibleChars < lineStart + lineLength;

                if (showCaret) caretPlaced = true;
                consumedChars += lineLength;

                return (
                  <div key={`${animKey}-out-${idx}`} className={`ctd-output-line ctd-out-${line.c}`}>
                    {line.t ? renderOutputText(line.t, visibleInLine, lineStart, outputVisibleChars, outputCharCount, scrambleTick) : <span>&nbsp;</span>}
                    {showCaret && <span className="ctd-typing-caret" aria-hidden="true" />}
                  </div>
                );
              });
            })()}
          </div>
        </div>

      </div>
    </div>
  );
}
