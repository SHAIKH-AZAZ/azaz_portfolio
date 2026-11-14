'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import TypewriterText from './TypewriterText';
import { BASE_URL } from '../site';

const MODES = {
  PROFILE: {
    url: `${BASE_URL}/profile`,
    label: 'Profile',
    json: `[
  {
    "name": "Azaz Shaikh",
    "role": "Full-Stack Software Developer",
    "focus": "fast, scalable web applications",
    "location": "Remote / India",
    "portfolio": "azazshaikh.info"
  }
]`
  },
  STACK: {
    url: `${BASE_URL}/stack`,
    label: 'Stack',
    json: `[
  {
    "frontend": ["React", "Next.js", "Tailwind CSS"],
    "backend": ["Node.js", "Python", "REST APIs"],
    "database": ["MongoDB", "SQL"],
    "automation": ["AI agents", "data pipelines", "workflows"]
  }
]`
  },
  PROJECTS: {
    url: `${BASE_URL}/work`,
    label: 'Work',
    json: `[
  {
    "featured": "POC Waste Optimizer",
    "type": "business automation platform",
    "impact": "reduced manual planning and material waste",
    "alsoBuilt": ["Excel Cleaner", "FastShipment", "AI RAG systems"]
  }
]`
  },
  CONTACT: {
    url: `${BASE_URL}/contact`,
    label: 'Hire',
    json: `[
  {
    "availability": "open to freelance and remote roles",
    "services": ["web apps", "automation tools", "AI integrations"],
    "response": "project discovery call",
    "cta": "Let's build a reliable software system"
  }
]`
  }
};

const MODE_KEYS = Object.keys(MODES);
const STATUS_WORDS = ['Thinking', 'Designing', 'Programming', 'Deploying'];
const SCAN_MS = 1400;

function renderScrapeOutput(text) {
  const tokenPattern = /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(\b\d+(?:\.\d+)?\b)|([{}\[\],:])/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const className = match[1]
      ? 'json-token-key'
      : match[2]
        ? 'json-token-string'
        : match[3]
          ? 'json-token-number'
          : 'json-token-punctuation';

    parts.push(
      <span className={className} key={`${match.index}-${match[0]}`}>
        {match[0]}
      </span>
    );
    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function HeroScraperAnimation() {
  const [activeMode, setActiveMode] = useState('PROFILE');
  const [isScraping, setIsScraping] = useState(false);
  const [typedUrl, setTypedUrl] = useState('');
  const [typedJson, setTypedJson] = useState('');
  // bumped by the run button to replay the current mode
  const [runs, setRuns] = useState(0);
  const timerRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef({});
  const shellRef = useRef(null);

  const currentMode = MODES[activeMode];

  useEffect(() => {
    let active = true;
    let urlInterval = null;
    let jsonInterval = null;
    let scanTimeout = null;

    setTypedUrl('');
    setTypedJson('');
    setIsScraping(false);

    const targetUrl = currentMode.url;
    let urlIdx = 0;
    
    urlInterval = setInterval(() => {
      if (!active) return;
      if (urlIdx < targetUrl.length) {
        setTypedUrl(targetUrl.slice(0, urlIdx + 1));
        urlIdx++;
      } else {
        clearInterval(urlInterval);
        
        setIsScraping(true);
        
        scanTimeout = setTimeout(() => {
          if (!active) return;
          setIsScraping(false);
          
          const targetJson = currentMode.json;
          let jsonIdx = 0;
          
          jsonInterval = setInterval(() => {
            if (!active) return;
            if (jsonIdx < targetJson.length) {
              setTypedJson(targetJson.slice(0, jsonIdx + 1));
              jsonIdx++;
            } else {
              clearInterval(jsonInterval);
            }
          }, 12);
          
        }, SCAN_MS);
      }
    }, 25);

    return () => {
      active = false;
      if (urlInterval) clearInterval(urlInterval);
      if (jsonInterval) clearInterval(jsonInterval);
      if (scanTimeout) clearTimeout(scanTimeout);
    };
  }, [activeMode, currentMode, runs]);

  useEffect(() => {
    const startAutoplay = () => {
      timerRef.current = setInterval(() => {
        setActiveMode((prev) => {
          const nextIdx = (MODE_KEYS.indexOf(prev) + 1) % MODE_KEYS.length;
          return MODE_KEYS[nextIdx];
        });
      }, 7500);
    };

    startAutoplay();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // the easing back to flat is a CSS transition (hero-scraper-animation.css)
  useEffect(() => {
    const shell = shellRef.current;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;
    const move = (e) => {
      const r = shell.getBoundingClientRect();
      shell.style.setProperty('--tilt-x', `${((0.5 - (e.clientY - r.top) / r.height) * 10).toFixed(2)}deg`);
      shell.style.setProperty('--tilt-y', `${(((e.clientX - r.left) / r.width - 0.5) * 12).toFixed(2)}deg`);
      shell.classList.add('is-tilting');
    };
    const leave = () => {
      shell.style.removeProperty('--tilt-x');
      shell.style.removeProperty('--tilt-y');
      shell.classList.remove('is-tilting');
    };
    shell.addEventListener('pointermove', move);
    shell.addEventListener('pointerleave', leave);
    return () => {
      shell.removeEventListener('pointermove', move);
      shell.removeEventListener('pointerleave', leave);
    };
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const place = () => {
      const el = tabRefs.current[activeMode];
      if (!el) return;
      list.style.setProperty('--active-tab-left', `${el.offsetLeft}px`);
      list.style.setProperty('--active-tab-top', `${el.offsetTop}px`);
      list.style.setProperty('--active-tab-width', `${el.offsetWidth}px`);
      list.style.setProperty('--active-tab-height', `${el.offsetHeight}px`);
    };
    place();
    // slide only after the first placement, so the pill doesn't grow in from 0 on load
    const raf = requestAnimationFrame(() => list.setAttribute('data-ready', ''));
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [activeMode]);


  const handleTabKeyDown = (event) => {
    const i = MODE_KEYS.indexOf(activeMode);
    const next = {
      ArrowRight: (i + 1) % MODE_KEYS.length,
      ArrowLeft: (i - 1 + MODE_KEYS.length) % MODE_KEYS.length,
      Home: 0,
      End: MODE_KEYS.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    handleTabClick(MODE_KEYS[next]);
    tabRefs.current[MODE_KEYS[next]]?.focus();
  };

  const handleTabClick = (modeId) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveMode(modeId);
  };

  return (
    <div ref={shellRef} className="scraper-animation-shell">
      <div className="window-chrome">
        <span /><span /><span />
        <div className="tab-pill">azaz.json</div>
      </div>

      <div className="scraper-stage-content">
        
        <div className="scraper-bar-container">
          <div className="scraper-url-input">
            <svg className="url-lock-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <span className="url-text">
              {typedUrl}
              <span className="url-caret" />
            </span>
          </div>

          <div className="scraper-controls">
            <div
              ref={listRef}
              className="tabs-wrapper"
              role="tablist"
              aria-label="About Azaz"
              onKeyDown={handleTabKeyDown}
            >
              <span className="tab-indicator" aria-hidden="true" />
              {Object.entries(MODES).map(([id, mode]) => (
                <button
                  key={id}
                  ref={(el) => { tabRefs.current[id] = el; }}
                  id={`hero-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeMode === id}
                  aria-controls="hero-tabpanel"
                  tabIndex={activeMode === id ? 0 : -1}
                  className={`tab-btn ${activeMode === id ? 'is-active' : ''}`}
                  onClick={() => handleTabClick(id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <button 
              className={`action-run-btn ${isScraping ? 'is-running' : ''}`}
              onClick={() => {
                setRuns((n) => n + 1);
              }}
              aria-label="Run automated process"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="arrow-icon">
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42 5.43 5.43H5v2z" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="scrape-output-frame"
          id="hero-tabpanel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${activeMode}`}
        >
          <div className={`scrape-output-sweep ${isScraping ? 'is-scanning' : ''}`} />
          <pre className="scrape-output-code">
            <code>{renderScrapeOutput(typedJson)}<span className="json-caret" /></code>
          </pre>
          <div className={`scraping-status-pill ${isScraping ? 'is-active' : ''}`}>
            <span className="status-grid" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
            <TypewriterText phrases={STATUS_WORDS} hold={900} className="status-typewriter" />
          </div>
        </div>

      </div>
    </div>
  );
}
