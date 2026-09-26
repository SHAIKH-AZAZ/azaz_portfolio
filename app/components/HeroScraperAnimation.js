'use client';

import { useState, useEffect, useRef } from 'react';

const MODES = {
  PROFILE: {
    id: 'PROFILE',
    url: 'https://azazshaikh.info/profile',
    label: 'Profile',
    json: `[
  {
    "name": "Azaz Shaikh",
    "role": "Full-Stack Software Developer",
    "focus": "fast, scalable web applications",
    "location": "Remote / India",
    "portfolio": "azazshaikh.info"
  }
]`,
    visualLayout: 'profile'
  },
  STACK: {
    id: 'STACK',
    url: 'https://azazshaikh.info/stack',
    label: 'Stack',
    json: `[
  {
    "frontend": ["React", "Next.js", "Tailwind CSS"],
    "backend": ["Node.js", "Python", "REST APIs"],
    "database": ["MongoDB", "SQL"],
    "automation": ["AI agents", "data pipelines", "workflows"]
  }
]`,
    visualLayout: 'stack'
  },
  PROJECTS: {
    id: 'PROJECTS',
    url: 'https://azazshaikh.info/work',
    label: 'Work',
    json: `[
  {
    "featured": "POC Waste Optimizer",
    "type": "business automation platform",
    "impact": "reduced manual planning and material waste",
    "alsoBuilt": ["Excel Cleaner", "FastShipment", "AI RAG systems"]
  }
]`,
    visualLayout: 'projects'
  },
  CONTACT: {
    id: 'CONTACT',
    url: 'https://azazshaikh.info/contact',
    label: 'Hire',
    json: `[
  {
    "availability": "open to freelance and remote roles",
    "services": ["web apps", "automation tools", "AI integrations"],
    "response": "project discovery call",
    "cta": "Let's build a reliable software system"
  }
]`,
    visualLayout: 'contact'
  }
};

const STATUS_WORDS = ['Thinking', 'Designing', 'Programming', 'Deploying'];

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
  const [typedStatus, setTypedStatus] = useState('');
  const timerRef = useRef(null);

  const currentMode = MODES[activeMode];

  // Handle coordinated interactive sequence (URL Typing -> Scanning -> JSON Typing)
  useEffect(() => {
    let active = true;
    let urlInterval = null;
    let jsonInterval = null;
    let scanTimeout = null;

    // Reset all interactive states
    setTypedUrl('');
    setTypedJson('');
    setIsScraping(false);

    // 1. Type the URL
    const targetUrl = currentMode.url;
    let urlIdx = 0;
    
    urlInterval = setInterval(() => {
      if (!active) return;
      if (urlIdx < targetUrl.length) {
        setTypedUrl(targetUrl.slice(0, urlIdx + 1));
        urlIdx++;
      } else {
        clearInterval(urlInterval);
        
        // 2. Once URL is fully typed, start scanning sweep
        setIsScraping(true);
        
        // 3. Scan for 1.4s, then type the JSON
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
          }, 12); // fast JSON typing speed
          
        }, 1400);
      }
    }, 25); // fast typing speed for the URL

    return () => {
      active = false;
      if (urlInterval) clearInterval(urlInterval);
      if (jsonInterval) clearInterval(jsonInterval);
      if (scanTimeout) clearTimeout(scanTimeout);
    };
  }, [activeMode, currentMode]);

  // Autoplay loop (runs through modes when user is idle)
  useEffect(() => {
    const startAutoplay = () => {
      timerRef.current = setInterval(() => {
        setActiveMode((prev) => {
          const keys = Object.keys(MODES);
          const nextIdx = (keys.indexOf(prev) + 1) % keys.length;
          return keys[nextIdx];
        });
      }, 7500);
    };

    startAutoplay();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    let active = true;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = null;

    const tick = () => {
      if (!active) return;

      const word = STATUS_WORDS[wordIndex];
      setTypedStatus(word.slice(0, charIndex));

      if (!deleting && charIndex < word.length) {
        charIndex++;
        timeoutId = setTimeout(tick, 85);
        return;
      }

      if (!deleting && charIndex === word.length) {
        deleting = true;
        timeoutId = setTimeout(tick, 900);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex--;
        timeoutId = setTimeout(tick, 45);
        return;
      }

      deleting = false;
      wordIndex = (wordIndex + 1) % STATUS_WORDS.length;
      timeoutId = setTimeout(tick, 220);
    };

    tick();

    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleTabClick = (modeId) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveMode(modeId);
  };

  return (
    <div className="scraper-animation-shell" data-tilt>
      {/* Chrome Shell */}
      <div className="window-chrome">
        <span /><span /><span />
        <div className="tab-pill">azaz.json</div>
      </div>

      <div className="scraper-stage-content">
        
        {/* Top bar: URL Search Box & Control tabs */}
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
            <div className="tabs-wrapper">
              {Object.values(MODES).map((mode) => (
                <button
                  key={mode.id}
                  className={`tab-btn ${activeMode === mode.id ? 'is-active' : ''}`}
                  onClick={() => handleTabClick(mode.id)}
                >
                  <span className="tab-dot" />
                  {mode.label}
                </button>
              ))}
            </div>

            <button 
              className={`action-run-btn ${isScraping ? 'is-running' : ''}`}
              onClick={() => {
                setIsScraping(true);
                setTimeout(() => setIsScraping(false), 1500);
              }}
              aria-label="Run automated process"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="arrow-icon">
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42 5.43 5.43H5v2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="scrape-output-frame">
          <div className={`scrape-output-sweep ${isScraping ? 'is-scanning' : ''}`} />
          <pre className="scrape-output-code">
            <code>{renderScrapeOutput(typedJson)}<span className="json-caret" /></code>
          </pre>
          <div className={`scraping-status-pill ${isScraping ? 'is-active' : ''}`}>
            <span className="status-grid" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
            <span className="status-typewriter">
              {typedStatus}
              <span className="status-typewriter-caret" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
