// How a project moves from brief to production. Step names and texts mirror the
// HowTo schema in layout.js, so keep them in sync.
const STEPS = [
  {
    title: 'Discovery & Scope',
    text: 'Analyze business bottlenecks, map user journeys, and define a clear systems requirement document.',
    output: 'A written requirements document',
  },
  {
    title: 'Architect & Build',
    text: 'Construct scalable databases, wireframe the UI, and write the core algorithms efficiently.',
    output: 'Database, UI and core logic, built',
  },
  {
    title: 'Test & Deploy',
    text: 'Rigorous QA automation, security validations, and seamless deployment to live production servers.',
    output: 'A tested app, live in production',
  },
];

export default function DeliveryPipeline() {
  return (
    <ol className="dp">
      {STEPS.map((step, i) => (
        <li className="dp-step" key={step.title}>
          <span className="dp-node" aria-hidden="true">{i + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <p className="dp-output">
            <span>You get</span>
            {step.output}
          </p>
        </li>
      ))}
      <li className="dp-step dp-live">
        <span className="dp-node" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3>Live system</h3>
        <p>Deployed and running for your team.</p>
      </li>
    </ol>
  );
}
