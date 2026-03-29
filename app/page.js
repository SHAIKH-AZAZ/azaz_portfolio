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
                <span className="metric-label">Business operations optimized through code</span>
              </article>
              <article className="metric-card glass reveal">
                <span className="metric-value" data-counter="98" data-suffix="%">0</span>
                <span className="metric-label">Performance &amp; efficiency increase on core systems</span>
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
                  <p className="mini-label">Live System</p>
                  <h2>Enterprise Tools</h2>
                </div>
                <div className="analytics-strip">
                  <div><span>Workflows</span><strong>Automated</strong></div>
                  <div><span>Backend</span><strong>Scalable</strong></div>
                  <div><span>Data</span><strong>Optimized</strong></div>
                </div>
                <div className="preview-columns">
                  <article className="preview-panel preview-panel-large">
                    <span>Workflow Automation</span>
                    <strong>Replacing manual operations with intelligent logic</strong>
                    <div className="panel-chart" />
                  </article>
                  <div className="preview-stack">
                    <article className="preview-panel">
                      <span>System Architecture</span>
                      <strong>Tools designed to handle scale seamlessly</strong>
                    </article>
                    <article className="preview-panel preview-accent">
                      <span>Business Focused</span>
                      <strong>Performance-minded and revenue-driven</strong>
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

        {/* ── Marquee ── */}
        <section className="marquee-shell" aria-label="Core skills">
          <div className="marquee-track">
            {['Workflow Automation', 'Scalable Architecture', 'Logistics Algorithms', 'Business Solutions', 'Database Optimization', 'System Integration', 'Full-Stack Engineering',
              'Workflow Automation', 'Scalable Architecture', 'Logistics Algorithms', 'Business Solutions', 'Database Optimization', 'System Integration', 'Full-Stack Engineering'].map((s, i) => (
                <span key={i}>{s}</span>
              ))}
          </div>
        </section>

        {/* ── About ── */}
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
                Combining deep data logic with resilient full-stack architectures, I build platforms that don&apos;t just look professional—they fundamentally improve how organizations run.
              </p>
            </article>
            <article className="insight-card glass reveal">
              <div className="insight-item">
                <span>01</span>
                <div><h3>Operational Efficiency</h3><p>Building automated platforms that replace manual tasks and save hundreds of hours.</p></div>
              </div>
              <div className="insight-item">
                <span>02</span>
                <div><h3>Algorithmic Precision</h3><p>Designing custom optimization algorithms for logistics, resource allocation, and cutting.</p></div>
              </div>
              <div className="insight-item">
                <span>03</span>
                <div><h3>Scalable Architecture</h3><p>Developing robust backend systems and resilient frontends that grow seamlessly.</p></div>
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
            <h2>Deployed applications and software solutions engineered to eliminate friction and drive business efficiency.</h2>
          </div>
          <div className="project-grid">
            <article className="project-card reveal project-coral">
              <div className="project-header">
                <div>
                  <span className="project-number">01</span>
                  <h3>POC Waste Optimizer</h3>
                </div>
                <div className="project-type">
                  <a
                    className="project-link"
                    href="https://poc-waste-proper.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Live App</span>
                    <svg viewBox="0 0 16 16" className="project-link-icon">
                      <path d="M5 11 11 5" />
                      <path d="M6 5h5v5" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="visual-card-wide" />
                  <div className="visual-row">
                    <div className="visual-card" />
                    <div className="visual-card" />
                  </div>
                </div>
              </div>
              <p>Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.</p>
              <div className="tag-list">
                <span>Next.js</span><span>Optimization</span><span>PostgreSQL</span>
              </div>
            </article>

            <article className="project-card reveal project-cyan">
              <div className="project-header">
                <div>
                  <span className="project-number">02</span>
                  <h3>Excel Cleaner Tool</h3>
                </div>
                <div className="project-type">
                  <a
                    className="project-link"
                    href="https://excel-cleaner.azazshaikh.info/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Live App</span>
                    <svg viewBox="0 0 16 16" className="project-link-icon">
                      <path d="M5 11 11 5" />
                      <path d="M6 5h5v5" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="project-visual">
                <div className="visual-frame visual-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/excel-cleaner.png" alt="Excel Cleaner Tool UI" className="project-snapshot" decoding="async" loading="lazy" />
                </div>
              </div>
              <p>A specialized web application that processes raw XLSX files, automatically stripping out hidden macros, objects, and messy formatting to output clean, structured data arrays.</p>
              <div className="tag-list">
                <span>Next.js</span><span>Regex</span><span>Data Processing</span>
              </div>
            </article>

            <article className="project-card reveal project-lime">
              <div className="project-header">
                <div>
                  <span className="project-number">03</span>
                  <h3>Nova Control</h3>
                </div>
                <span className="project-type">Dashboard<br />System</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="dashboard-grid">
                    <div className="dash-panel dash-panel-wide" />
                    <div className="dash-panel" />
                    <div className="dash-panel" />
                    <div className="dash-panel" />
                  </div>
                </div>
              </div>
              <p>Futuristic data visualization platform with modular component architecture and streamlined information hierarchy.</p>
              <div className="tag-list">
                <span>Architecture</span><span>Analytics</span><span>Scalable</span>
              </div>
            </article>

            <article className="project-card reveal project-indigo">
              <div className="project-header">
                <div>
                  <span className="project-number">04</span>
                  <h3>FastShipment</h3>
                </div>
                <span className="project-type">Python<br />Backend</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame visual-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/fastshipment.png" alt="FastShipment Dashboard UI" className="project-snapshot" decoding="async" loading="lazy" />
                </div>
              </div>
              <p>A comprehensive logistics platform featuring seamless ordering, secure checkout, real-time shipment tracking with dynamic editing, and robust partner management tools.</p>
              <div className="tag-list">
                <span>Python</span><span>Checkout</span><span>Tracking</span>
              </div>
            </article>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="section" id="services">
          <div className="section-heading reveal">
            <p className="eyebrow">Services</p>
            <h2>From core infrastructure to user-facing flows, I build technical solutions mapped to business objectives.</h2>
          </div>
          <div className="service-grid">
            <article className="service-card glass reveal">
              <h3>Enterprise Applications</h3>
              <p>Internal tools, dashboards, and CRM extensions built to unify operations and data management.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>Algorithm Development</h3>
              <p>Custom logic engineering for complex challenges, routing, scheduling, and resource optimization.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>E-Commerce &amp; Logistics</h3>
              <p>End-to-end checkout paths, shipping engines, and partner management portal integrations.</p>
            </article>
            <article className="service-card glass reveal">
              <h3>SaaS Architectures</h3>
              <p>Scalable software foundations with robust authentication, role-based access, and fast response times.</p>
            </article>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section" id="process">
          <div className="section-heading reveal">
            <p className="eyebrow">Process</p>
            <h2>A structured technical methodology designed to de-risk projects and guarantee delivery.</h2>
          </div>
          <div className="process-grid">
            <article className="process-card glass reveal">
              <span className="step-index">01</span>
              <h3>Discovery &amp; Scope</h3>
              <p>Analyze business bottlenecks, map user journeys, and define a clear systems requirement document.</p>
            </article>
            <article className="process-card glass reveal">
              <span className="step-index">02</span>
              <h3>Architect &amp; Build</h3>
              <p>Construct scalable databases, wireframe the UI, and write the core algorithms efficiently.</p>
            </article>
            <article className="process-card glass reveal">
              <span className="step-index">03</span>
              <h3>Test &amp; Deploy</h3>
              <p>Rigorous QA automation, security validations, and seamless deployment to live production servers.</p>
            </article>
          </div>
        </section>

        {/* ── Contact ── */}
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
              <a className="button button-secondary" href="#top" style={{ flex: 'none', minWidth: 'auto', padding: '0.95rem 1.15rem' }}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 12V4m0 0l-3 3m3-3l3 3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a className="brand footer-brand" href="#top">
              <span className="brand-icon">AS</span>
              <span>Azaz</span>.dev
            </a>
            <p className="footer-bio">
              Building production-ready web systems for growing brands. From concept to deployment.
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
              <li><a href="#services">Business Websites</a></li>
              <li><a href="#services">Web Applications</a></li>
              <li><a href="#services">Local SEO &amp; Speed</a></li>
              <li><a href="#services">UI / UX Implementations</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>PORTFOLIO</h4>
            <ul>
              <li><a href="https://poc-waste-proper.vercel.app/" target="_blank" rel="noreferrer">POC Waste Optimizer</a></li>
              <li><a href="https://excel-cleaner-one.vercel.app/" target="_blank" rel="noreferrer">Excel Cleaner Tool</a></li>
              <li><a href="#work">Nova Control</a></li>
              <li><a href="#work">FastShipment</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>START A PROJECT</h4>
            <p className="contact-prompt">Ready to build something great? Let&apos;s talk about your vision.</p>
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
          <p className="credit">Built with <span style={{ color: '#ef4444', margin: '0 0.1rem' }}>❤</span> using Next.js &amp; CSS</p>
        </div>
      </footer>
    </>
  );
}
