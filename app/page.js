import InteractiveCanvas from './components/InteractiveCanvas';
import SitePreview from './components/SitePreview';
import HeroScraperAnimation from './components/HeroScraperAnimation';
import TypewriterText from './components/TypewriterText';
import CodeTerminalDemo from './components/CodeTerminalDemo';
import ScrambleText from './components/ScrambleText';
import ProjectShowcaseReveal from './components/ProjectShowcaseReveal';
import ProjectCardPixelCanvas from './components/ProjectCardPixelCanvas';


// Page-level metadata (supplements layout.js root metadata)
export const metadata = {
  title: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
  description:
    "Azaz Shaikh is a full-stack software engineer specialising in scalable web systems, business automation workflows, logistics algorithms, and data-driven platforms. Available for freelance and remote roles.",
  alternates: { canonical: "/" },
};

// Projects ItemList schema for rich Google results
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Azaz Shaikh",
  description: "Deployed applications and software solutions by Azaz Shaikh",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "POC Waste Optimizer",
        url: "https://poc-waste-proper.vercel.app/",
        applicationCategory: "BusinessApplication",
        description:
          "Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "Excel Cleaner Tool",
        url: "https://excel-cleaner.azazshaikh.info/",
        applicationCategory: "UtilitiesApplication",
        description:
          "Web application that processes XLSX files, stripping hidden macros, objects, and messy formatting to output clean structured data.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareApplication",
        name: "FastShipment",
        applicationCategory: "BusinessApplication",
        description:
          "Comprehensive logistics platform with ordering, secure checkout, real-time shipment tracking, and partner management tools.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "Gym Flow Platform",
        applicationCategory: "HealthApplication",
        description:
          "Comprehensive fitness tracking and gym management platform with customized workout routines and analytics.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "Python Data Pipeline",
        applicationCategory: "DeveloperApplication",
        description:
          "High-performance Python data pipeline for ETL workflows, automated reporting, and batch processing of large-scale structured datasets.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "LangChain RAG System",
        applicationCategory: "DeveloperApplication",
        description:
          "Retrieval-Augmented Generation system using LangChain and vector databases to build context-aware AI assistants grounded in custom knowledge bases.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "SoftwareApplication",
        name: "LangGraph AI Agent",
        applicationCategory: "DeveloperApplication",
        description:
          "Stateful multi-step AI agent orchestration built on LangGraph, capable of tool use, conditional branching, and autonomous task completion.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Projects JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema).replace(/</g, "\\u003c"),
        }}
      />
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
              <span className="title-line">
                <span className="title-word">
                  <TypewriterText phrases={['feel alive', 'are built to scale', 'automate operations', 'convert visitors']} />
                </span>
              </span>
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
                <ScrambleText className="metric-value" text="1+" />
                <span className="metric-label">Year of full-stack engineering experience</span>
              </article>
              <article className="metric-card glass reveal">
                <ScrambleText className="metric-value" text="15+" delay={120} />
                <span className="metric-label">Business operations optimized through code</span>
              </article>
              <article className="metric-card glass reveal">
                <ScrambleText className="metric-value" text="98%" delay={240} />
                <span className="metric-label">Performance &amp; efficiency increase on core systems</span>
              </article>
            </div>
          </div>

          <div className="hero-stage reveal" aria-hidden="true">
            <div className="halo" />
            <div className="orb orb-a" data-parallax="0.16" />
            <div className="orb orb-b" data-parallax="-0.1" />
            <div className="orb orb-c" data-parallax="0.08" />

            <HeroScraperAnimation />

            <div className="floating-tag tag-a">Business Solutions</div>
            <div className="floating-tag tag-b">Optimization Logic</div>
            <div className="floating-tag tag-c">Scalable Systems</div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <section className="marquee-shell" aria-label="Core skills">
          <div className="marquee-track">
            {['Workflow Automation', 'Scalable Architecture', 'Logistics Algorithms', 'Business Solutions', 'LangChain & LangGraph', 'AI Agents', 'Python Automation', 'Database Optimization', 'System Integration', 'Full-Stack Engineering',
              'Workflow Automation', 'Scalable Architecture', 'Logistics Algorithms', 'Business Solutions', 'LangChain & LangGraph', 'AI Agents', 'Python Automation', 'Database Optimization', 'System Integration', 'Full-Stack Engineering'].map((s, i) => (
                <span key={i}>{s}</span>
              ))}
          </div>
        </section>

        {/* ── About ── */}
        <section className="section" id="about">
          <div className="section-heading section-heading-stable reveal">
            <p className="eyebrow">About</p>
            <h2>
              I engineer software solutions that{' '}
              <TypewriterText phrases={['eliminate inefficiencies', 'automate workflows', 'drive business growth', 'scale effortlessly']} />.
            </h2>
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
                <span>Python</span><span>MongoDB</span><span>SQL</span><span>Optimization Algorithms</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">QA &amp; Tools</h3>
              <div className="skill-tags">
                <span>Manual Testing</span><span>Test Automation</span><span>Selenium / Cypress</span>
                <span>Postman</span><span>Git / GitHub</span><span>Vercel</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">AI &amp; Python</h3>
              <div className="skill-tags">
                <span>LangChain</span><span>LangGraph</span><span>RAG Systems</span>
                <span>AI Agents</span><span>Pandas</span><span>OpenAI API</span>
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
                <h3>Full Stack IT Engineer</h3>
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
          <ProjectShowcaseReveal>
          <div className="project-grid">
            <article className="project-card reveal project-coral">
              <ProjectCardPixelCanvas />
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
                <div className="visual-frame visual-image-wrapper">
                  <SitePreview
                    url="https://poc-waste-proper.vercel.app/"
                    alt="POC Waste Optimizer live preview"
                  />
                </div>
              </div>
              <p>Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.</p>
              <div className="tag-list">
                <span>Next.js</span><span>Optimization</span><span>PostgreSQL</span>
              </div>
            </article>

            <article className="project-card reveal project-cyan">
              <ProjectCardPixelCanvas />
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
                  <SitePreview
                    url="https://excel-cleaner.azazshaikh.info/"
                    alt="Excel Cleaner Tool live preview"
                    fallbackSrc="/excel-cleaner.png"
                  />
                </div>
              </div>
              <p>A specialized web application that processes raw XLSX files, automatically stripping out hidden macros, objects, and messy formatting to output clean, structured data arrays.</p>
              <div className="tag-list">
                <span>Next.js</span><span>Regex</span><span>Data Processing</span>
              </div>
            </article>

            <article className="project-card reveal project-lime">
              <ProjectCardPixelCanvas />
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
                    <div className="dash-panel dash-panel-wide">
                      <div className="terminal-logs">
                        <div className="log-line text-accent">npm run dev</div>
                        <div className="log-line text-accent-2">✓ Compiled successfully</div>
                        <div className="log-line text-muted">Ready on port 3000</div>
                        <div className="log-line">API route /api/optimize ... 200 OK</div>
                      </div>
                    </div>
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
              <ProjectCardPixelCanvas />
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

            <article className="project-card reveal project-emerald">
              <ProjectCardPixelCanvas />
              <div className="project-header">
                <div>
                  <span className="project-number">05</span>
                  <h3>Gym Flow Platform</h3>
                </div>
                <span className="project-type">Web<br />App</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="dashboard-grid">
                    <div className="dash-panel dash-panel-wide" />
                    <div className="dash-panel" />
                  </div>
                </div>
              </div>
              <p>A comprehensive fitness tracking and gym management platform with customized workout routines and analytics.</p>
              <div className="tag-list">
                <span>Next.js</span><span>Fitness</span><span>Analytics</span>
              </div>
            </article>

            <article className="project-card reveal project-amber">
              <ProjectCardPixelCanvas />
              <div className="project-header">
                <div>
                  <span className="project-number">06</span>
                  <h3>Python Data Pipeline</h3>
                </div>
                <span className="project-type">Python<br />Backend</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="visual-pillars">
                    <div className="pillar" />
                    <div className="pillar pillar-tall" />
                    <div className="pillar" style={{ height: '8rem' }} />
                  </div>
                  <div className="visual-chip-row">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
              <p>High-performance ETL pipeline for automated data ingestion, transformation, and batch reporting across large-scale structured datasets.</p>
              <div className="tag-list">
                <span>Python</span><span>ETL</span><span>Automation</span><span>Pandas</span>
              </div>
            </article>

            <article className="project-card reveal project-violet">
              <ProjectCardPixelCanvas />
              <div className="project-header">
                <div>
                  <span className="project-number">07</span>
                  <h3>LangChain RAG System</h3>
                </div>
                <span className="project-type">AI<br />LLM</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="visual-card-wide">
                    <div className="rag-chat-sim">
                      <div className="chat-bubble user">Q: Optimize bar cutting stock?</div>
                      <div className="chat-bubble ai">A: Scanning DB... Waste reduced to 2%.</div>
                    </div>
                  </div>
                  <div className="visual-row">
                    <div className="visual-card" />
                    <div className="visual-card" />
                  </div>
                </div>
              </div>
              <p>Retrieval-Augmented Generation system using LangChain and vector databases to build context-aware AI assistants grounded in custom knowledge bases.</p>
              <div className="tag-list">
                <span>LangChain</span><span>RAG</span><span>OpenAI</span><span>VectorDB</span>
              </div>
            </article>

            <article className="project-card reveal project-rose">
              <ProjectCardPixelCanvas />
              <div className="project-header">
                <div>
                  <span className="project-number">08</span>
                  <h3>LangGraph AI Agent</h3>
                </div>
                <span className="project-type">AI<br />Agents</span>
              </div>
              <div className="project-visual">
                <div className="visual-frame">
                  <div className="dashboard-grid">
                    <div className="dash-panel dash-panel-wide">
                      <div className="agent-state-container">
                        <div className="agent-nodes-row">
                          <div className="agent-node-sim node-a">Research</div>
                          <span className="agent-arrow-sim">➔</span>
                          <div className="agent-node-sim node-b">Reason</div>
                          <span className="agent-arrow-sim">➔</span>
                          <div className="agent-node-sim node-c">Execute</div>
                        </div>
                      </div>
                    </div>
                    <div className="dash-panel" />
                    <div className="dash-panel" />
                  </div>
                </div>
              </div>
              <p>Stateful multi-step AI agent built on LangGraph — capable of tool use, conditional branching, memory, and autonomous multi-stage task completion.</p>
              <div className="tag-list">
                <span>LangGraph</span><span>Agents</span><span>Python</span><span>LLM</span>
              </div>
            </article>
          </div>
          </ProjectShowcaseReveal>
        </section>

        {/* ── Features: Integrations & Open Source ── */}
        <section className="section fc-features-section" id="features">
          <div className="section-heading reveal">
            <p className="eyebrow">Why Choose Me</p>
            <h2>Built for developers. Trusted by teams.</h2>
          </div>
          <div className="fc-features-grid reveal">

            {/* LEFT CARD: Integrations */}
            <article className="fc-feature-card">
              {/* cURL top bar */}
              <div className="fc-curl-bar">
                <span className="fc-curl-icon">{'{}'}</span>
                <span className="fc-curl-label">cURL</span>
                <div className="fc-curl-progress-track">
                  <div className="fc-curl-progress-fill" style={{ width: '75%' }} />
                  <span className="fc-curl-percent">75%</span>
                </div>
              </div>

              {/* Integration network diagram */}
              <div className="fc-integration-net" aria-hidden="true">
                <svg className="fc-net-svg" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connecting lines */}
                  <line x1="60" y1="100" x2="170" y2="100" stroke="rgba(250,93,25,0.25)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="170" y1="100" x2="280" y2="55" stroke="rgba(250,93,25,0.25)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="170" y1="100" x2="280" y2="145" stroke="rgba(160,122,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="60" y1="100" x2="120" y2="48" stroke="rgba(160,122,255,0.15)" strokeWidth="1" strokeDasharray="3 6" />
                  <line x1="60" y1="100" x2="115" y2="152" stroke="rgba(250,93,25,0.15)" strokeWidth="1" strokeDasharray="3 6" />
                </svg>

                {/* Left node (Craft) */}
                <div className="fc-net-node fc-net-node-left">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </div>

                {/* Center node (main hub – fire icon) */}
                <div className="fc-net-node fc-net-node-center">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--accent)"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-2.76 0-5-2.24-5-5 0-2.64 1.56-4.76 3.63-4.76 2.09 0 3.45 1.61 3.45 3.73 0 .18-.01.36-.04.53.9.77 1.46 1.91 1.46 3.18 0 .41-.06.81-.17 1.18C14.96 19.54 13.54 20 12 20z" /></svg>
                </div>

                {/* Top-right node */}
                <div className="fc-net-node fc-net-node-tr">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--accent)"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" /></svg>
                </div>

                {/* Bottom-right node */}
                <div className="fc-net-node fc-net-node-br">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" /></svg>
                </div>

                {/* Arrow between nodes */}
                <div className="fc-net-arrow">⟷</div>
              </div>

              <div className="fc-card-footer">
                <p className="fc-card-tag">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  Integrations
                </p>
                <h3 className="fc-card-title">Use well-known tools</h3>
                <p className="fc-card-desc">Already fully integrated with the greatest dev stacks and automation platforms available.</p>
              </div>
            </article>

            {/* RIGHT CARD: Open Source / GitHub */}
            <article className="fc-feature-card">
              {/* GitHub Repo Header */}
              <div className="fc-gh-header">
                <div className="fc-gh-repo-info">
                  <div className="fc-gh-logo">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                  </div>
                  <span className="fc-gh-repo-name">azazshaikh/<strong>portfolio</strong></span>
                  <span className="fc-gh-public-pill">Public</span>
                </div>
                <div className="fc-gh-star-btn">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1.5l1.88 3.82 4.2.61-3.04 2.97.72 4.2L8 11.02l-3.76 1.98.72-4.2L1.92 5.93l4.2-.61L8 1.5z" /></svg>
                  Star
                  <span className="fc-gh-star-count">2.1k</span>
                </div>
              </div>

              {/* PR List */}
              <div className="fc-pr-list">
                <div className="fc-pr-row">
                  <span className="fc-pr-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="4" cy="4" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="4" r="1.5" /><path d="M4 5.5v5M12 5.5v5M5.5 4h5" /></svg>
                  </span>
                  <div className="fc-pr-body">
                    <p className="fc-pr-title">[feat] added automated workflow engine</p>
                    <p className="fc-pr-meta">#42 · May 2025 · <span className="fc-pr-author">azazshaikh</span></p>
                  </div>
                </div>
                <div className="fc-pr-row">
                  <span className="fc-pr-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="4" cy="4" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="4" r="1.5" /><path d="M4 5.5v5M12 5.5v5M5.5 4h5" /></svg>
                  </span>
                  <div className="fc-pr-body">
                    <p className="fc-pr-title">(fix/perf) optimize RAG retrieval pipeline</p>
                    <p className="fc-pr-meta">#39 · Apr 2025 · <span className="fc-pr-author">azazshaikh</span></p>
                  </div>
                </div>
                <div className="fc-pr-row fc-pr-row-muted">
                  <span className="fc-pr-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="4" cy="4" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="4" r="1.5" /><path d="M4 5.5v5M12 5.5v5M5.5 4h5" /></svg>
                  </span>
                  <div className="fc-pr-body">
                    <p className="fc-pr-title">[fix/api] kwargs params validation</p>
                    <p className="fc-pr-meta">#37 · Apr 2025</p>
                  </div>
                </div>
              </div>

              {/* Avatar stack */}
              <div className="fc-avatar-stack">
                <span className="fc-avatar fc-av-1">AZ</span>
                <span className="fc-avatar fc-av-2">MK</span>
                <span className="fc-avatar fc-av-3">SR</span>
                <span className="fc-avatar-more">+12</span>
              </div>

              <div className="fc-card-footer">
                <p className="fc-card-tag">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                  Open Source
                </p>
                <h3 className="fc-card-title">Code you can trust</h3>
                <p className="fc-card-desc">Developed transparently and collaboratively. Every commit tells a story of precision and care.</p>
              </div>
            </article>

          </div>
        </section>

        {/* ── Code Terminal Demo ── */}
        <section className="section" id="integration">
          <div className="section-heading reveal">
            <p className="eyebrow">Portfolio Console</p>
            <h2>Explore the systems I build.</h2>
          </div>
          <div className="reveal">
            <CodeTerminalDemo />
          </div>
        </section>

        {/* ── Services ── */}

        <section className="section" id="services">
          <div className="section-heading section-heading-stable section-heading-services-stable reveal">
            <p className="eyebrow">Services</p>
            <h2>
              From core infrastructure to user-facing flows, I build technical solutions mapped to{' '}
              <TypewriterText phrases={['business growth', 'operational efficiency', 'faster workflows', 'market success']} />.
            </h2>
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
            <h2>
              Looking to{' '}
              <TypewriterText phrases={['automate a process', 'build a reliable software product ?', 'scale your operations ?', 'optimize your backend ?']} />
            </h2>
            <p>I partner with forward-thinking teams to engineer robust, high-performance web systems.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:[EMAIL_ADDRESS]">Email Me</a>
              <a
                className="button button-secondary"
                href="https://www.linkedin.com/in/mohammadazaz-shaikh-421937322"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="button button-secondary" href="#top" style={{ flex: 'none', minWidth: 'auto', padding: '0.95rem 1.15rem' }}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <li><a href="#work">FastShipment</a></li>
              <li><a href="#work">Gym Flow Platform</a></li>
              <li><a href="#work">Python Data Pipeline</a></li>
              <li><a href="#work">LangChain RAG System</a></li>
              <li><a href="#work">LangGraph AI Agent</a></li>
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
