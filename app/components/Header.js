'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) close();
    }}>
      <div className="site-header-inner">
        <a className="brand" href="#top" onClick={close} aria-label="Azaz Shaikh, back to top">
          <span className="brand-mark" aria-hidden="true">AS</span>
          Azaz Shaikh
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-cta" href="#contact" onClick={close}>Start a project</a>
          <button
            ref={menuButton}
            type="button"
            className={`mobile-menu-btn${open ? ' is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className="mobile-nav"
        hidden={!open}
      >
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          <a href="#about" onClick={close}>About</a>
          <a href="#experience" onClick={close}>Experience</a>
          <a href="#work" onClick={close}>Work</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#contact" onClick={close}>Contact</a>
        </nav>
        <div className="mobile-nav-footer">
          <a href="https://github.com/SHAIKH-AZAZ/" target="_blank" rel="noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322" target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:azazshaikh2703@gmail.com">Email</a>
        </div>
      </div>
    </header>
  );
}
