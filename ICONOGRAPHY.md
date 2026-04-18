# Iconography

The portfolio is pragmatic and minimal about icons — **every icon in the site is a hand-rolled inline SVG inside the JSX**. No icon font. No sprite sheet. No CDN.

## What actually exists

| Asset | Purpose | Source |
|---|---|---|
| `assets/logo-mark.svg` | The "AS" monogram on cyan→orange gradient. Site favicon (`/icon.svg`), Twitter card, and the stamped badge inside the footer brand wordmark. | `app/icon.svg` |
| `assets/file.svg`, `assets/globe.svg`, `assets/window.svg`, `assets/next.svg`, `assets/vercel.svg` | Leftover Next.js starter SVGs. Not currently referenced by the portfolio — kept for completeness. | `public/*.svg` |

There is **no dedicated logo file** beyond the 64px monogram. The footer uses the same monogram scaled into a 2.2rem rounded box, with the wordmark "**Azaz.dev**" beside it. The header uses *only type*: `<span>Azaz</span> Shaikh` in Bricolage Grotesque, where the first word is indigo.

## Icon style rules

1. **Always inline SVG.** Drop the `<svg>` directly into the JSX/HTML. This makes it stylable via `stroke="currentColor"` or `fill="currentColor"`.
2. **Two shape vocabularies coexist:**
   - **Outline** — `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`. Used for arrows, envelope outlines, the "external link" glyph inside project pills, and scroll-to-top marks.
   - **Solid glyph** — `fill="currentColor"` with no stroke. Used for the three brand social glyphs (GitHub, LinkedIn, Email in the footer) and the solid envelope in the contact CTA.
3. **ViewBox size:** 16 for small inline glyphs (project pill arrows), 24 for standard UI icons (social, email, CTA envelope). Render size is controlled via `width`/`height` attributes on the element, not CSS.
4. **Stroke weight:** 1.8 for dense / small glyphs, 2 for larger outline icons. Never below 1.5.
5. **Colour is inherited** from the surrounding element's `color`. Icons inside indigo pills get indigo stroke; icons in muted footer links pick up `--fg2` and hover to white against the indigo hover fill.
6. **No filled backgrounds.** Icons don't live inside colored circles. The *exception* is the footer social row — a neutral white square with a 1px line border, which turns indigo on hover.

## Emoji

None, with a single exception: the footer credit shows a single red heart (`❤`) as Unicode between "Built with" and "using Next.js & CSS". Do not add others.

## Unicode characters as icons

Only one, intentionally — the external-link arrow `↗` is baked into button labels ("POC Waste ↗" in the experience section, "Live App ↗" variants). Prefer Unicode `↗` over a hand-drawn arrow when an arrow is *inside* flowing text; prefer the outline SVG when the arrow is in a pill/button/icon-slot.

## When adding new icons

1. **First** try to lift a glyph directly from an open-source set that matches the portfolio's outline style (e.g. Lucide, Phosphor — both are stroke-1.5–2 rounded). Lucide is the closest match.
2. Paste the SVG inline into the component. Strip unnecessary attributes (`xmlns`, `version`, CSS `class`). Keep `viewBox`. Add `fill="none" stroke="currentColor"` on outline glyphs.
3. Size via `width="20" height="20"` props on the `<svg>` itself — **not** via CSS width/height, to keep the SVG intrinsic box stable across Flexbox contexts.
4. If you must use a CDN, link Lucide from `https://unpkg.com/lucide@latest` and flag the substitution in your PR description.

## Flagged substitutions

If you render this design system into a Claude Code skill or throwaway prototype and can't ship the exact monogram asset, substitute:

- **Logo:** the `AS` monogram — render it inline with the same gradient (`#4ed8ff → #ff9152` at 135°) in a 16px rounded square, `system-ui` 800-weight `AS` centered.
- **Outline icons:** use [Lucide](https://lucide.dev) — stroke-1.8, round caps, 24×24 viewBox. Its style matches the portfolio's arrows/envelopes 1:1.
- **Solid social glyphs:** Simple Icons (`simpleicons.org`) has pixel-perfect GitHub and LinkedIn marks — use those if the inline ones in `PortfolioSections.js` are unavailable.

No other icon sources should be mixed in.
