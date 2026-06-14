import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Enable browser DNS prefetching
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Control referrer info sent on navigation
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser feature access
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS (1 year, include subdomains)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Long-lived cache for static assets (improves LCP / Core Web Vitals)
      {
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
