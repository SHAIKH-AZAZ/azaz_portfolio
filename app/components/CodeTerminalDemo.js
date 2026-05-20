'use client';

import { useState } from 'react';

/* ── Tab Content ─────────────────────────────────────────────────── */
// Each line = array of tokens: { t: text, c: token class }
// Empty array = blank line
const TABS = [
  {
    id: 'python',
    label: 'Python',
    lines: [
      [{ t: '# Install (one-time)', c: 'comment' }],
      [{ t: 'pip install ', c: 'normal' }, { t: 'firecrawl-py', c: 'accent' }],
      [],
      [{ t: '# Scrape with Python', c: 'comment' }],
      [{ t: 'from firecrawl import ', c: 'normal' }, { t: 'FirecrawlApp', c: 'accent' }],
      [
        { t: 'app = ', c: 'normal' },
        { t: 'FirecrawlApp', c: 'accent' },
        { t: "(api_key='", c: 'normal' },
        { t: 'fc-YOUR_API_KEY', c: 'accent' },
        { t: "')", c: 'normal' },
      ],
      [],
      [
        { t: 'result = app.scrape_url("https://', c: 'normal' },
        { t: 'azazshaikh.dev', c: 'accent' },
        { t: '")', c: 'normal' },
      ],
    ],
  },
  {
    id: 'node',
    label: 'Node.js',
    lines: [
      [{ t: '# Install (one-time)', c: 'comment' }],
      [{ t: 'npm install ', c: 'normal' }, { t: '@firecrawl/firecrawl-js', c: 'accent' }],
      [],
      [{ t: '// Initialize client', c: 'comment' }],
      [
        { t: 'import ', c: 'normal' },
        { t: 'FirecrawlApp', c: 'accent' },
        { t: " from '@firecrawl/firecrawl-js'", c: 'normal' },
      ],
      [
        { t: 'const app = new ', c: 'normal' },
        { t: 'FirecrawlApp', c: 'accent' },
        { t: "({ apiKey: '", c: 'normal' },
        { t: 'fc-YOUR_API_KEY', c: 'accent' },
        { t: "' })", c: 'normal' },
      ],
      [],
      [
        { t: "const data = await app.scrapeUrl('https://", c: 'normal' },
        { t: 'azazshaikh.dev', c: 'accent' },
        { t: "')", c: 'normal' },
      ],
    ],
  },
  {
    id: 'curl',
    label: '{ } cURL',
    lines: [
      [{ t: '# Scrape via REST API', c: 'comment' }],
      [{ t: 'curl -X POST https://api.firecrawl.dev/v1/scrape \\', c: 'normal' }],
      [{ t: "  -H 'Content-Type: application/json' \\", c: 'normal' }],
      [
        { t: "  -H 'Authorization: Bearer ", c: 'normal' },
        { t: 'fc-YOUR_API_KEY', c: 'accent' },
        { t: "' \\", c: 'normal' },
      ],
      [
        { t: '  -d \'{ "url": "https://', c: 'normal' },
        { t: 'azazshaikh.dev', c: 'accent' },
        { t: "\" }'", c: 'normal' },
      ],
    ],
  },
  {
    id: 'cli',
    label: 'CLI',
    lines: [
      [{ t: '# Install and authenticate (one-time)', c: 'comment' }],
      [{ t: 'npm install -g ', c: 'normal' }, { t: 'firecrawl-cli', c: 'accent' }],
      [
        { t: 'firecrawl login --api-key ', c: 'normal' },
        { t: 'fc-YOUR_API_KEY', c: 'accent' },
      ],
      [],
      [{ t: '# Scrape a URL (markdown, use --only-main-content for clean output)', c: 'comment' }],
      [
        { t: 'firecrawl scrape https://', c: 'normal' },
        { t: 'azazshaikh.dev', c: 'accent' },
      ],
      [
        { t: 'firecrawl https://', c: 'normal' },
        { t: 'azazshaikh.dev', c: 'accent' },
        { t: ' --only-main-content', c: 'normal' },
      ],
      [],
    ],
  },
];

const OUTPUT_LINES = [
  { t: '# Azaz Shaikh', c: 'h1' },
  { t: '', c: 'blank' },
  { t: 'Azaz builds scalable web systems,', c: 'body' },
  { t: 'automates workflows, and deploys AI agents.', c: 'body' },
  { t: '', c: 'blank' },
  { t: '## Technical Stack', c: 'h2' },
  { t: '', c: 'blank' },
  { t: '- Python: LangChain, RAG, Pandas', c: 'li' },
  { t: '- Backend: Node.js, Express, SQL', c: 'li' },
  { t: '- Frontend: React, Next.js, GSAP', c: 'li' },
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
  const [activeIdx, setActiveIdx] = useState(3); // CLI by default
  const [animKey, setAnimKey] = useState(0);

  const handleTabClick = (idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setAnimKey((k) => k + 1);
  };

  const activeTab = TABS[activeIdx];
  const outputDelay = activeTab.lines.length * 0.16 + 0.1;

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
              style={{ animationDelay: `${lineIdx * 0.16}s` }}
            >
              <span className="ctd-linenum">{lineIdx + 1}</span>
              <span className="ctd-code">
                {line.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.map((token, ti) => (
                    <span key={ti} className={`ctd-token ctd-token-${token.c}`}>
                      {token.t}
                    </span>
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
                style={{ animationDelay: `${outputDelay + idx * 0.1}s` }}
              >
                {line.t || <span>&nbsp;</span>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
