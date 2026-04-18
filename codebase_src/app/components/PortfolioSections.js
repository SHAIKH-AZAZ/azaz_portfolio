import SitePreview from "./SitePreview";

function ProjectVisual({ preview, title }) {
  if (preview.kind === "site") {
    return (
      <div className="visual-frame visual-image-wrapper">
        <SitePreview
          url={preview.url}
          alt={preview.alt}
          fallbackSrc={preview.fallbackSrc}
        />
      </div>
    );
  }

  if (preview.kind === "image") {
    return (
      <div className="visual-frame visual-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.src}
          alt={preview.alt || title}
          className="project-snapshot"
          decoding="async"
          loading="lazy"
        />
      </div>
    );
  }

  if (preview.kind === "pillars") {
    return (
      <div className="visual-frame">
        <div className="visual-pillars">
          <div className="pillar" />
          <div className="pillar pillar-tall" />
          <div className="pillar" style={{ height: "8rem" }} />
        </div>
        <div className="visual-chip-row">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (preview.kind === "cards") {
    return (
      <div className="visual-frame">
        <div className="visual-card-wide" />
        <div className="visual-row">
          <div className="visual-card" />
          <div className="visual-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="visual-frame">
      <div className="dashboard-grid">
        <div className="dash-panel dash-panel-wide" />
        <div className="dash-panel" />
        <div className="dash-panel" />
        {preview.variant !== "compact" && <div className="dash-panel" />}
      </div>
    </div>
  );
}

function ProjectType({ typeLink, typeLabel }) {
  if (typeLink) {
    return (
      <div className="project-type">
        <a
          className="project-link"
          href={typeLink.href}
          target="_blank"
          rel="noreferrer"
        >
          <span>{typeLink.label}</span>
          <svg viewBox="0 0 16 16" className="project-link-icon">
            <path d="M5 11 11 5" />
            <path d="M6 5h5v5" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <span className="project-type">
      {typeLabel.split("\n").map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
    </span>
  );
}

export function HeroSection({ metrics }) {
  return (
    <section className="section hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">Business Automation / Full-Stack Systems / Interactive Product Design</p>
        <h1>
          <span className="title-line"><span className="title-word">Software that</span></span>
          <span className="title-line"><span className="title-word">removes friction</span></span>
          <span className="title-line"><span className="title-word">and helps teams</span></span>
          <span className="title-line"><span className="title-word">move faster.</span></span>
        </h1>
        <p className="lead">
          I&apos;m Azaz Shaikh, a full-stack engineer building business-focused web products with
          strong systems thinking, polished interfaces, and automation that makes daily work easier.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">View Projects</a>
          <a className="button button-secondary" href="#contact">Start a Project</a>
        </div>
        <div className="hero-metrics">
          {metrics.map((metric) => (
            <article className="metric-card glass reveal" key={metric.label}>
              <span
                className="metric-value"
                data-counter={metric.value}
                data-suffix={metric.suffix}
              >
                0
              </span>
              <span className="metric-label">{metric.label}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-stage reveal" aria-hidden="true">
        <div className="halo" />
        <div className="orb orb-a" data-parallax="0.16" />
        <div className="orb orb-b" data-parallax="-0.1" />
        <div className="orb orb-c" data-parallax="0.08" />

        <div className="device-shell" data-tilt>
          <div className="window-chrome">
            <span /><span /><span />
          </div>
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

export function MarqueeSection({ items }) {
  return (
    <section className="marquee-shell" aria-label="Core skills">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({ insights, skillGroups }) {
  return (
    <section className="section" id="about">
      <div className="section-heading reveal">
        <p className="eyebrow">About</p>
        <h2>I engineer software solutions that eliminate inefficiencies, automate workflows, and drive business growth.</h2>
      </div>
      <div className="about-grid">
        <article className="about-card glass reveal">
          <p className="about-intro">
            My work focuses on identifying real-world operational bottlenecks and engineering scalable software systems that solve them permanently.
          </p>
          <p>
            Combining deep data logic with resilient full-stack architectures, I build platforms that don&apos;t just look polished. They improve how organizations run, collaborate, and make decisions.
          </p>
        </article>
        <article className="insight-card glass reveal">
          {insights.map((insight) => (
            <div className="insight-item" key={insight.number}>
              <span>{insight.number}</span>
              <div>
                <h3>{insight.title}</h3>
                <p>{insight.description}</p>
              </div>
            </div>
          ))}
        </article>
      </div>
      <div className="skill-panel glass reveal">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3 className="skill-group-title">{group.title}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection({ items }) {
  return (
    <section className="section" id="experience">
      <div className="section-heading reveal">
        <p className="eyebrow">Experience</p>
        <h2>My professional journey and hands-on industry experience.</h2>
      </div>
      <div className="experience-list">
        {items.map((item) => (
          <article className="experience-card glass reveal" key={`${item.title}-${item.company}`}>
            <div className="exp-header">
              <h3>{item.title}</h3>
              <span className="exp-company">{item.company}</span>
            </div>
            <p>
              {item.link ? (
                <>
                  {item.descriptionBefore}
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "var(--accent)",
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      fontWeight: 700,
                    }}
                  >
                    {item.link.label}
                  </a>
                  {item.descriptionAfter}
                </>
              ) : item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WorkSection({ projects }) {
  return (
    <section className="section" id="work">
      <div className="section-heading reveal">
        <p className="eyebrow">Featured Work</p>
        <h2>Deployed applications and software solutions engineered to eliminate friction and drive business efficiency.</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project-card reveal ${project.accentClass}`} key={project.number}>
            <div className="project-header">
              <div>
                <span className="project-number">{project.number}</span>
                <h3>{project.title}</h3>
              </div>
              <ProjectType typeLink={project.typeLink} typeLabel={project.typeLabel} />
            </div>
            <div className="project-visual">
              <ProjectVisual preview={project.preview} title={project.title} />
            </div>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ items }) {
  return (
    <section className="section" id="services">
      <div className="section-heading reveal">
        <p className="eyebrow">Services</p>
        <h2>From core infrastructure to user-facing flows, I build technical solutions mapped to business objectives.</h2>
      </div>
      <div className="service-grid">
        {items.map((item) => (
          <article className="service-card glass reveal" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection({ steps }) {
  return (
    <section className="section" id="process">
      <div className="section-heading reveal">
        <p className="eyebrow">Process</p>
        <h2>A structured technical methodology designed to de-risk projects and guarantee delivery.</h2>
      </div>
      <div className="process-grid">
        {steps.map((step) => (
          <article className="process-card glass reveal" key={step.number}>
            <span className="step-index">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="contact-panel reveal">
        <p className="eyebrow">Contact</p>
        <h2>Looking to automate a process or build a reliable software product?</h2>
        <p>I partner with forward-thinking teams to engineer robust, high-performance web systems.</p>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:azazshaikh2703@gmail.com">Email Me</a>
          <a
            className="button button-secondary"
            href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="button button-secondary" href="#top" style={{ flex: "none", minWidth: "auto", padding: "0.95rem 1.15rem" }}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12V4m0 0l-3 3m3-3l3 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FooterSection({ serviceLinks, portfolioLinks }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <a className="brand footer-brand" href="#top">
            <span className="brand-icon">AS</span>
            <span>Azaz</span>.dev
          </a>
          <p className="footer-bio">
            Building production-ready software systems for growing teams, from concept to deployment.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/SHAIKH-AZAZ/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="mailto:azazshaikh2703@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>SERVICES</h4>
          <ul>
            {serviceLinks.map((service) => (
              <li key={service}><a href="#services">{service}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>PORTFOLIO</h4>
          <ul>
            {portfolioLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4>START A PROJECT</h4>
          <p className="contact-prompt">Ready to build something useful? Let&apos;s talk through the workflow, product, or platform you need.</p>
          <div className="footer-email-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            <a href="mailto:azazshaikh2703@gmail.com">Contact Us</a>
          </div>
          <a className="button footer-cta-btn" href="mailto:azazshaikh2703@gmail.com">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>Email Consult</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Azaz Shaikh. All rights reserved.</p>
        <p className="credit">Built with <span style={{ color: "#ef4444", margin: "0 0.1rem" }}>❤</span> using Next.js &amp; CSS</p>
      </div>
    </footer>
  );
}
