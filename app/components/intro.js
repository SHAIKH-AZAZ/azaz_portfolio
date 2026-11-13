// The intro plays once per browser session. This pre-paint script adds html.intro-play
// (which intro-overlay.css needs to show the overlay) only on the first visit.
export const INTRO_KEY = 'intro-seen';

const script = `try{sessionStorage.getItem('${INTRO_KEY}')!=='1'&&document.documentElement.classList.add('intro-play')}catch(e){}`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
