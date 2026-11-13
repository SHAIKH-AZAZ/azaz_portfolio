import InteractiveCanvas from './components/InteractiveCanvas';
import HeroScraperAnimation from './components/HeroScraperAnimation';
import TypewriterText from './components/TypewriterText';
import IntegrationCard from './components/IntegrationCard';
import CodeTerminalDemo from './components/CodeTerminalDemo';
import ScrambleText from './components/ScrambleText';
import DeliveryPipeline from './components/DeliveryPipeline';
import Work from './components/Work';
import Footer from './components/Footer';
import StackOrbit from './components/StackOrbit';
import BusinessImpact from './components/BusinessImpact';
import IntroOverlay from './components/IntroOverlay';
import AboutFlow from './components/AboutFlow';
import Header from './components/Header';
import JsonLd from './components/JsonLd';
import { skills, services, featuredWork, BUILDS, liveCount } from './data';
import { BASE_URL, EMAIL, LINKEDIN } from './site';

// Page-level metadata (supplements layout.js root metadata)
export const metadata = {
  title: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
  description:
    "Azaz Shaikh is a full-stack software engineer specialising in scalable web systems, business automation workflows, logistics algorithms, and data-driven platforms. Available for freelance and remote roles.",
  alternates: { canonical: "/" },
};

// Structured data, generated from the same arrays the page renders so the two can't drift.
const person = { "@id": `${BASE_URL}/#person` };
const projects = [...featuredWork, ...BUILDS];

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Azaz Shaikh",
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.name,
      genre: p.kind,
      description: p.text,
      keywords: p.stack.join(", "),
      ...(p.url && { url: p.url }),
      author: person,
    },
  })),
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/#profilepage`,
  dateCreated: "2024-01-01T00:00:00.000Z",
  dateModified: new Date().toISOString(),
  url: BASE_URL,
  name: "Azaz Shaikh — Full-Stack Engineer Portfolio",
  inLanguage: "en-US",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  mainEntity: person,
};

// Top-right corner cutout for a service card, with a numbered chip sitting in it. One SVG draws
// both the cutout (page colour) and the border that follows its curve, so it needs no masking.
function Notch({ n }) {
  return (
    <span className="notch" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <path className="notch-fill" d="M0 0A16 16 0 0 1 16 16V32A16 16 0 0 0 32 48H48A16 16 0 0 1 64 64V0Z" />
        <path className="notch-line" d="M0 .5A15.5 15.5 0 0 1 15.5 16V32A16.5 16.5 0 0 0 32 48.5H48A15.5 15.5 0 0 1 63.5 64" />
      </svg>
      <i>{n}</i>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <JsonLd data={projectsSchema} />
      <script
        dangerouslySetInnerHTML={{
          __html: "try{sessionStorage.getItem('intro-seen')!=='1'&&document.documentElement.classList.add('intro-play')}catch(e){}",
        }}
      />
      <IntroOverlay />
      <InteractiveCanvas />
      <div className="noise" aria-hidden="true" />

      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-track" />
        <div className="scroll-progress-thumb" />
      </div>

      <Header />

      <main id="top">
        {/* ── Hero ── */}
        <section className="section hero">
          <div className="hero-copy reveal">
            <p className="hero-status">
              <span className="hero-status-dot" aria-hidden="true" />
              Open to freelance and remote roles
            </p>
            <h1>
              <span className="title-line"><span className="title-word">I turn manual</span></span>
              <span className="title-line"><span className="title-word">operations into</span></span>
              <span className="title-line"><span className="title-word">software that</span></span>
              <span className="title-line"><span className="title-word">runs itself.</span></span>
            </h1>
            <p className="lead">
              I&apos;m Azaz Shaikh, a full-stack engineer. I build web apps and automation tools that
              replace spreadsheets and copy-paste, from steel cutting plans to live shipment tracking.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">View projects</a>
              <a className="button button-secondary" href="#contact">Start a project</a>
            </div>
            <div className="hero-metrics">
              <article className="metric-card reveal">
                <ScrambleText className="metric-value" text="1+" />
                <span className="metric-label">Year of full-stack engineering experience</span>
              </article>
              <article className="metric-card reveal">
                <ScrambleText className="metric-value" text="15+" delay={120} />
                <span className="metric-label">Business operations optimized through code</span>
              </article>
              <article className="metric-card reveal">
                <ScrambleText className="metric-value" text="98%" delay={240} />
                <span className="metric-label">Performance &amp; efficiency increase on core systems</span>
              </article>
            </div>
          </div>

          <div className="hero-stage reveal">
            <HeroScraperAnimation />
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

        {/* ── Stack orbit: tools and live work around the numbers ── */}
        <section className="section orbit-section" aria-label="Stack and results">
          <StackOrbit
            stats={[
              { value: featuredWork.length + BUILDS.length, label: 'Projects built' },
              { value: skills.reduce((n, g) => n + g.tools.length, 0), label: 'Tools in the stack' },
              { value: liveCount, label: 'Apps live' },
            ]}
            headline={<>The stack behind every<br /> system I ship</>}
          />
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
          <div className="about-lede reveal">
            <p className="about-intro">
              My work focuses on identifying real-world operational bottlenecks and engineering scalable software systems that solve them permanently.
            </p>
            <p>
              Combining deep data logic with resilient full-stack architectures, I build platforms that don&apos;t just look professional—they fundamentally improve how organizations run.
            </p>
          </div>
          <div className="about-card reveal">
            <AboutFlow />
          </div>
          <div className="skill-panel reveal">
            <dl className="skill-list">
              {skills.map(({ group, tools, practices }) => (
                <div className="skill-row" key={group}>
                  <dt>{group}</dt>
                  <dd>
                    <ul className="skill-tools">
                      {tools.map(([name, logo]) => (
                        <li key={name}>
                          <span className="skill-logo" aria-hidden="true">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/logos/${logo}`} alt="" width="20" height="20" loading="lazy" decoding="async" />
                          </span>
                          {name}
                        </li>
                      ))}
                    </ul>
                    {practices && <p className="skill-practices">{practices.join(', ')}</p>}
                  </dd>
                </div>
              ))}
            </dl>
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
                <a className="exp-link" href="https://poc-waste-proper.vercel.app/" target="_blank" rel="noreferrer">
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

        <Work />

        {/* ── Why Choose Me: automation run + measured outcomes ── */}
        <section className="section bi-section" id="features">
          <div className="section-heading reveal">
            <p className="eyebrow">Why Choose Me</p>
            <h2>Systems that pay for themselves.</h2>
          </div>
          <div className="reveal">
            <BusinessImpact />
          </div>
        </section>

        {/* ── How It Works / Workflow Diagram ── */}
        <section className="section" id="how-it-works">
          <div className="section-heading reveal">
            <p className="eyebrow">How It Works</p>
            <h2>A clear pipeline from your idea to a live, running system.</h2>
          </div>
          <div className="reveal">
            <DeliveryPipeline />
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
            <IntegrationCard />
            {services.map((sv, i) => (
              <article className="service-card glass reveal" key={sv.name}>
                <Notch n={String(i + 1).padStart(2, '0')} />
                <h3>{sv.name}</h3>
                <p>{sv.text}</p>
              </article>
            ))}
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
              <a className="button button-primary" href={`mailto:${EMAIL}`}>Email Me</a>
              <a
                className="button button-secondary"
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="button button-secondary button-icon" href="#top" aria-label="Back to top">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 12V4m0 0l-3 3m3-3l3 3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
