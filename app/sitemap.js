import { BASE_URL } from "./site";
import { featuredWork } from "./data";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      images: [`${BASE_URL}/og-image.png`, ...featuredWork.map((w) => BASE_URL + w.image)],
    },
  ];
}
