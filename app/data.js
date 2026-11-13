// Page content: edit projects and skills here; the page, sitemap and JSON-LD all read from it.
// Server-only by convention: client components get what they need as props.

export const skills = [
  {
    group: 'Frontend',
    tools: [['React', 'react.svg'], ['Next.js', 'nextjs.svg'], ['JavaScript', 'javascript.svg'], ['HTML5', 'html5.svg'], ['CSS', 'css3.svg'], ['Tailwind CSS', 'tailwindcss.svg']],
    practices: ['Motion UI'],
  },
  {
    group: 'Backend',
    tools: [['Node.js', 'nodejs.svg'], ['Express', 'express.svg'], ['Python', 'python.svg'], ['MongoDB', 'mongodb.svg']],
    practices: ['REST APIs', 'SQL', 'optimization algorithms'],
  },
  {
    group: 'DevOps & cloud',
    tools: [['Docker', 'docker.svg'], ['GitHub Actions', 'githubactions.svg'], ['AWS', 'aws.svg'], ['Linux', 'linux.webp'], ['Nginx', 'nginx.svg'], ['Vercel', 'vercel.svg']],
    practices: ['CI/CD pipelines'],
  },
  {
    group: 'Testing & tools',
    tools: [['Selenium', 'selenium.svg'], ['Cypress', 'cypress.svg'], ['Postman', 'postman.svg'], ['Git', 'git.svg'], ['GitHub', 'github.svg']],
    practices: ['Manual testing', 'test automation'],
  },
  {
    group: 'AI & Python',
    tools: [['LangChain', 'langchain.svg'], ['LangGraph', 'langgraph.svg'], ['Pandas', 'pandas.svg']],
    practices: ['OpenAI API', 'RAG systems', 'AI agents'],
  },
];

export const featuredWork = [
  {
    name: 'POC Waste Optimizer',
    kind: 'Industrial optimization',
    url: 'https://poc-waste-proper.vercel.app/',
    image: '/work/poc-waste.webp',
    text: 'Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.',
    stack: ['Next.js', 'Optimization algorithms', 'PostgreSQL'],
  },
  {
    name: 'Excel Cleaner Tool',
    kind: 'Data processing',
    url: 'https://excel-cleaner.azazshaikh.info/',
    image: '/work/excel-cleaner.webp',
    text: 'A web application that processes raw XLSX files, stripping out hidden macros, objects and messy formatting to output clean, structured data.',
    stack: ['Next.js', 'Regex', 'Data processing'],
  },
  {
    name: 'ShamGym',
    kind: 'Gym website',
    url: 'https://shamgym.vercel.app/',
    image: '/work/shamgym.webp',
    text: 'Website for a strength and conditioning gym, with classes, trainers, membership plans, a blog and free-trial booking.',
    stack: ['Next.js', 'Responsive UI'],
  },
  {
    name: 'Safe & Secure Security Service',
    kind: 'Security services website',
    url: 'https://www.safeandsecuresecurityservice.com/',
    image: '/work/safe-secure.webp',
    text: 'Website for a Gujarat security agency covering executive protection, event security and site guarding, with a scenario-led request form that carries into a full quote.',
    stack: ['Next.js', 'Quote forms', 'SEO'],
  },
  {
    name: 'FastShipment',
    kind: 'Logistics platform',
    image: '/work/fastshipment.webp',
    text: 'A logistics platform with ordering, secure checkout, real-time shipment tracking with dynamic editing, and partner management tools.',
    stack: ['Python', 'Checkout', 'Tracking'],
  },
];
export const services = [
  { name: 'Enterprise Applications', text: 'Internal tools, dashboards, and CRM extensions built to unify operations and data management.' },
  { name: 'Algorithm Development', text: 'Custom logic engineering for complex challenges, routing, scheduling, and resource optimization.' },
  { name: 'E-Commerce & Logistics', text: 'End-to-end checkout paths, shipping engines, and partner management portal integrations.' },
  { name: 'SaaS Architectures', text: 'Scalable software foundations with robust authentication, role-based access, and fast response times.' },
];

export const liveCount = featuredWork.filter((w) => w.url).length;

// Smaller builds without a live link or screenshot (rendered by OtherBuilds).
export const BUILDS = [
  { name: 'Nova Control', kind: 'Dashboard system', icon: 'dashboard', text: 'Data visualization dashboard with a modular component architecture.', stack: ['Architecture', 'Analytics'] },
  { name: 'Gym Flow Platform', kind: 'Web app', icon: 'app', text: 'Fitness tracking and gym management with custom routines and analytics.', stack: ['Next.js', 'Analytics'] },
  { name: 'Python Data Pipeline', kind: 'Python backend', icon: 'pipeline', text: 'ETL pipeline for automated ingestion, transformation and batch reporting.', stack: ['Python', 'Pandas', 'ETL'] },
  { name: 'LangChain RAG System', kind: 'AI assistant', icon: 'chat', text: 'Context-aware AI assistant grounded in a custom knowledge base.', stack: ['LangChain', 'OpenAI', 'VectorDB'] },
  { name: 'LangGraph AI Agent', kind: 'AI agent', icon: 'graph', text: 'Stateful multi-step agent with tool use, branching and memory.', stack: ['LangGraph', 'Python', 'LLM'] },
];
