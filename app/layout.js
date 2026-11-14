import "./globals.css";
import { fontVariables } from "./fonts";
import { BASE_URL, EMAIL, GITHUB, LINKEDIN, PERSON_ID, WEBSITE_ID } from "./site";
import JsonLd from "./components/JsonLd";
import { ThemeScript, THEME_COLOR } from "./components/theme";
import SelectionHighlight from "./components/SelectionHighlight";

// Next.js requires viewport as its own export, not inside metadata
export const viewport = {
  themeColor: THEME_COLOR.dark,
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const TITLE = "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: "%s | Azaz Shaikh",
  },
  description:
    "Azaz Shaikh is a full-stack software engineer specialising in scalable web systems, business automation workflows, logistics algorithms, and data-driven platforms. Available for freelance and remote roles.",
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

  alternates: { canonical: "/" },

  openGraph: {
    type: "profile",
    firstName: "Azaz",
    lastName: "Shaikh",
    username: "azazshaikh",
    gender: "male",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Azaz Shaikh — Full-Stack Engineer",
    title: TITLE,
    description:
      "I engineer scalable web systems, automation workflows, and custom algorithms that eliminate inefficiencies and drive business growth. View my portfolio.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: TITLE,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "I engineer scalable web systems, automation workflows, and custom algorithms that eliminate inefficiencies and drive business growth.",
    images: ["/og-image.png"],
    creator: "@azazshaikh",
    site: "@azazshaikh",
  },

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

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },

  manifest: "/manifest.json",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Azaz Shaikh Portfolio",
    url: BASE_URL,
    description:
      "Portfolio of Azaz Shaikh — full-stack engineer building scalable web systems and business automation tools.",
    author: { "@id": PERSON_ID },
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
