# Portfolio UI Kit

A React/JSX recreation of the Azaz Shaikh portfolio surfaces. Single-page single-surface — there is only one product.

## Files

- `index.html` — loads Babel + React and composes a click-thru version of the portfolio
- `Header.jsx` — floating glass pill nav + CTA
- `Hero.jsx` — eyebrow, 4-line headline, lead, CTAs, metrics, mock device
- `Marquee.jsx` — the skill-strip marquee
- `About.jsx` — about card + numbered insight list + skill groups
- `Experience.jsx` — vertical experience cards with company pills
- `Work.jsx` — 2-col project card grid (accent-coloured, per project)
- `Services.jsx` — 2×2 service cards
- `Process.jsx` — 3-step process cards with mono step-index
- `Contact.jsx` — contact panel with primary/secondary CTAs
- `Footer.jsx` — 4-column footer with brand lockup, social row, CTA
- `data.jsx` — the `portfolio.js` dataset, inline

## Click-thru interactions

- Nav anchors scroll to each section
- Primary "Let's Build" / "Email Me" buttons open `mailto:` (simulated with `alert` in the demo)
- Project cards track the mouse to drive the `--mouse-x/--mouse-y` radial hover glow
- Header flips to `is-scrolled` state on scroll

## Note

This is a cosmetic recreation — no live iframe previews inside project cards (would require the third-party URLs). Their visual slot uses the placeholder `pillars` / `cards` / `dashboard` variants from the real `ProjectVisual` component, plus gradient fills for the `site` kind.
