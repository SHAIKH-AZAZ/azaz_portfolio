---
name: Project Overview
description: Azaz Shaikh portfolio — Next.js 16/React 19, IBM Plex, light+dark themes, single-page
type: project
---

Personal portfolio at azazshaikh.info. Next.js 16.2.1, React 19, IBM Plex Sans/Mono via next/font. No GSAP; Lenis smooth scroll loaded from CDN. Design tokens in app/styles/tokens.css (both themes).

Single page: Hero → Marquee → About → Experience → Work (8 projects) → Services → Process → Contact → Footer.

Key components: SiteMotion.js (header scroll state, `is-visible` on `.reveal`, Lenis; renders nothing). Hero entrance is pure CSS in hero.css. Header.js (mobile hamburger) exists but is not wired into page.js.

**Why:** Started as static HTML, migrated to Next.js. Focus is on business automation and full-stack engineering.
**How to apply:** Keep motion minimal (one hero entrance, no per-section fade-ins); keep page.js as server component where possible.
