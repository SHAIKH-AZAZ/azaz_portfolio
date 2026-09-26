// Smaller builds without a live link or screenshot: one row each, with a category icon
// and a stack that reuses the skill logos where one exists.
export const BUILDS = [
  { name: 'Nova Control', kind: 'Dashboard system', icon: 'dashboard', text: 'Data visualization dashboard with a modular component architecture.', stack: ['Architecture', 'Analytics'] },
  { name: 'Gym Flow Platform', kind: 'Web app', icon: 'app', text: 'Fitness tracking and gym management with custom routines and analytics.', stack: ['Next.js', 'Analytics'] },
  { name: 'Python Data Pipeline', kind: 'Python backend', icon: 'pipeline', text: 'ETL pipeline for automated ingestion, transformation and batch reporting.', stack: ['Python', 'Pandas', 'ETL'] },
  { name: 'LangChain RAG System', kind: 'AI assistant', icon: 'chat', text: 'Context-aware AI assistant grounded in a custom knowledge base.', stack: ['LangChain', 'OpenAI', 'VectorDB'] },
  { name: 'LangGraph AI Agent', kind: 'AI agent', icon: 'graph', text: 'Stateful multi-step agent with tool use, branching and memory.', stack: ['LangGraph', 'Python', 'LLM'] },
];

const LOGOS = {
  'Next.js': 'nextjs.svg',
  Python: 'python.svg',
  Pandas: 'pandas.svg',
  LangChain: 'langchain.svg',
  LangGraph: 'langgraph.svg',
};

const ICONS = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  app: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  pipeline: <><rect x="2" y="9" width="5" height="6" rx="1" /><rect x="17" y="9" width="5" height="6" rx="1" /><path d="M7 12h10M13 9l3 3-3 3" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M9 11h6M9 14h4" /></>,
  graph: <><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="6" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M7.3 11 16.7 7M7.3 13l9.4 4" /></>,
};

export default function OtherBuilds() {
  return (
    <div className="work-more reveal">
      <h3>Other builds</h3>
      <ul>
        {BUILDS.map((b) => (
          <li key={b.name}>
            <span className="work-more-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[b.icon]}
              </svg>
            </span>
            <span className="work-more-title">
              <span className="work-more-name">{b.name}</span>
              <span className="work-more-kind">{b.kind}</span>
            </span>
            <span className="work-more-text">{b.text}</span>
            <span className="work-more-stack">
              {b.stack.map((tool) => (
                <span className="work-more-chip" key={tool}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {LOGOS[tool] && <img src={`/logos/${LOGOS[tool]}`} alt="" width="14" height="14" loading="lazy" />}
                  {tool}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
