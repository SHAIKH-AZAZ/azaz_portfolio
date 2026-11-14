'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { EMAIL, GITHUB, LINKEDIN } from '../site';

const LINKS = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#work', 'Work'],
  ['#services', 'Services'],
  ['#contact', 'Contact'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const header = headerRef.current;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    // drawer only exists at max-width 820px (header.css); close it if the viewport grows past that
    const wide = window.matchMedia('(min-width: 821px)');
    const onWide = (e) => { if (e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#top" onClick={close}><span className="brand-accent">Azaz</span> Shaikh</a>
          <nav className="nav" aria-label="Primary">
            {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="header-cta" href="#contact">Let&apos;s Build</a>
            <button
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
      </header>

      <div id="mobile-nav" className={`mobile-nav${open ? ' is-open' : ''}`} inert={!open}>
        <nav className="mobile-nav-links" aria-label="Mobile">
          {LINKS.map(([href, label]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        </nav>
        <a className="button button-primary mobile-nav-cta" href="#contact" onClick={close}>
          Let&apos;s Build Together
        </a>
        <div className="mobile-nav-footer">
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </div>
      </div>
    </>
  );
}
