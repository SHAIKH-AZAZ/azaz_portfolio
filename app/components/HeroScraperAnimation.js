'use client';

import { useState, useEffect, useRef } from 'react';

const MODES = {
  SCRAPE: {
    id: 'SCRAPE',
    url: 'https://azazshaikh.dev/about',
    label: 'Scrape',
    json: `{
  "status": "success",
  "url": "https://azazshaikh.dev/about",
  "data": {
    "name": "Azaz Shaikh",
    "role": "Full-Stack Engineer",
    "focus": "Workflow Automation",
    "systems": "High-Performance",
    "experience": "5+ Years",
    "speed_optimization": "98%"
  }
}`,
    visualLayout: 'scrape'
  },
  SEARCH: {
    id: 'SEARCH',
    url: 'https://google.com/search?q=best+automation+developer',
    label: 'Search',
    json: `{
  "query": "best automation developer",
  "results": [
    {
      "title": "Azaz Shaikh",
      "url": "https://azazshaikh.dev",
      "rank": 1,
      "relevance": 0.99
    },
    {
      "title": "Systems Integrations Specialist",
      "url": "https://azazshaikh.dev/services",
      "rank": 2
    }
  ]
}`,
    visualLayout: 'search'
  },
  MAP: {
    id: 'MAP',
    url: 'https://azazshaikh.dev/sitemap.xml',
    label: 'Map',
    json: `{
  "sitemap": "https://azazshaikh.dev",
  "url_count": 6,
  "urls": [
    "/",
    "/about",
    "/experience",
    "/work",
    "/services",
    "/contact"
  ]
}`,
    visualLayout: 'map'
  },
  CRAWL: {
    id: 'CRAWL',
    url: 'https://azazshaikh.dev/projects',
    label: 'Crawl',
    json: `{
  "job_id": "crawl_77a9d",
  "pages_crawled": 14,
  "status": "completed",
  "output_format": "markdown",
  "time_elapsed_ms": 320,
  "concurrency_limit": 10
}`,
    visualLayout: 'crawl'
  }
};

export default function HeroScraperAnimation() {
  const [activeMode, setActiveMode] = useState('SCRAPE');
  const [isScraping, setIsScraping] = useState(false);
  const [typedUrl, setTypedUrl] = useState('');
  const [typedJson, setTypedJson] = useState('');
  const [charColumns, setCharColumns] = useState([]);
  const timerRef = useRef(null);

  const currentMode = MODES[activeMode];

  // Initialize and animate character matrix behind URL bar
  useEffect(() => {
    const chars = '- -++-XXXX+ +XX++:XXX+ +++XXXXXX++ [ .JSON ] [ .MD ] [ SCRAPE ] 200_OK';
    const generateColumns = () => {
      return Array.from({ length: 6 }, (_, colIdx) => {
        const length = 12 + Math.floor(Math.random() * 8);
        const characters = Array.from({ length }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        return {
          id: colIdx,
          chars: characters,
          delay: `${colIdx * 0.4}s`,
          duration: `${4 + Math.random() * 4}s`
        };
      });
    };
    setCharColumns(generateColumns());
  }, []);

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

  const handleTabClick = (modeId) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveMode(modeId);
  };

  return (
    <div className="scraper-animation-shell" data-tilt>
      {/* ✦ 4-point Glowing Sparkles (Firecrawl-style) */}
      <div className="sparkle sparkle-left" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>
      <div className="sparkle sparkle-right" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>

      {/* Floating Badges */}
      <div className="floating-badge badge-ok" aria-hidden="true">[ 200 OK ]</div>
      <div className="floating-badge badge-scrape" aria-hidden="true">[ SCRAPE ]</div>
      <div className="floating-badge badge-json" aria-hidden="true">[ .JSON ]</div>
      <div className="floating-badge badge-md" aria-hidden="true">[ .MD ]</div>

      {/* Background Matrix/Character columns */}
      <div className="character-matrix-bg" aria-hidden="true">
        {charColumns.map((col) => (
          <div 
            key={col.id} 
            className="matrix-col"
            style={{ 
              '--delay': col.delay,
              '--duration': col.duration
            }}
          >
            {col.chars.split('').map((char, charIdx) => (
              <span key={charIdx} className="matrix-char">{char}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Chrome Shell */}
      <div className="window-chrome">
        <span /><span /><span />
        <div className="tab-pill">2 Months Free — Annually ⚡</div>
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

        {/* Bottom panels: Visual Site layout vs JSON Structured Output */}
        <div className="panels-grid">
          
          {/* LEFT: Website visual representation */}
          <div className="panel-visual-site">
            <div className="visual-header">
              <span className="window-dot red" />
              <span className="window-dot yellow" />
              <span className="window-dot green" />
              <span className="visual-title">Site Layout</span>
            </div>
            
            <div className="visual-body">
              {/* Scan Sweep overlay */}
              <div className={`scan-sweep ${isScraping ? 'is-scanning' : ''}`} />

              {/* Scrape Layout */}
              {currentMode.visualLayout === 'scrape' && (
                <div className="mock-site-elements">
                  <div className="mock-block mock-navbar">
                    <div className="circle-node" />
                    <div className="nav-links-nodes">
                      <div className="line-node w-12" />
                      <div className="line-node w-8" />
                    </div>
                    <div className="btn-node" />
                  </div>
                  <div className="mock-block mock-hero">
                    <div className="h1-node w-24" />
                    <div className="h1-node w-36" />
                    <div className="paragraph-node" />
                    <div className="paragraph-node w-40" />
                  </div>
                  <div className="mock-grid">
                    <div className="mock-card">
                      <div className="card-image-node" />
                      <div className="card-title-node" />
                    </div>
                    <div className="mock-card">
                      <div className="card-image-node" />
                      <div className="card-title-node" />
                    </div>
                  </div>
                </div>
              )}

              {/* Search Layout */}
              {currentMode.visualLayout === 'search' && (
                <div className="mock-search-elements">
                  <div className="search-bar-node">
                    <div className="circle-node" />
                    <div className="line-node w-28" />
                  </div>
                  <div className="search-result-node">
                    <div className="result-header" />
                    <div className="result-line w-40" />
                    <div className="result-line w-24" />
                  </div>
                  <div className="search-result-node active">
                    <div className="result-header accent" />
                    <div className="result-line w-36" />
                    <div className="result-line w-20" />
                  </div>
                  <div className="search-result-node">
                    <div className="result-header" />
                    <div className="result-line w-44" />
                    <div className="result-line w-28" />
                  </div>
                </div>
              )}

              {/* Map Layout */}
              {currentMode.visualLayout === 'map' && (
                <div className="mock-map-elements">
                  <div className="tree-root-node">
                    <div className="node-box">/</div>
                    <div className="tree-branches">
                      <div className="branch-item">
                        <div className="branch-line" />
                        <div className="node-box accent">about</div>
                      </div>
                      <div className="branch-item">
                        <div className="branch-line" />
                        <div className="node-box">experience</div>
                      </div>
                      <div className="branch-item">
                        <div className="branch-line" />
                        <div className="node-box">work</div>
                      </div>
                      <div className="branch-item">
                        <div className="branch-line" />
                        <div className="node-box">services</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Crawl Layout */}
              {currentMode.visualLayout === 'crawl' && (
                <div className="mock-crawl-elements">
                  <div className="crawl-cascade">
                    <div className="crawl-row status-success">
                      <span className="row-code">GET 200</span>
                      <span className="row-url">/projects</span>
                    </div>
                    <div className="crawl-row status-success delay-1">
                      <span className="row-code">GET 200</span>
                      <span className="row-url">/projects/waste-optimizer</span>
                    </div>
                    <div className="crawl-row status-success delay-2">
                      <span className="row-code">GET 200</span>
                      <span className="row-url">/projects/excel-cleaner</span>
                    </div>
                    <div className="crawl-row status-running delay-3">
                      <span className="row-code pulse-code">GET ...</span>
                      <span className="row-url">/projects/gym-flow</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: JSON Terminal Output */}
          <div className="panel-visual-json">
            <div className="json-header">
              <span className="badge-json">[ Output .json ]</span>
            </div>
            
            <div className="json-body">
              <pre className="json-content">
                <code>
                  {typedJson}
                  <span className="json-caret" />
                </code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
