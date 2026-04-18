import InteractiveCanvas from "./components/InteractiveCanvas";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  FooterSection,
  HeroSection,
  MarqueeSection,
  ProcessSection,
  ServicesSection,
  WorkSection,
} from "./components/PortfolioSections";
import {
  experience,
  footerPortfolioLinks,
  footerServices,
  heroMetrics,
  insights,
  marqueeSkills,
  processSteps,
  projects,
  projectsSchema,
  services,
  skillGroups,
} from "./data/portfolio";

// Page-level metadata (supplements layout.js root metadata)
export const metadata = {
  title: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
  description:
    "Azaz Shaikh is a full-stack software engineer specialising in scalable web systems, business automation workflows, logistics algorithms, and data-driven platforms. Available for freelance and remote roles.",
  alternates: { canonical: "/" },
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
        <HeroSection metrics={heroMetrics} />
        <MarqueeSection items={marqueeSkills} />
        <AboutSection insights={insights} skillGroups={skillGroups} />
        <ExperienceSection items={experience} />
        <WorkSection projects={projects} />
        <ServicesSection items={services} />
        <ProcessSection steps={processSteps} />
        <ContactSection />
      </main>
      <FooterSection
        serviceLinks={footerServices}
        portfolioLinks={footerPortfolioLinks}
      />
    </>
  );
}
