/* global React */
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <section className="marquee-shell" aria-label="Core skills">
      <div className="marquee-track">
        {doubled.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </section>
  );
}
window.Marquee = Marquee;

function About({ insights, skillGroups }) {
  return (
    <section className="section" id="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>I engineer software solutions that eliminate inefficiencies, automate workflows, and drive business growth.</h2>
      </div>
      <div className="about-grid">
        <article className="about-card glass">
          <p className="about-intro">My work focuses on identifying real-world operational bottlenecks and engineering scalable software systems that solve them permanently.</p>
          <p>Combining deep data logic with resilient full-stack architectures, I build platforms that don&apos;t just look polished. They improve how organizations run, collaborate, and make decisions.</p>
        </article>
        <article className="insight-card glass">
          {insights.map(i => (
            <div className="insight-item" key={i.number}>
              <span>{i.number}</span>
              <div><h3>{i.title}</h3><p>{i.description}</p></div>
            </div>
          ))}
        </article>
      </div>
      <div className="skill-panel glass">
        {skillGroups.map(g => (
          <div className="skill-group" key={g.title}>
            <h3 className="skill-group-title">{g.title}</h3>
            <div className="skill-tags">{g.items.map(it => <span key={it}>{it}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.About = About;

function Experience({ items }) {
  return (
    <section className="section" id="experience">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>My professional journey and hands-on industry experience.</h2>
      </div>
      <div className="experience-list">
        {items.map(x => (
          <article className="experience-card glass" key={x.title}>
            <div className="exp-header">
              <h3>{x.title}</h3>
              <span className="exp-company">{x.company}</span>
            </div>
            <p>{x.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Experience = Experience;
