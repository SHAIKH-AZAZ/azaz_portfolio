import InteractiveCanvas from './components/InteractiveCanvas';

export default function Home() {
  return (
    <>
      <InteractiveCanvas />
      <div className="noise" aria-hidden="true" />
      <div className="page-blur blur-a" aria-hidden="true" />
      <div className="page-blur blur-b" aria-hidden="true" />

      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-track" />
        <div className="scroll-progress-thumb" />
      </div>

      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#top"><span>Azaz</span> Shaikh</a>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href="#contact">Let&apos;s Build</a>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="section hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Web Developer / Frontend Motion / Interactive UI</p>
            <h1>
              <span className="title-line"><span className="title-word">Websites that</span></span>
              <span className="title-line"><span className="title-word">feel alive</span></span>
              <span className="title-line"><span className="title-word">from the</span></span>
              <span className="title-line"><span className="title-word">first scroll.</span></span>
            </h1>
            <p className="lead">
              I&apos;m Azaz Shaikh, a web developer crafting immersive digital experiences with
              clean structure, strong visual systems, and motion that actually adds value.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">View Projects</a>
              <a className="button button-secondary" href="#contact">Start a Project</a>
            </div>
            <div className="hero-metrics">
              <article className="metric-card glass reveal">
                <span className="metric-value" data-counter="1" data-suffix="+">0</span>
                <span className="metric-label">Year of full-stack engineering experience</span>
              </article>
              <article className="metric-card glass reveal">
                <span className="metric-value" data-counter="15" data-suffix="+">0</span>
                <span className="metric-label">Real-world projects and robust applications built</span>
              </article>
              <article className="metric-card glass reveal">
                <span className="metric-value" data-counter="98" data-suffix="%">0</span>
                <span className="metric-label">Performance-focused approach on every build</span>
              </article>
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
                  <p className="mini-label">Live Build</p>
                  <h2>Azaz.dev</h2>
                </div>
                <div className="analytics-strip">
                  <div><span>UI Motion</span><strong>Layered</strong></div>
                  <div><span>Code Style</span><strong>Clean</strong></div>
                  <div><span>Experience</span><strong>Responsive</strong></div>
                </div>
                <div className="preview-columns">
                  <article className="preview-panel preview-panel-large">
                    <span>Hero Storytelling</span>
                    <strong>High-contrast layouts with animated content framing</strong>
                    <div className="panel-chart" />
                  </article>
                  <div className="preview-stack">
                    <article className="preview-panel">
                      <span>Component Flow</span>
                      <strong>Sections designed to guide attention naturally</strong>
                    </article>
                    <article className="preview-panel preview-accent">
                      <span>Launch Ready</span>
                      <strong>Performance-minded, polished, and easy to extend</strong>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-tag tag-a">Landing Pages</div>
            <div className="floating-tag tag-b">UI Motion</div>
            <div className="floating-tag tag-c">Frontend Systems</div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <section className="marquee-shell" aria-label="Core skills">
          <div className="marquee-track">
            {['Responsive Builds','Creative Frontend','Animation Systems','UI Development','Performance Focus','Modern CSS','JavaScript Interactions',
              'Responsive Builds','Creative Frontend','Animation Systems','UI Development','Performance Focus','Modern CSS','JavaScript Interactions'].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </section>

        {/* ── About ── */}
        <section className="section" id="about">
          <div className="section-heading reveal">
            <p className="eyebrow">About</p>
            <h2>I build websites that combine visual confidence, thoughtful motion, and solid frontend structure.</h2>
          </div>
          <div className="about-grid">
            <article className="about-card glass reveal">
              <p className="about-intro">
                My work focuses on making brands, products, and personal portfolios feel sharp and memorable
                without sacrificing usability or speed.
              </p>
              <p>
                I care about hierarchy, pacing, typography, and interaction details that make the interface feel
                intentionally crafted instead of assembled from a template.
              </p>
            </article>
            <article className="insight-card glass reveal">
              <div className="insight-item">
                <span>01</span>
                <div><h3>Visual Direction</h3><p>Bold composition, strong contrast, and polished responsive layouts.</p></div>
              </div>
              <div className="insight-item">
                <span>02</span>
                <div><h3>Interactive Detail</h3><p>Scroll reveals, hover feedback, parallax, and layered micro-motion.</p></div>
              </div>
              <div className="insight-item">
                <span>03</span>
                <div><h3>Production Mindset</h3><p>Readable code, scalable sections, and performance-aware implementation.</p></div>
              </div>
            </article>
          </div>
          <div className="skill-panel glass reveal">
            <div className="skill-group">
              <h3 className="skill-group-title">Frontend</h3>
              <div className="skill-tags">
                <span>React</span><span>Next.js</span><span>JavaScript (ES6+)</span>
                <span>HTML5 / CSS3</span><span>Tailwind CSS</span><span>Motion UI</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">Backend</h3>
              <div className="skill-tags">
                <span>Node.js</span><span>Express</span><span>REST APIs</span>
                <span>MongoDB</span><span>SQL</span><span>Optimization Algorithms</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">QA &amp; Tools</h3>
              <div className="skill-tags">
                <span>Manual Testing</span><span>Test Automation</span><span>Selenium / Cypress</span>
                <span>Postman</span><span>Git / GitHub</span><span>Vercel</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="section" id="experience">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>My professional journey and hands-on industry experience.</h2>
          </div>
          <div className="experience-list">
            <article className="experience-card glass reveal">
              <div className="exp-header">
                <h3>Full Stack IT Engineer Intern</h3>
                <span className="exp-company">Buniyadbyte</span>
              </div>
              <p>
                Developed and shipped{' '}
                <a href="https://poc-waste-proper.vercel.app/" target="_blank" rel="noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: 700 }}>
                  POC Waste ↗
                </a>
                , a high-performance Bar Cutting Optimization web application. Engineered custom cutting stock
                algorithms to minimize raw material waste and built a complete project management interface.
              </p>
            </article>
            <article className="experience-card glass reveal">
              <div className="exp-header">
                <h3>QA Manual and Automations Engineer Intern</h3>
                <span className="exp-company">Maxgen Web Technologies</span>
              </div>
              <p>
                Secured the quality and reliability of software products by executing comprehensive manual test
                cases and implementing automated testing scripts.
              </p>
            </article>
          </div>
        </section>

        {/* ── Work ── */}
        <section className="section" id="work">
          <div className="section-heading reveal">
            <p className="eyebrow">Featured Work</p>
            <h2>Concept-driven projects designed to show range across product, brand, and portfolio experiences.</h2>
          </div>
          <div className="project-grid">
            <article className="project-card glass reveal project-coral">
              <div className="project-header">
                <div><span className="project-number">01</span><h3>POC Waste Optimizer</h3></div>
                <span className="project-type">
                  <a href="https://poc-waste-proper.vercel.app/" target="_blank" rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Live App ↗</a>
                </span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="visual-card visual-card-wide" />
                  <div className="visual-row"><div className="visual-card" /><div className="visual-card" /></div>
                </div>
              </div>
              <p>A specialized industrial tool featuring advanced algorithms to optimize rebar cutting. Allows users to create projects, upload sheets, and mathematically minimize material waste.</p>
              <div className="tag-list"><span>Full Stack App</span><span>Algorithms</span><span>Data Processing</span></div>
            </article>

            <article className="project-card glass reveal project-cyan">
              <div className="project-header">
                <div><span className="project-number">02</span><h3>Pulse Studio</h3></div>
                <span className="project-type">Creative Brand Site</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="visual-pillars">
                    <div className="pillar" /><div className="pillar pillar-tall" /><div className="pillar" />
                  </div>
                  <div className="visual-chip-row"><span /><span /><span /></div>
                </div>
              </div>
              <p>A bold studio portfolio direction with strong typography, animated section entrances, and layered composition built for visual impact.</p>
              <div className="tag-list"><span>Brand Presence</span><span>Editorial Layout</span><span>High Contrast</span></div>
            </article>

            <article className="project-card glass reveal project-lime">
              <div className="project-header">
                <div><span className="project-number">03</span><h3>Nova Control</h3></div>
                <span className="project-type">Dashboard System</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="dashboard-grid">
                    <div className="dash-panel dash-panel-wide" />
                    <div className="dash-panel" /><div className="dash-panel" /><div className="dash-panel" />
                  </div>
                </div>
              </div>
              <p>A clean control panel concept focused on readable data framing, interaction clarity, and a sleek, futuristic visual language.</p>
              <div className="tag-list"><span>Dashboard UI</span><span>Data Layout</span><span>System Design</span></div>
            </article>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="section" id="services">
          <div className="section-heading reveal">
            <p className="eyebrow">Services</p>
            <h2>From first concept to final polish, the focus stays on clear messaging and a strong user experience.</h2>
          </div>
          <div className="service-grid">
            <article className="service-card glass reveal">
              <h3>Portfolio Websites</h3>
              <p>Personal brands and creative portfolios that feel premium, modern, and differentiated.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>Landing Pages</h3>
              <p>Marketing pages built to guide attention, communicate value, and convert effectively.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>Frontend Development</h3>
              <p>Responsive implementation with clean code structure and thoughtful animation behavior.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>UI Refinement</h3>
              <p>Sharper hierarchy, stronger layouts, and interaction polish for products that need more edge.</p>
            </article>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section" id="process">
          <div className="section-heading reveal">
            <p className="eyebrow">Process</p>
            <h2>The workflow is structured, but the outcome should feel fresh and visually confident.</h2>
          </div>
          <div className="process-grid">
            <article className="process-card glass reveal">
              <span className="step-index">01</span>
              <h3>Direction</h3>
              <p>Clarify audience, message, tone, and the visual energy the website needs to carry.</p>
            </article>
            <article className="process-card glass reveal">
              <span className="step-index">02</span>
              <h3>Build</h3>
              <p>Shape the layout, component rhythm, typography, and responsive behavior with precision.</p>
            </article>
            <article className="process-card glass reveal">
              <span className="step-index">03</span>
              <h3>Polish</h3>
              <p>Refine motion, pacing, contrast, and interactions so the site feels complete and intentional.</p>
            </article>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="section" id="contact">
          <div className="contact-panel reveal">
            <p className="eyebrow">Contact</p>
            <h2>Need a modern portfolio, product page, or motion-rich website that stands out?</h2>
            <p>I build digital experiences that look sharp, move smoothly, and stay clear on every screen size.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:hello@azaz-portfolio.dev">Email Me</a>
              <a className="button button-secondary" href="#top">Back to Top</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Azaz Shaikh</p>
        <span>Web Developer / HTML / CSS / JavaScript</span>
      </footer>
    </>
  );
}
