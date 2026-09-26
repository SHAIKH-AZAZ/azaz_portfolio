// Before → three steps → after. SVG draws the lanes; HTML holds nodes and text so both stay crisp.
const messy = [
  'M0,18 C60,18 70,60 120,40 S200,10 240,50 S285,70 300,70',
  'M0,52 C50,30 90,90 140,62 S210,95 250,72 S288,70 300,70',
  'M0,92 C40,120 100,60 150,100 S220,60 255,80 S290,70 300,70',
  'M0,124 C70,128 80,90 130,112 S200,130 245,92 S285,70 300,70',
];
const clean = [18, 52, 92, 124].map((y) => `M700,70 C780,70 800,${y} 880,${y} H1000`);

const columns = [
  { title: 'Manual, scattered work', text: 'Spreadsheets, copy-paste and decisions made by hand.' },
  { step: '1', title: 'Operational efficiency', text: 'Find the bottleneck and automate the manual tasks around it.' },
  { step: '2', title: 'Algorithmic precision', text: 'Custom optimization logic for logistics, allocation and cutting.' },
  { step: '3', title: 'Scalable architecture', text: 'Robust backends and resilient frontends that grow with the load.' },
  { title: 'Runs on its own', text: 'Fewer errors, and hours saved every week.' },
];

export default function AboutFlow() {
  return (
    <div className="about-flow">
      <div className="flow-graphic" aria-hidden="true">
        <svg viewBox="0 0 1000 140" preserveAspectRatio="none">
          {messy.map((d, i) => (
            <path key={i} id={`flow-in-${i}`} d={d} className="flow-line flow-line-in" />
          ))}
          <path id="flow-core" d="M300,70 H700" className="flow-line flow-line-core" />
          {clean.map((d, i) => (
            <path key={i} id={`flow-out-${i}`} d={d} className="flow-line flow-line-out" />
          ))}

          {messy.map((_, i) => (
            <circle key={i} r="3" className="flow-dot flow-dot-in">
              <animateMotion dur={`${5 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.6 0 0.4 1">
                <mpath href={`#flow-in-${i}`} />
              </animateMotion>
            </circle>
          ))}
          {[0, 1].map((i) => (
            <circle key={i} r="3.5" className="flow-dot flow-dot-core">
              <animateMotion dur="2.4s" begin={`${i * 1.2}s`} repeatCount="indefinite">
                <mpath href="#flow-core" />
              </animateMotion>
            </circle>
          ))}
          {clean.map((_, i) => (
            <circle key={i} r="3" className="flow-dot flow-dot-out">
              <animateMotion dur="1.4s" begin={`${i * 0.35}s`} repeatCount="indefinite">
                <mpath href={`#flow-out-${i}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>
        {['30%', '50%', '70%'].map((left, i) => (
          <span key={left} className="flow-node" style={{ left }}>{i + 1}</span>
        ))}
      </div>

      <ol className="flow-steps">
        {columns.map(({ step, title, text }) => (
          <li key={title} className={step ? 'is-step' : 'is-edge'}>
            <h3>{step && <span className="flow-step-num">{step}</span>}{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
