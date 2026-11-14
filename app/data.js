// Page content: edit projects and skills here; the page, sitemap and JSON-LD all read from it.
// Server-only by convention: client components get what they need as props.

// tools: [name, logo file in /public/logos, 'dark' if the logo is mostly black and needs
// inverting on dark surfaces]
export const skills = [
  {
    group: 'Frontend',
    tools: [['React', 'react.svg'], ['Next.js', 'nextjs.svg', 'dark'], ['JavaScript', 'javascript.svg'], ['HTML5', 'html5.svg'], ['CSS', 'css3.svg'], ['Tailwind CSS', 'tailwindcss.svg']],
    practices: ['Motion UI'],
  },
  {
    group: 'Backend',
    tools: [['Node.js', 'nodejs.svg'], ['Express', 'express.svg', 'dark'], ['Python', 'python.svg'], ['MongoDB', 'mongodb.svg']],
    practices: ['REST APIs', 'SQL', 'optimization algorithms'],
  },
  {
    group: 'DevOps & cloud',
    tools: [['Docker', 'docker.svg'], ['GitHub Actions', 'githubactions.svg'], ['AWS', 'aws.svg', 'dark'], ['Linux', 'linux.webp', 'dark'], ['Nginx', 'nginx.svg'], ['Vercel', 'vercel.svg', 'dark']],
    practices: ['CI/CD pipelines'],
  },
  {
    group: 'Testing & tools',
    tools: [['Selenium', 'selenium.svg'], ['Cypress', 'cypress.svg', 'dark'], ['Postman', 'postman.svg'], ['Git', 'git.svg'], ['GitHub', 'github.svg', 'dark']],
    practices: ['Manual testing', 'test automation'],
  },
  {
    group: 'AI & Python',
    tools: [['LangChain', 'langchain.svg'], ['LangGraph', 'langgraph.svg'], ['Pandas', 'pandas.svg', 'dark']],
    practices: ['OpenAI API', 'RAG systems', 'AI agents'],
  },
];

// also linked from the Experience section
export const pocWaste = {
  name: 'POC Waste Optimizer',
  kind: 'Industrial optimization',
  url: 'https://poc-waste-proper.vercel.app/',
  image: '/work/poc-waste.webp',
  text: 'Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.',
  stack: ['Next.js', 'Optimization algorithms', 'PostgreSQL'],
};

export const featuredWork = [
  pocWaste,
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
// logo file for a tool name, from the skills list (shared by the other-builds chips and the integration card)
export const LOGOS = Object.fromEntries(skills.flatMap((g) => g.tools));

// accent lines are drawn in the accent colour and indented
// every tool in the skills list, in turn on the stack section's moving tile board
export const stackTools = skills.flatMap((g) => g.tools).map(([name, logo, tone]) => ({ name, logo, dark: tone === 'dark' }));

export const heroTitle = [
  { text: 'I turn manual' },
  { text: 'operations into' },
  { text: 'software that', accent: true },
  { text: 'runs itself.', accent: true },
];

export const heroMetrics = [
  { value: '1+', label: 'Year of full-stack engineering experience' },
  { value: '15+', label: 'Business operations optimized through code' },
  { value: '98%', label: 'Performance & efficiency increase on core systems' },
];

export const marquee = [
  'Workflow Automation', 'Scalable Architecture', 'Logistics Algorithms', 'Business Solutions', 'LangChain & LangGraph',
  'AI Agents', 'Python Automation', 'Database Optimization', 'System Integration', 'Full-Stack Engineering',
];

export const services = [
  { name: 'Enterprise Applications', text: 'Internal tools, dashboards, and CRM extensions built to unify operations and data management.' },
  { name: 'Algorithm Development', text: 'Custom logic engineering for complex challenges, routing, scheduling, and resource optimization.' },
  { name: 'E-Commerce & Logistics', text: 'End-to-end checkout paths, shipping engines, and partner management portal integrations.' },
  { name: 'SaaS Architectures', text: 'Scalable software foundations with robust authentication, role-based access, and fast response times.' },
];

// id of a featured project's sheet in the Work section (linked from its index and the footer)
export const workId = (i) => `work-${i + 1}`;

export const liveCount = featuredWork.filter((w) => w.url).length;

// Smaller builds without a live link or screenshot (rendered by OtherBuilds).
export const BUILDS = [
  { name: 'Nova Control', kind: 'Dashboard system', icon: 'dashboard', text: 'Data visualization dashboard with a modular component architecture.', stack: ['Architecture', 'Analytics'] },
  { name: 'Gym Flow Platform', kind: 'Web app', icon: 'app', text: 'Fitness tracking and gym management with custom routines and analytics.', stack: ['Next.js', 'Analytics'] },
  { name: 'Python Data Pipeline', kind: 'Python backend', icon: 'pipeline', text: 'ETL pipeline for automated ingestion, transformation and batch reporting.', stack: ['Python', 'Pandas', 'ETL'] },
  { name: 'LangChain RAG System', kind: 'AI assistant', icon: 'chat', text: 'Context-aware AI assistant grounded in a custom knowledge base.', stack: ['LangChain', 'OpenAI', 'VectorDB'] },
  { name: 'LangGraph AI Agent', kind: 'AI agent', icon: 'graph', text: 'Stateful multi-step agent with tool use, branching and memory.', stack: ['LangGraph', 'Python', 'LLM'] },
];
