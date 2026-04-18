/* global React */
function Services({ items }) {
  return (
    <section className="section" id="services">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>From core infrastructure to user-facing flows, I build technical solutions mapped to business objectives.</h2>
      </div>
      <div className="service-grid">
        {items.map(s => (
          <article className="service-card glass" key={s.title}>
            <h3>{s.title}</h3><p>{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Services = Services;

function Process({ steps }) {
  return (
    <section className="section" id="process">
      <div className="section-heading">
        <p className="eyebrow">Process</p>
        <h2>A structured technical methodology designed to de-risk projects and guarantee delivery.</h2>
      </div>
      <div className="process-grid">
        {steps.map(s => (
          <article className="process-card glass" key={s.number}>
            <span className="step-index">{s.number}</span>
            <h3>{s.title}</h3><p>{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Process = Process;

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact-panel">
        <p className="eyebrow">Contact</p>
        <h2>Looking to automate a process or build a reliable software product?</h2>
        <p>I partner with forward-thinking teams to engineer robust, high-performance web systems.</p>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:azazshaikh2703@gmail.com">Email Me</a>
          <a className="button button-secondary" href="#" onClick={e=>e.preventDefault()}>LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
window.Contact = Contact;

function Footer({ serviceLinks, portfolioLinks }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <a className="brand footer-brand" href="#top">
            <span className="brand-icon">AS</span>
            <span><span style={{color:'#6366f1'}}>Azaz</span>.dev</span>
          </a>
          <p className="footer-bio">Building production-ready software systems for growing teams, from concept to deployment.</p>
          <div className="footer-socials">
            <a href="#" onClick={e=>e.preventDefault()} aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
            <a href="#" onClick={e=>e.preventDefault()} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="mailto:azazshaikh2703@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
          </div>
        </div>
        <div className="footer-links-col">
          <h4>SERVICES</h4>
          <ul>{serviceLinks.map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
        </div>
        <div className="footer-links-col">
          <h4>PORTFOLIO</h4>
          <ul>{portfolioLinks.map(l => <li key={l}><a href="#work">{l}</a></li>)}</ul>
        </div>
        <div className="footer-contact-col">
          <h4>START A PROJECT</h4>
          <p className="contact-prompt">Ready to build something useful? Let&apos;s talk through the workflow, product, or platform you need.</p>
          <div className="footer-email-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            <a href="mailto:azazshaikh2703@gmail.com">Contact Us</a>
          </div>
          <a className="button footer-cta-btn" href="mailto:azazshaikh2703@gmail.com">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cta-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>Email Consult</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Azaz Shaikh. All rights reserved.</p>
        <p>Built with <span style={{color:'#ef4444'}}>❤</span> using Next.js &amp; CSS</p>
      </div>
    </footer>
  );
}
window.Footer = Footer;
