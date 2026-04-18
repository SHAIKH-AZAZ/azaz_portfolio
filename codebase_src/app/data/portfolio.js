export const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Azaz Shaikh",
  description: "Deployed applications and software solutions by Azaz Shaikh",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "POC Waste Optimizer",
        url: "https://poc-waste-proper.vercel.app/",
        applicationCategory: "BusinessApplication",
        description:
          "Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "Excel Cleaner Tool",
        url: "https://excel-cleaner.azazshaikh.info/",
        applicationCategory: "UtilitiesApplication",
        description:
          "Web application that processes XLSX files, stripping hidden macros, objects, and messy formatting to output clean structured data.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareApplication",
        name: "FastShipment",
        applicationCategory: "BusinessApplication",
        description:
          "Comprehensive logistics platform with ordering, secure checkout, real-time shipment tracking, and partner management tools.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "ShamGym",
        url: "https://shamgym.vercel.app/",
        applicationCategory: "HealthApplication",
        description:
          "Fitness-focused web experience for a gym brand with modern presentation, class discovery, and lead-generation oriented user flows.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "Safe & Security Service",
        url: "https://safe-secure-security.vercel.app/",
        applicationCategory: "BusinessApplication",
        description:
          "Security services website for executive protection, event coverage, and property guarding with clear service architecture and conversion-focused pages.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "LangChain RAG System",
        applicationCategory: "DeveloperApplication",
        description:
          "Retrieval-Augmented Generation system using LangChain and vector databases to build context-aware AI assistants grounded in custom knowledge bases.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "SoftwareApplication",
        name: "LangGraph AI Agent",
        applicationCategory: "DeveloperApplication",
        description:
          "Stateful multi-step AI agent orchestration built on LangGraph, capable of tool use, conditional branching, and autonomous task completion.",
        author: { "@type": "Person", name: "Azaz Shaikh" },
      },
    },
  ],
};

export const heroMetrics = [
  {
    value: 1,
    suffix: "+",
    label: "Year of full-stack engineering experience",
  },
  {
    value: 15,
    suffix: "+",
    label: "Business operations optimized through code",
  },
  {
    value: 98,
    suffix: "%",
    label: "Performance & efficiency increase on core systems",
  },
];

export const marqueeSkills = [
  "Workflow Automation",
  "Scalable Architecture",
  "Logistics Algorithms",
  "Business Solutions",
  "LangChain & LangGraph",
  "AI Agents",
  "Python Automation",
  "Database Optimization",
  "System Integration",
  "Full-Stack Engineering",
];

export const insights = [
  {
    number: "01",
    title: "Operational Efficiency",
    description:
      "Building automated platforms that replace manual tasks and save hundreds of hours.",
  },
  {
    number: "02",
    title: "Algorithmic Precision",
    description:
      "Designing custom optimization algorithms for logistics, resource allocation, and cutting.",
  },
  {
    number: "03",
    title: "Scalable Architecture",
    description:
      "Developing robust backend systems and resilient frontends that grow seamlessly.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "JavaScript (ES6+)",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "Motion UI",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "Python",
      "MongoDB",
      "SQL",
      "Optimization Algorithms",
    ],
  },
  {
    title: "QA & Tools",
    items: [
      "Manual Testing",
      "Test Automation",
      "Selenium / Cypress",
      "Postman",
      "Git / GitHub",
      "Vercel",
    ],
  },
  {
    title: "AI & Python",
    items: [
      "LangChain",
      "LangGraph",
      "RAG Systems",
      "AI Agents",
      "Pandas",
      "OpenAI API",
    ],
  },
];

export const experience = [
  {
    title: "Full Stack IT Engineer",
    company: "Buniyadbyte",
    descriptionBefore: "Developed and shipped ",
    descriptionAfter:
      ", a high-performance Bar Cutting Optimization web application. Engineered custom cutting stock algorithms to minimize raw material waste and built a complete project management interface.",
    link: {
      href: "https://poc-waste-proper.vercel.app/",
      label: "POC Waste ↗",
    },
  },
  {
    title: "QA Manual and Automations Engineer Intern",
    company: "Maxgen Web Technologies",
    description:
      "Secured the quality and reliability of software products by executing comprehensive manual test cases and implementing automated testing scripts.",
  },
];

export const projects = [
  {
    number: "01",
    title: "POC Waste Optimizer",
    accentClass: "project-coral",
    typeLink: {
      href: "https://poc-waste-proper.vercel.app/",
      label: "Live App",
    },
    preview: {
      kind: "site",
      url: "https://poc-waste-proper.vercel.app/",
      alt: "POC Waste Optimizer live preview",
    },
    description:
      "Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.",
    tags: ["Next.js", "Optimization", "PostgreSQL"],
  },
  {
    number: "02",
    title: "Excel Cleaner Tool",
    accentClass: "project-cyan",
    typeLink: {
      href: "https://excel-cleaner.azazshaikh.info/",
      label: "Live App",
    },
    preview: {
      kind: "site",
      url: "https://excel-cleaner.azazshaikh.info/",
      alt: "Excel Cleaner Tool live preview",
      fallbackSrc: "/excel-cleaner.png",
    },
    description:
      "A specialized web application that processes raw XLSX files, automatically stripping out hidden macros, objects, and messy formatting to output clean, structured data arrays.",
    tags: ["Next.js", "Regex", "Data Processing"],
  },
  {
    number: "03",
    title: "ShamGym",
    accentClass: "project-lime",
    typeLink: {
      href: "https://shamgym.vercel.app/",
      label: "Live App",
    },
    preview: {
      kind: "site",
      url: "https://shamgym.vercel.app/",
      alt: "ShamGym live preview",
    },
    description:
      "Fitness-focused website for a gym brand with strong landing-page structure, modern presentation, and conversion-oriented user flows.",
    tags: ["Next.js", "Fitness", "Brand Website"],
  },
  {
    number: "04",
    title: "FastShipment",
    accentClass: "project-indigo",
    typeLabel: "Python\nBackend",
    preview: {
      kind: "image",
      src: "/fastshipment.png",
      alt: "FastShipment Dashboard UI",
    },
    description:
      "A comprehensive logistics platform featuring seamless ordering, secure checkout, real-time shipment tracking with dynamic editing, and robust partner management tools.",
    tags: ["Python", "Checkout", "Tracking"],
  },
  {
    number: "05",
    title: "Safe & Security Service",
    accentClass: "project-emerald",
    typeLink: {
      href: "https://safe-secure-security.vercel.app/",
      label: "Live App",
    },
    preview: {
      kind: "site",
      url: "https://safe-secure-security.vercel.app/",
      alt: "Safe & Security Service live preview",
    },
    description:
      "Security services website built for executive protection, event security, and site guarding with clear service pages and premium positioning.",
    tags: ["Next.js", "Business Website", "Security"],
  },
  {
    number: "06",
    title: "Python Data Pipeline",
    accentClass: "project-amber",
    typeLabel: "Python\nBackend",
    preview: { kind: "pillars" },
    description:
      "High-performance ETL pipeline for automated data ingestion, transformation, and batch reporting across large-scale structured datasets.",
    tags: ["Python", "ETL", "Automation", "Pandas"],
  },
  {
    number: "07",
    title: "LangChain RAG System",
    accentClass: "project-violet",
    typeLabel: "AI\nLLM",
    preview: { kind: "cards" },
    description:
      "Retrieval-Augmented Generation system using LangChain and vector databases to build context-aware AI assistants grounded in custom knowledge bases.",
    tags: ["LangChain", "RAG", "OpenAI", "VectorDB"],
  },
  {
    number: "08",
    title: "LangGraph AI Agent",
    accentClass: "project-rose",
    typeLabel: "AI\nAgents",
    preview: { kind: "dashboard", variant: "agent" },
    description:
      "Stateful multi-step AI agent built on LangGraph — capable of tool use, conditional branching, memory, and autonomous multi-stage task completion.",
    tags: ["LangGraph", "Agents", "Python", "LLM"],
  },
];

export const services = [
  {
    title: "Enterprise Applications",
    description:
      "Internal tools, dashboards, and CRM extensions built to unify operations and data management.",
  },
  {
    title: "Algorithm Development",
    description:
      "Custom logic engineering for complex challenges, routing, scheduling, and resource optimization.",
  },
  {
    title: "E-Commerce & Logistics",
    description:
      "End-to-end checkout paths, shipping engines, and partner management portal integrations.",
  },
  {
    title: "SaaS Architectures",
    description:
      "Scalable software foundations with robust authentication, role-based access, and fast response times.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery & Scope",
    description:
      "Analyze business bottlenecks, map user journeys, and define a clear systems requirement document.",
  },
  {
    number: "02",
    title: "Architect & Build",
    description:
      "Construct scalable databases, wireframe the UI, and write the core algorithms efficiently.",
  },
  {
    number: "03",
    title: "Test & Deploy",
    description:
      "Rigorous QA automation, security validations, and seamless deployment to live production servers.",
  },
];

export const footerServices = [
  "Business Automation",
  "Web Applications",
  "Logistics Platforms",
  "AI-Enhanced Workflows",
];

export const footerPortfolioLinks = [
  {
    label: "POC Waste Optimizer",
    href: "https://poc-waste-proper.vercel.app/",
  },
  {
    label: "Excel Cleaner Tool",
    href: "https://excel-cleaner.azazshaikh.info/",
  },
  { label: "ShamGym", href: "https://shamgym.vercel.app/" },
  { label: "FastShipment", href: "#work" },
  { label: "Safe & Security Service", href: "https://safe-secure-security.vercel.app/" },
  { label: "Python Data Pipeline", href: "#work" },
  { label: "LangChain RAG System", href: "#work" },
  { label: "LangGraph AI Agent", href: "#work" },
];
