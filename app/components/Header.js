'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#top" onClick={close}><span>Azaz</span> Shaikh</a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href="#contact">Let&apos;s Build</a>
          <button
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
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          <a href="#about" onClick={close}>About</a>
          <a href="#experience" onClick={close}>Experience</a>
          <a href="#work" onClick={close}>Work</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#contact" onClick={close}>Contact</a>
        </nav>
        <a className="button button-primary mobile-nav-cta" href="#contact" onClick={close}>
          Let&apos;s Build Together
        </a>
        <div className="mobile-nav-footer">
          <a href="https://github.com/SHAIKH-AZAZ/" target="_blank" rel="noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322" target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:azazshaikh2703@gmail.com">Email</a>
        </div>
      </div>
    </>
  );
}
