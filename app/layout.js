import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://azazshaikh.info";

// ── Viewport (separate from metadata per Next.js 14+ requirement) ──────────
export const viewport = {
  themeColor: "#fa5d19",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
    template: "%s | Azaz Shaikh",
  },
  description:
    "Azaz Shaikh is a full-stack software engineer based in India who builds scalable web systems, automation workflows, and data-driven platforms for growing businesses. Available for freelance & remote roles.",
  keywords: [
    "Azaz Shaikh",
    "Mohammad Azaz Shaikh",
    "full stack developer",
    "full stack engineer India",
    "web developer India",
    "freelance developer",
    "Next.js developer",
    "React developer",
    "business automation engineer",
    "workflow automation",
    "logistics software",
    "bar cutting optimization",
    "POC Waste Optimizer",
    "Excel Cleaner Tool",
    "Node.js developer",
    "MongoDB",
    "PostgreSQL",
    "software engineer portfolio",
    "scalable architecture",
    "LangChain developer",
    "LangGraph AI agent",
    "RAG system developer",
    "Python automation engineer",
    "ETL pipeline developer",
    "hire full stack developer",
  ],
  authors: [{ name: "Azaz Shaikh", url: BASE_URL }],
  creator: "Azaz Shaikh",
  publisher: "Azaz Shaikh",

  // ── Canonical & alternates ───────────────────────────────────────────────
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "profile",
    firstName: "Azaz",
    lastName: "Shaikh",
    username: "azazshaikh",
    gender: "male",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Azaz Shaikh — Full-Stack Engineer",
    title: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
    description:
      "I engineer scalable web systems, automation workflows, and custom algorithms that eliminate inefficiencies and drive business growth. View my portfolio.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
    description:
      "I engineer scalable web systems, automation workflows, and custom algorithms that eliminate inefficiencies and drive business growth.",
    images: ["/og-image.png"],
    creator: "@azazshaikh",
    site: "@azazshaikh",
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Format detection ─────────────────────────────────────────────────────
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // ── Custom meta tags ─────────────────────────────────────────────────────
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "msapplication-TileColor": "#fa5d19",
    "msapplication-config": "none",
    rating: "general",
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  // ── Person schema ─────────────────────────────────────────────────────────
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Azaz Shaikh",
    alternateName: "Mohammad Azaz Shaikh",
    url: BASE_URL,
    email: "azazshaikh2703@gmail.com",
    jobTitle: "Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specialising in business automation, logistics algorithms, and scalable web architectures.",
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    nationality: {
      "@type": "Country",
      name: "India",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Software Engineer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      skills:
        "React, Next.js, Node.js, Python, Business Automation, LangChain, LangGraph, PostgreSQL, MongoDB",
    },
    worksFor: {
      "@type": "Organization",
      name: "Buniyadbyte",
    },
    knowsAbout: [
      "Full-Stack Web Development",
      "React",
      "Next.js",
      "Node.js",
      "Business Automation",
      "Logistics Optimization",
      "Bar Cutting Algorithms",
      "PostgreSQL",
      "MongoDB",
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation",
      "AI Agents",
      "Python ETL Pipelines",
    ],
    sameAs: [
      "https://github.com/SHAIKH-AZAZ/",
      "https://www.linkedin.com/in/mohammadazaz-shaikh-421937322",
    ],
  };

  // ── WebSite schema with SearchAction ─────────────────────────────────────
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Azaz Shaikh Portfolio",
    url: BASE_URL,
    description:
      "Portfolio of Azaz Shaikh — full-stack engineer building scalable web systems and business automation tools.",
    author: { "@id": `${BASE_URL}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ── ProfilePage schema ────────────────────────────────────────────────────
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/#profilepage`,
    dateCreated: "2024-01-01T00:00:00.000Z",
    dateModified: new Date().toISOString(),
    url: BASE_URL,
    name: "Azaz Shaikh — Full-Stack Engineer Portfolio",
    description:
      "Professional portfolio and profile of Azaz Shaikh, full-stack software engineer specializing in scalable web systems, business automation, and AI-powered applications.",
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: { "@id": `${BASE_URL}/#person` },
  };

  // ── BreadcrumbList schema ─────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/#about` },
      { "@type": "ListItem", position: 3, name: "Experience", item: `${BASE_URL}/#experience` },
      { "@type": "ListItem", position: 4, name: "Work", item: `${BASE_URL}/#work` },
      { "@type": "ListItem", position: 5, name: "Services", item: `${BASE_URL}/#services` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${BASE_URL}/#contact` },
    ],
  };

  // ── FAQPage schema ────────────────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What full-stack development services does Azaz Shaikh offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Azaz Shaikh offers full-stack web development services including enterprise applications, internal dashboards, CRM extensions, SaaS architecture design, e-commerce platforms, logistics tracking systems, and custom algorithm development. He builds with React, Next.js, Node.js, Python, MongoDB, and PostgreSQL.",
        },
      },
      {
        "@type": "Question",
        name: "What business automation solutions does Azaz Shaikh build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Azaz Shaikh specializes in Python ETL data pipelines, logistics shipment tracking platforms, bar-cutting optimization algorithms to minimize material waste, AI-powered RAG systems using LangChain, and stateful multi-step AI agents built on LangGraph.",
        },
      },
      {
        "@type": "Question",
        name: "Is Azaz Shaikh available for freelance or remote projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Azaz Shaikh is available for freelance and remote software development engagements. Contact via email at azazshaikh2703@gmail.com or LinkedIn to discuss project requirements, timelines, and deliverables.",
        },
      },
      {
        "@type": "Question",
        name: "What AI and machine learning technologies does Azaz Shaikh work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Azaz Shaikh works with LangChain for Retrieval-Augmented Generation (RAG) systems, LangGraph for stateful multi-step AI agent orchestration, OpenAI APIs, vector databases, and Python data libraries including Pandas for large-scale ETL processing.",
        },
      },
      {
        "@type": "Question",
        name: "How does Azaz Shaikh approach software development projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Azaz Shaikh follows a structured three-phase methodology: (1) Discovery & Scope — analyzing business bottlenecks, mapping user journeys, and defining a systems requirement document; (2) Architect & Build — constructing scalable databases, wireframing the UI, and writing core algorithms; (3) Test & Deploy — rigorous QA automation, security validation, and seamless production deployment.",
        },
      },
    ],
  };

  // ── HowTo schema (Process section) ───────────────────────────────────────
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Azaz Shaikh Delivers Software Projects",
    description:
      "A structured technical methodology designed to de-risk projects and guarantee delivery.",
    author: { "@id": `${BASE_URL}/#person` },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Discovery & Scope",
        text: "Analyze business bottlenecks, map user journeys, and define a clear systems requirement document.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Architect & Build",
        text: "Construct scalable databases, wireframe the UI, and write the core algorithms efficiently.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Test & Deploy",
        text: "Rigorous QA automation, security validations, and seamless deployment to live production servers.",
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* ── Resource hints ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://poc-waste-proper.vercel.app" />
        <link rel="dns-prefetch" href="https://excel-cleaner.azazshaikh.info" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
