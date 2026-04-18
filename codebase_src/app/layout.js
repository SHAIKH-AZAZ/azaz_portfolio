import { Bricolage_Grotesque, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const BASE_URL = "https://azazshaikh.info";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Primary ──────────────────────────────────────────────────────────────
  title: {
    default: "Azaz Shaikh — Full-Stack Engineer & Business Automation Specialist",
    template: "%s | Azaz Shaikh",
  },
  description:
    "Azaz Shaikh is a full-stack software engineer based in India who builds scalable web systems, automation workflows, and data-driven platforms for growing businesses. Available for freelance & remote roles.",
  keywords: [
    "Azaz Shaikh",
    "full stack developer",
    "full stack engineer",
    "web developer India",
    "freelance developer",
    "Next.js developer",
    "React developer",
    "business automation",
    "workflow automation",
    "logistics software",
    "bar cutting optimization",
    "POC Waste Optimizer",
    "Excel Cleaner Tool",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "software engineer portfolio",
    "scalable architecture",
  ],
  authors: [{ name: "Azaz Shaikh", url: BASE_URL }],
  creator: "Azaz Shaikh",
  publisher: "Azaz Shaikh",

  // ── Canonical & alternates ───────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
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
    apple: "/apple-touch-icon.png",
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Misc ─────────────────────────────────────────────────────────────────
  category: "technology",
};

export default function RootLayout({ children }) {
  // JSON-LD structured data — Person + WebSite schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Azaz Shaikh",
    alternateName: "Mohammad Azaz Shaikh",
    url: BASE_URL,
    email: "mailto:azazshaikh2703@gmail.com",
    jobTitle: "Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specialising in business automation, logistics algorithms, and scalable web architectures.",
    knowsAbout: [
      "Full-Stack Web Development",
      "React",
      "Next.js",
      "Node.js",
      "Business Automation",
      "Logistics Optimization",
      "PostgreSQL",
      "MongoDB",
    ],
    sameAs: [
      "https://github.com/SHAIKH-AZAZ/",
      "https://www.linkedin.com/in/mohammadazaz-shaikh-421937322",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Azaz Shaikh Portfolio",
    url: BASE_URL,
    description:
      "Portfolio of Azaz Shaikh — full-stack engineer building scalable web systems and business automation tools.",
    author: {
      "@type": "Person",
      name: "Azaz Shaikh",
    },
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/#about` },
      { "@type": "ListItem", position: 3, name: "Work", item: `${BASE_URL}/#work` },
      { "@type": "ListItem", position: 4, name: "Contact", item: `${BASE_URL}/#contact` },
    ],
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
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
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
        {/* Preconnect hints for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
