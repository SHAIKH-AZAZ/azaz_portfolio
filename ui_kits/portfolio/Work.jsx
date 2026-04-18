/* global React */
function ProjectVisual({ kind, accent, accentRgb }) {
  const soft = `rgba(${accentRgb},0.15)`;
  const softer = `rgba(${accentRgb},0.08)`;
  if (kind === 'pillars') {
    return (
      <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb}}>
        <div className="visual-pillars">
          <div className="pillar" /><div className="pillar pillar-tall" /><div className="pillar" style={{height:'8rem'}} />
        </div>
        <div className="visual-chip-row"><span /><span /><span /></div>
      </div>
    );
  }
  if (kind === 'cards') {
    return (
      <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb}}>
        <div className="visual-card-wide" />
        <div className="visual-row"><div className="visual-card" /><div className="visual-card" /></div>
      </div>
    );
  }
  if (kind === 'dashboard') {
    return (
      <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb}}>
        <div className="dashboard-grid">
          <div className="dash-panel dash-panel-wide" />
          <div className="dash-panel" /><div className="dash-panel" /><div className="dash-panel" />
        </div>
      </div>
    );
  }
  if (kind === 'bars') {
    return (
      <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb,display:'flex',flexDirection:'column',gap:'0.7rem',justifyContent:'center'}}>
        {[82,64,90,50,70].map((w,i)=>(
          <div key={i} style={{height:'0.65rem',borderRadius:'4px',width:w+'%',background:`linear-gradient(90deg,${accent},rgba(${accentRgb},0.35))`}}/>
        ))}
      </div>
    );
  }
  if (kind === 'rows') {
    return (
      <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb,display:'flex',flexDirection:'column',gap:'0.55rem',justifyContent:'center'}}>
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{height:'0.55rem',borderRadius:'4px',background:`rgba(${accentRgb},${0.2 - i*0.02})`}} />
        ))}
      </div>
    );
  }
  // hero
  return (
    <div className="visual-frame" style={{'--pa':accent,'--par':accentRgb,padding:0,overflow:'hidden'}}>
      <div style={{height:'55%',background:`linear-gradient(135deg,${soft},${softer})`,borderBottom:`1px solid rgba(${accentRgb},0.15)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'38%',height:'0.8rem',borderRadius:'4px',background:accent,opacity:.55}}/>
      </div>
      <div style={{padding:'0.7rem',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0.4rem'}}>
        <div style={{height:'1.7rem',background:'#fff',border:`1px solid rgba(${accentRgb},0.2)`,borderRadius:'6px'}}/>
        <div style={{height:'1.7rem',background:'#fff',border:`1px solid rgba(${accentRgb},0.2)`,borderRadius:'6px'}}/>
        <div style={{height:'1.7rem',background:'#fff',border:`1px solid rgba(${accentRgb},0.2)`,borderRadius:'6px'}}/>
      </div>
    </div>
  );
}

function ProjectType({ typeLink, typeLabel }) {
  if (typeLink) {
    return (
      <div className="project-type">
        <a className="project-link" href="#" onClick={e=>e.preventDefault()}>
          <span>{typeLink}</span>
          <svg viewBox="0 0 16 16" className="project-link-icon">
            <path d="M5 11 11 5" /><path d="M6 5h5v5" />
          </svg>
        </a>
      </div>
    );
  }
  return <span className="project-type">{typeLabel.split('\n').map((l,i)=>(<span key={i}>{l}<br/></span>))}</span>;
}

function ProjectCard({ project }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };
  const style = {
    '--project-accent': project.accent,
    '--project-accent-soft': `rgba(${project.accentRgb},0.12)`,
    '--project-accent-rgb': project.accentRgb,
  };
  return (
    <article ref={ref} className="project-card" style={style} onMouseMove={onMove}>
      <div className="project-header">
        <div>
          <span className="project-number">{project.number}</span>
          <h3>{project.title}</h3>
        </div>
        <ProjectType typeLink={project.typeLink} typeLabel={project.typeLabel} />
      </div>
      <div className="project-visual">
        <ProjectVisual kind={project.kind} accent={project.accent} accentRgb={project.accentRgb} />
      </div>
      <p>{project.description}</p>
      <div className="tag-list">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
    </article>
  );
}

function Work({ projects }) {
  return (
    <section className="section" id="work">
      <div className="section-heading">
        <p className="eyebrow">Featured Work</p>
        <h2>Deployed applications and software solutions engineered to eliminate friction and drive business efficiency.</h2>
      </div>
      <div className="project-grid">{projects.map(p => <ProjectCard key={p.number} project={p} />)}</div>
    </section>
  );
}
window.Work = Work;
window.ProjectCard = ProjectCard;
