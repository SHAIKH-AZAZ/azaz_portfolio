// Theme state shared by the pre-paint script (layout) and ThemeToggle. Dark is the default;
// the choice is stored under THEME_KEY and applied as <html data-theme>.
export const THEME_KEY = 'theme';
// browser UI colour per theme; must equal --bg in tokens.css (the script runs before CSS loads)
export const THEME_COLOR = { dark: '#070709', light: '#edf2fb' };

const script = `try{var t=localStorage.getItem('${THEME_KEY}')==='light'?'light':'dark';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==='light'?'${THEME_COLOR.light}':'${THEME_COLOR.dark}'}catch(e){}`;

// Sets the saved theme before first paint, so there is no flash of the wrong one.
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
