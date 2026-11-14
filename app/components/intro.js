// The intro plays once per browser session, never under reduced motion. This pre-paint script is
// the only place that decides: it adds html.intro-play, which intro-overlay.css needs to show the
// overlay and IntroOverlay reads to start the animation.
export const INTRO_KEY = 'intro-seen';
export const INTRO_CLASS = 'intro-play';

const script = `try{sessionStorage.getItem('${INTRO_KEY}')!=='1'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.documentElement.classList.add('${INTRO_CLASS}')}catch(e){}`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
