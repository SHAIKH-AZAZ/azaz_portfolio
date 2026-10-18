# Azaz Shaikh Portfolio

Single-page portfolio built with Next.js 16.2.1, React 19 and GSAP. JavaScript components and plain CSS; Inter and JetBrains Mono are loaded through `next/font`.

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
bun run build
bun run start
```

## Structure

- `app/page.js`: server-rendered page sections, skills, featured project content and project structured data.
- `app/layout.js`: fonts, SEO metadata, structured data and pre-paint theme initialization.
- `app/components/`: navigation, diagrams, timeline and interactive presentation components.
- `app/styles/`: theme tokens and component/section styles, imported in cascade order by `app/globals.css`.
- `public/work/` and `public/logos/`: project screenshots and shared technology logos.
- `_old_static/`: historical implementation, not part of the active app.

## Responsive UI

- The active `Header` uses desktop links above 820px and a native modal navigation dialog at smaller widths. The menu contains keyboard focus, closes on Escape/backdrop/section navigation, restores scroll settings, and closes when resized to desktop.
- `Timeline` renders its seven records once in chronological order. Its default layout is vertical, including before hydration. Normal-motion desktop enhances it into a horizontal scroll timeline; mobile, tablet and reduced-motion users retain the static vertical layout.
- About, Services and Contact headings are static. Featured cards separate the problem, what was built and the qualitative result; live apps have links, while private work is informational.
- The theme toggle announces whether dark mode is active and persists the choice in `localStorage`. Light is the initial default.
- Contact includes a selectable email address, mail link and clipboard control. Copy success is announced only after the browser resolves the write; unavailable or denied clipboard access shows manual-copy guidance.

The hero JSON display, portfolio console and business-impact animation are illustrative presentations, not backend execution or live measurements. Contact links open email or LinkedIn; there is no contact-submission API.

## Content maintenance

Project capabilities and results should remain grounded in the actual work. Do not add performance numbers without supporting measurements. When changing delivery steps or project descriptions, also review the corresponding JSON-LD in `app/layout.js` and `app/page.js`.

After UI changes, check desktop and 320px mobile views, both themes, keyboard navigation, reduced motion, timeline breakpoint transitions and clipboard success/error feedback.

