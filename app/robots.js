import { BASE_URL } from "./site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Block known AI training scrapers
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "CCBot",
          "anthropic-ai",
          "Omgilibot",
          "FacebookBot",
          "Bytespider",
          "PetalBot",
          "Amazonbot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
