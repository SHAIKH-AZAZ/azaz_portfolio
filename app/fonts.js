import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';

// Every font on the site is set here. To swap one, change its import and the call below;
// the CSS only ever reads --font-display (headings), --font-body (text) and --font-mono (code, labels).
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
