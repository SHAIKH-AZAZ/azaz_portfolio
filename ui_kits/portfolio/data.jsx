/* global React */
const { useState, useEffect, useRef } = React;

// Inline data from codebase_src/app/data/portfolio.js
window.ASKIT_DATA = {
  heroMetrics: [
    { value: "1+", label: "Year of full-stack engineering experience" },
    { value: "15+", label: "Business operations optimized through code" },
    { value: "98%", label: "Performance & efficiency increase on core systems" },
  ],
  marqueeSkills: [
    "Workflow Automation","Scalable Architecture","Logistics Algorithms",
    "Business Solutions","LangChain & LangGraph","AI Agents",
    "Python Automation","Database Optimization","System Integration","Full-Stack Engineering",
  ],
  insights: [
    { number: "01", title: "Operational Efficiency", description: "Building automated platforms that replace manual tasks and save hundreds of hours." },
    { number: "02", title: "Algorithmic Precision", description: "Designing custom optimization algorithms for logistics, resource allocation, and cutting." },
    { number: "03", title: "Scalable Architecture", description: "Developing robust backend systems and resilient frontends that grow seamlessly." },
  ],
  skillGroups: [
    { title: "Frontend", items: ["React","Next.js","JavaScript (ES6+)","HTML5 / CSS3","Tailwind CSS","Motion UI"] },
    { title: "Backend",  items: ["Node.js","Express","REST APIs","Python","MongoDB","SQL","Optimization Algorithms"] },
    { title: "QA & Tools", items: ["Manual Testing","Test Automation","Selenium / Cypress","Postman","Git / GitHub","Vercel"] },
    { title: "AI & Python", items: ["LangChain","LangGraph","RAG Systems","AI Agents","Pandas","OpenAI API"] },
  ],
  experience: [
    { title: "Full Stack IT Engineer", company: "Buniyadbyte",
      description: "Developed and shipped POC Waste, a high-performance Bar Cutting Optimization web application. Engineered custom cutting stock algorithms to minimize raw material waste and built a complete project management interface." },
    { title: "QA Manual and Automations Engineer Intern", company: "Maxgen Web Technologies",
      description: "Secured the quality and reliability of software products by executing comprehensive manual test cases and implementing automated testing scripts." },
  ],
  projects: [
    { number: "01", title: "POC Waste Optimizer", accent: "#f97316", accentRgb: "249,115,22", typeLink: "Live App", kind: "bars", description: "Industrial optimization tool built on custom bar-cutting algorithms to minimize material waste and streamline project management.", tags: ["Next.js","Optimization","PostgreSQL"] },
    { number: "02", title: "Excel Cleaner Tool", accent: "#0ea5e9", accentRgb: "14,165,233", typeLink: "Live App", kind: "rows", description: "Web application that processes raw XLSX files, stripping hidden macros, objects, and messy formatting to output clean structured data arrays.", tags: ["Next.js","Regex","Data Processing"] },
    { number: "03", title: "ShamGym", accent: "#22c55e", accentRgb: "34,197,94", typeLink: "Live App", kind: "hero", description: "Fitness-focused website for a gym brand with strong landing-page structure, modern presentation, and conversion-oriented user flows.", tags: ["Next.js","Fitness","Brand Website"] },
    { number: "04", title: "FastShipment", accent: "#6366f1", accentRgb: "99,102,241", typeLabel: "Python\nBackend", kind: "dashboard", description: "Comprehensive logistics platform with ordering, secure checkout, real-time shipment tracking with dynamic editing, and robust partner management tools.", tags: ["Python","Checkout","Tracking"] },
    { number: "05", title: "Safe & Security Service", accent: "#10b981", accentRgb: "16,185,129", typeLink: "Live App", kind: "hero", description: "Security services website built for executive protection, event security, and site guarding with clear service pages and premium positioning.", tags: ["Next.js","Business Website","Security"] },
    { number: "06", title: "Python Data Pipeline", accent: "#f59e0b", accentRgb: "245,158,11", typeLabel: "Python\nBackend", kind: "pillars", description: "High-performance ETL pipeline for automated data ingestion, transformation, and batch reporting across large-scale structured datasets.", tags: ["Python","ETL","Automation","Pandas"] },
    { number: "07", title: "LangChain RAG System", accent: "#a855f7", accentRgb: "168,85,247", typeLabel: "AI\nLLM", kind: "cards", description: "Retrieval-Augmented Generation system using LangChain and vector databases to build context-aware AI assistants grounded in custom knowledge bases.", tags: ["LangChain","RAG","OpenAI","VectorDB"] },
    { number: "08", title: "LangGraph AI Agent", accent: "#f43f5e", accentRgb: "244,63,94", typeLabel: "AI\nAgents", kind: "dashboard", description: "Stateful multi-step AI agent built on LangGraph \u2014 capable of tool use, conditional branching, memory, and autonomous multi-stage task completion.", tags: ["LangGraph","Agents","Python","LLM"] },
  ],
  services: [
    { title: "Enterprise Applications", description: "Internal tools, dashboards, and CRM extensions built to unify operations and data management." },
    { title: "Algorithm Development", description: "Custom logic engineering for complex challenges, routing, scheduling, and resource optimization." },
    { title: "E-Commerce & Logistics", description: "End-to-end checkout paths, shipping engines, and partner management portal integrations." },
    { title: "SaaS Architectures", description: "Scalable software foundations with robust authentication, role-based access, and fast response times." },
  ],
  processSteps: [
    { number: "01", title: "Discovery & Scope", description: "Analyze business bottlenecks, map user journeys, and define a clear systems requirement document." },
    { number: "02", title: "Architect & Build", description: "Construct scalable databases, wireframe the UI, and write the core algorithms efficiently." },
    { number: "03", title: "Test & Deploy", description: "Rigorous QA automation, security validations, and seamless deployment to live production servers." },
  ],
  footerServices: ["Business Automation","Web Applications","Logistics Platforms","AI-Enhanced Workflows"],
  footerPortfolioLinks: ["POC Waste Optimizer","Excel Cleaner Tool","ShamGym","FastShipment","Safe & Security Service","Python Data Pipeline","LangChain RAG System","LangGraph AI Agent"],
};
