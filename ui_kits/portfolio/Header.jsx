/* global React */
function Header({ onNavClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const nav = ['About','Experience','Work','Services','Contact'];
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <a className="brand" href="#top" onClick={(e)=>{e.preventDefault();onNavClick('top');}}><span>Azaz</span> Shaikh</a>
        <nav className="nav">
          {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={(e)=>{e.preventDefault();onNavClick(n.toLowerCase());}}>{n}</a>)}
        </nav>
        <a className="header-cta" href="#contact" onClick={(e)=>{e.preventDefault();onNavClick('contact');}}>Let&apos;s Build</a>
      </div>
    </header>
  );
}
window.Header = Header;
