/* global React */
function Hero({ metrics }) {
  return (
    <section className="section hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Business Automation / Full-Stack Systems / Interactive Product Design</p>
        <h1>
          <span className="title-line"><span className="title-word">Software that</span></span>
          <span className="title-line"><span className="title-word">removes friction</span></span>
          <span className="title-line"><span className="title-word">and helps teams</span></span>
          <span className="title-line"><span className="title-word">move faster.</span></span>
        </h1>
        <p className="lead">
          I&apos;m Azaz Shaikh, a full-stack engineer building business-focused web products with strong systems thinking, polished interfaces, and automation that makes daily work easier.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">View Projects</a>
          <a className="button button-secondary" href="#contact">Start a Project</a>
        </div>
        <div className="hero-metrics">
          {metrics.map(m => (
            <article className="metric-card glass" key={m.label}>
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-stage" aria-hidden="true">
        <div className="halo" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="device-shell">
          <div className="window-chrome"><span /><span /><span /></div>
          <div className="device-content">
            <div className="preview-intro">
              <p className="mini-label">Live System</p>
              <h2>Operational Software</h2>
            </div>
            <div className="analytics-strip">
              <div><span>Workflows</span><strong>Automated</strong></div>
              <div><span>Backend</span><strong>Scalable</strong></div>
              <div><span>Data</span><strong>Actionable</strong></div>
            </div>
            <div className="preview-columns">
              <article className="preview-panel preview-panel-large">
                <span>Workflow Automation</span>
                <strong>Replacing repetitive work with dependable software systems and clear logic</strong>
                <div className="panel-chart" />
              </article>
              <div className="preview-stack">
                <article className="preview-panel">
                  <span>System Architecture</span>
                  <strong>Platforms designed to stay stable as usage, data, and teams grow</strong>
                </article>
                <article className="preview-panel preview-accent">
                  <span>Business Impact</span>
                  <strong>Interfaces and infrastructure mapped directly to operational goals</strong>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-tag tag-a">Business Solutions</div>
        <div className="floating-tag tag-b">Optimization Logic</div>
        <div className="floating-tag tag-c">Scalable Systems</div>
      </div>
    </section>
  );
}
window.Hero = Hero;
