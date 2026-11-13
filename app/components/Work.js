import OtherBuilds from './OtherBuilds';
import { featuredWork, BUILDS, liveCount } from '../data';

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="work-head">
        <div className="section-heading reveal">
          <p className="eyebrow">Featured Work</p>
          <h2>Deployed applications and software solutions engineered to eliminate friction and drive business efficiency.</h2>
          <p className="work-meta">
            {featuredWork.length} systems · {liveCount} live · {BUILDS.length} other builds
          </p>
        </div>
        <nav className="work-index reveal" aria-label="Featured projects">
          <p>Index</p>
          {featuredWork.map((w, i) => (
            <a href={`#work-${i + 1}`} key={w.name}>
              <span className="work-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-index-name">{w.name}</span>
              <span className={w.url ? 'work-status' : 'work-status is-private'}>{w.url ? 'Live' : 'Private'}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="work-featured">
        {featuredWork.map((w, i) => {
          const n = String(i + 1).padStart(2, '0');
          const host = w.url && new URL(w.url).host;
          return (
            <article className="work-item reveal" id={`work-${i + 1}`} key={w.name}>
              <p className="work-sheet">
                <span>Sheet {n} / {String(featuredWork.length).padStart(2, '0')} — {w.kind}</span>
                <span className={w.url ? 'work-status' : 'work-status is-private'}>{w.url ? 'Live' : 'Private build'}</span>
              </p>
              <div className="work-row">
                <figure className="work-fig">
                  <div className="work-frame">
                    <a
                      className="work-shot"
                      href={w.url || undefined}
                      target={w.url ? '_blank' : undefined}
                      rel={w.url ? 'noreferrer' : undefined}
                      tabIndex={w.url ? undefined : -1}
                    >
                      <span className="work-shot-bar" aria-hidden="true">
                        <i /><i /><i />
                        <span>{host || 'Private build'}</span>
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.image} alt={`${w.name} screenshot`} loading="lazy" decoding="async" />
                    </a>
                  </div>
                  <figcaption aria-hidden="true">Fig. {n} — 1440 × 900</figcaption>
                </figure>
                <div className="work-body">
                  <h3>{w.name}</h3>
                  <p>{w.text}</p>
                  <dl className="work-spec">
                    <dt>Domain</dt>
                    <dd>{w.kind}</dd>
                    <dt>Stack</dt>
                    <dd>{w.stack.join(' · ')}</dd>
                    <dt>Host</dt>
                    <dd className={host ? 'work-host' : undefined}>{host || 'Private deployment'}</dd>
                  </dl>
                  {w.url ? (
                    <a className="work-link" href={w.url} target="_blank" rel="noreferrer">
                      Open live app <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className="work-private">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      Private build · no public link
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <OtherBuilds />
    </section>
  );
}
