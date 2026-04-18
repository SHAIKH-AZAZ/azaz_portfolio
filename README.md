# Azaz Shaikh Design System

This design system captures the visual language of **Azaz Shaikh's personal portfolio site** — a full-stack engineer portfolio focused on business automation, logistics software, and AI-assisted product work.

## Source of truth

- **Codebase (GitHub):** [SHAIKH-AZAZ/azaz_portfolio](https://github.com/SHAIKH-AZAZ/azaz_portfolio) — Next.js 16 + React 19 portfolio. The full source is also mirrored at `codebase_src/` in this project.
- **Design tokens:** extracted from `codebase_src/app/globals.css` + `codebase_src/app/layout.js` (font declarations via `next/font`).
- **Live product:** `azazshaikh.info` (a single-page portfolio).

## Product context

One product, one surface: a **marketing / portfolio single page** for a solo engineer. It has:

- A sticky glassy pill-shaped header
- A generous hero with animated orbs + a mock "device" window preview
- Metrics, skills marquee, about + insights, experience timeline, 8 project cards, services, process, contact panel, footer
- Live iframe previews of shipped projects (POC Waste Optimizer, Excel Cleaner Tool, ShamGym, Safe & Security Service)

The voice is **engineer-entrepreneur**: confident, operational, outcome-driven. The aesthetic is **light-mode premium SaaS** — white cards on soft-blue backdrop, indigo + sky accents, playful orb blurs behind a crisp data-driven foreground.

---

## Content fundamentals

**Voice.** First person, professional, outcome-oriented. "I engineer software solutions that eliminate inefficiencies." The copy frames the author as a builder and the reader as a potential client/collaborator.

**Tone.** Confident without hype. "Dependable software systems and clear logic" beats "10× your velocity". It mentions real engineering verbs — *shipped, engineered, secured, automated, optimized*.

**Casing.** Sentence case for headings ("Software that removes friction and helps teams move faster."). Mono captions / eyebrows are ALL CAPS with wide tracking ("BUSINESS AUTOMATION / FULL-STACK SYSTEMS"). Section labels: short, singular ("About", "Services", "Process", "Contact").

**Pronouns.** "I" for personal framing, "you/teams" for the audience. Never "we".

**Emoji.** None in copy. One heart `❤` appears in the footer credit only. No icons used as decoration in text.

**Punctuation.** Em-dashes for asides, "&" is used in "Q&A Tools" only — otherwise spelled "and". Numbers take the metric format: `1+`, `15+`, `98%`.

**Specific copy patterns:**
- Hero: 4-line title with enjambed clauses — `Software that / removes friction / and helps teams / move faster.`
- Section eyebrows: one or two words, uppercase, spaced, mono.
- Section heading: one long sentence stating the benefit/intent.
- Project numbers: `01`, `02` … as display elements.
- Project type labels: 1-3 words stacked on two lines ("Python\nBackend", "AI\nLLM").
- Tags: 1-2 words, TitleCase or capitalized abbreviations (Next.js, RAG, PostgreSQL).

---

## Visual foundations

**Colors.**
- Canvas: `#f8f9fc` (soft blue-white), with a faint 72px indigo grid overlay masked by a radial fade.
- Surfaces: pure white `#ffffff` for cards, with a translucent `rgba(255,255,255,0.85)` "glass" variant backed by `backdrop-filter: blur(20px)`.
- Primary text: `#0f1117`. Muted: `#6b7280`.
- Brand accents: indigo `#6366f1` (primary), sky `#0ea5e9`, emerald `#10b981`. These three appear most often as gradient pairs, orb blurs, or active states.
- Project cards each carry their own accent (coral, cyan, lime, indigo, emerald, amber, violet, rose) via CSS custom properties — the hover glow, tag fills, and icon pill all derive from that per-card variable.
- Borders: `rgba(0,0,0,0.08)` normal, `rgba(0,0,0,0.14)` strong. Low contrast; borders exist to define edges, not compete.

**Type.**
- Display: **Bricolage Grotesque** 500/600/700/800 — used for H1/H2/H3, brand wordmark, metric values. Tight tracking (`-0.04em` to `-0.05em`), line-height around 0.94–1.1.
- Body: **Manrope** 400/500/600/700/800 — paragraphs, buttons, nav, tags.
- Mono: **Space Mono** 400/700 — eyebrows, numeric captions, step indices, project numbers. Always uppercase with 0.14em–0.2em letter-spacing.
- Hero H1 is `clamp(2.85rem, 4.45vw, 4.35rem)`; section H2 is `clamp(2rem, 3.2vw, 3rem)`.

**Spacing & layout.**
- Container: `min(1120px, calc(100% - 2rem))` — capped width, comfortable gutters.
- Section vertical rhythm: `6rem` padding top/bottom (collapses to `4.5rem` under 820px).
- Card inner padding: `1.8rem` (collapses to `1.25rem` on mobile).
- Gap rhythm: `0.75rem` / `1rem` / `1.25rem` / `2rem` — multiples of the type baseline.
- The header sits inside a pill (`border-radius: 999px`) floating `1rem` from the top.

**Backgrounds & motifs.**
- Persistent fixed `body::before` grid — 72×72px indigo lines at 3% opacity, masked by a radial gradient so edges fade.
- Two fixed blurred "orbs" (`page-blur.blur-a` indigo top-left, `.blur-b` sky bottom-right) — ambient atmosphere, never content.
- A breathing halo + three floating orbs inside the hero device area. Subtle parallax on scroll.
- Occasional soft gradient fills (`linear-gradient(135deg, rgba(99,102,241,0.06), rgba(14,165,233,0.04))`) on "accent" preview panels.
- No photography or hand illustration anywhere. No textures. No noise (the `.noise` class is explicitly `display:none`).

**Corner radii.** Strong hierarchy: `6px` for tag pills → `12px` small → `16px` cards/panels → `24px` hero device + contact panel → `999px` for all buttons, chips, and the header. Pills and rectangles, nothing in between.

**Cards.**
- White fill, `1px` border in `--line`, `--shadow` (soft 4px/24px blur), 1.8rem padding, 16-24px radius.
- Hover: `translateY(-3px to -6px)`, `--shadow-hover` (12px/40px), border may shift toward accent tint.
- Project cards add a radial `::before` that tracks `--mouse-x / --mouse-y` and fades in on hover — a spotlight effect.

**Buttons.**
- Primary: indigo fill, white text, `0 6px 20px rgba(99,102,241,0.3)` glow, 999px radius, 0.9rem × 1.5rem padding, font-weight 700.
- Secondary: white fill, strong-line border, same radius. Hover borrows the accent border + text colour.
- Hover lifts the button `-3px`, intensifies the glow. No explicit press state — shape compresses back on release via the transition.

**Shadows.** Two tiers only: `--shadow` (ambient), `--shadow-hover` (lifted). Plus a specialized `--shadow-device` for the hero window. Accent-coloured glows only on branded CTAs.

**Transparency & blur.** Used sparingly but deliberately — the header, glass cards, floating tags, and hero device all have `backdrop-filter: blur(12–20px)` on translucent white. Page-blur orbs use `filter: blur(80px)`.

**Animation & motion.**
- Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` — a gentle overshoot-out.
- Reveal on scroll: `opacity 0 → 1` + `translateY(2rem → 0)` over 700ms, staggered per hero title word.
- Ambient loops: `float` 8–11s, `breathe` 7s, `marquee` 28s linear, `skeleton-pulse` 1.6s.
- Hover transitions are 180–260ms, mostly `ease`. Nothing "bouncy" — the feel is smooth-out, not springy.
- `@media (prefers-reduced-motion: reduce)` collapses every animation to 0.01ms. Honour this in new additions.

**Hover / press states.**
- Links: color shifts `--fg2 → --fg1` or `--accent`. No underline by default.
- Buttons: `translateY(-2px to -3px)` + stronger shadow.
- Cards: lift + shadow intensify, border tints toward accent.
- Tags on a hovered card: fill shifts to card's accent tint.
- Mono tags in skill panel: background `#f1f5f9 → #e0e7ff`, border tints indigo, text turns indigo, `translateY(-2px)`.
- Press states are not explicitly defined — rely on the native pseudo `:active` (browser dims).

**Iconography.** Inline-SVG throughout — no icon font, no sprite, no CDN. Strokes at 1.8–2 with round caps/joins for arrows and outline marks; solid fills for brand marks (GitHub, LinkedIn, Email glyph). A single `icon.svg` (`AS` monogram on a cyan-orange gradient) is the site favicon and the closest thing to a logo. See `ICONOGRAPHY.md` for the full rules.

---

## Index

Files at the root:

- `README.md` — this file
- `ICONOGRAPHY.md` — icon rules + asset catalogue
- `colors_and_type.css` — CSS custom properties (tokens) + semantic element defaults
- `SKILL.md` — Agent-Skill-compatible manifest for reuse

Folders:

- `assets/` — logos, favicons, generic SVGs from `public/`
- `codebase_src/` — a mirror of the upstream Next.js source (read-only reference)
- `preview/` — individual card files that populate the Design System tab
- `ui_kits/portfolio/` — React/JSX recreation of the portfolio's components + an `index.html` demo
- `fonts/` — (none — all fonts are loaded from Google Fonts via `@import` in `colors_and_type.css`)

---

## Caveats

- **Fonts** are loaded from **Google Fonts at runtime** — no TTF/WOFF files are shipped in `fonts/`. If you need offline use, download Bricolage Grotesque, Manrope, and Space Mono and drop them in `fonts/` with matching `@font-face` rules.
- **No slide template** was provided, so `slides/` is intentionally absent.
- **Project preview images** referenced in `portfolio.js` (e.g. `/excel-cleaner.png`, `/fastshipment.png`) are not in the upstream `public/` folder — they're expected to be dropped into deployment later. The UI kit uses placeholder tiles in their place.
