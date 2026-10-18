'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const menuButtonRef = useRef(null);
  const previousOverflowRef = useRef(null);

  const restoreScroll = useCallback(() => {
    if (previousOverflowRef.current === null) return;
    document.body.style.overflow = previousOverflowRef.current.body;
    document.documentElement.style.overflow = previousOverflowRef.current.root;
    previousOverflowRef.current = null;
  }, []);

  const finishClose = useCallback(() => {
    if (dialogRef.current?.open || previousOverflowRef.current === null) return;
    restoreScroll();
    setOpen(false);
    const trigger = menuButtonRef.current;
    if (trigger?.getClientRects().length) trigger.focus({ preventScroll: true });
  }, [restoreScroll]);

  const closeMenu = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    finishClose();
  }, [finishClose]);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    previousOverflowRef.current = {
      body: document.body.style.overflow,
      root: document.documentElement.style.overflow,
    };
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    setOpen(true);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const mobile = window.matchMedia('(max-width: 820px)');
    const onResize = () => { if (!mobile.matches) closeMenu(); };
    mobile.addEventListener('change', onResize);
    return () => {
      mobile.removeEventListener('change', onResize);
      if (dialog?.open) dialog.close();
      restoreScroll();
    };
  }, [closeMenu, restoreScroll]);

  const containFocus = (event) => {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll('a[href], button:not([disabled])');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const dismissBackdrop = (event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    ) closeMenu();
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#top"><span>Azaz</span> Shaikh</a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="header-cta" href="#contact">Let&apos;s Build</a>
            <button
              ref={menuButtonRef}
              type="button"
              className="mobile-menu-btn"
              onClick={openMenu}
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-haspopup="dialog"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className="mobile-nav"
        data-lenis-prevent
        aria-labelledby="mobile-nav-title"
        onClose={finishClose}
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClick={dismissBackdrop}
        onKeyDown={containFocus}
      >
        <div className="mobile-nav-header">
          <a className="brand" href="#top" onClick={closeMenu}><span>Azaz</span> Shaikh</a>
          <button type="button" className="mobile-nav-close" onClick={closeMenu} autoFocus>
            <span>Close</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <p className="mobile-nav-label" id="mobile-nav-title">Navigation</p>
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="button button-primary mobile-nav-cta" href="#contact" onClick={closeMenu}>
          Let&apos;s Build Together
        </a>
        <div className="mobile-nav-footer">
          <a href="https://github.com/SHAIKH-AZAZ/" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322" target="_blank" rel="noreferrer" onClick={closeMenu}>LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:azazshaikh2703@gmail.com" onClick={closeMenu}>Email</a>
        </div>
      </dialog>
    </>
  );
}
