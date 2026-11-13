import "./globals.css";
import { fontVariables } from "./fonts";
import { BASE_URL, EMAIL, GITHUB, LINKEDIN } from "./site";
import JsonLd from "./components/JsonLd";
import { ThemeScript, THEME_COLOR } from "./components/theme";
import SelectionHighlight from "./components/SelectionHighlight";

// ── Viewport (separate from metadata per Next.js 14+ requirement) ──────────
export const viewport = {
  themeColor: THEME_COLOR.dark,
  colorScheme: "light dark",
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
    "msapplication-TileColor": THEME_COLOR.dark,
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
    email: EMAIL,
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
      GITHUB,
      LINKEDIN,
    ],
  };

  // ── WebSite schema ─────────────────────────────────────────────────────
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
  };

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        {children}
        <SelectionHighlight />
      </body>
    </html>
  );
}
