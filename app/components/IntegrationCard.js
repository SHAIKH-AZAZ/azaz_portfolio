/* Hub diagram: the tools a client already runs, each wired into the system in the
 * middle. Drawn on a 564x410 viewBox; icons are placed in % of it so they track the
 * lines at any width. Beams and the icon pop-in are CSS (the pop-in waits for the
 * card's `is-visible` from the page reveal). Adapted from 21st.dev's integration card. */
const W = 564;
const H = 410;

// center is 282, 205
const TOOLS = [
  { logo: 'python.svg', alt: 'Python', x: 110, y: 90, path: 'M 270 205 V 105 Q 270 90 255 90 H 110' },
  { logo: 'mongodb.svg', alt: 'MongoDB', x: 360, y: 70, path: 'M 294 205 V 85 Q 294 70 309 70 H 360' },
  { logo: 'langchain.svg', alt: 'LangChain', x: 160, y: 205, path: 'M 250 205 H 160' },
  { logo: 'nodejs.svg', alt: 'Node.js', x: 480, y: 205, path: 'M 314 205 H 480' },
  { logo: 'docker.svg', alt: 'Docker', x: 282, y: 360, path: 'M 282 205 V 360' },
  { logo: 'aws.svg', alt: 'AWS', x: 460, y: 340, path: 'M 314 215 V 325 Q 314 340 329 340 H 460' },
];

export default function IntegrationCard() {
  return (
    <article className="int-card reveal">
      <div className="int-visual">
        <div className="int-diagram">
          <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
            {TOOLS.map((t) => <path key={t.alt} className="int-line" d={t.path} />)}
            {TOOLS.map((t, i) => (
              <path key={t.alt} className="int-beam" d={t.path} style={{ '--beam-delay': `${(i * 0.7).toFixed(1)}s` }} />
            ))}
          </svg>

          <span className="int-hub">AS</span>

          {TOOLS.map((t, i) => (
            <span
              key={t.alt}
              className="int-tool"
              style={{ left: `${((t.x / W) * 100).toFixed(2)}%`, top: `${((t.y / H) * 100).toFixed(2)}%`, '--i': String(i) }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${t.logo}`} alt={t.alt} width="24" height="24" />
            </span>
          ))}
        </div>
      </div>

      <div className="int-body">
        <h3>Plugs into the stack you already run</h3>
        <p>APIs, databases, cloud and AI agents wired into one system, so data moves on its own instead of being copied by hand.</p>
        <a href="#contact" className="button button-primary">Start a project</a>
      </div>
    </article>
  );
}
