const BASE_URL = "https://azazshaikh.info";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      images: [
        `${BASE_URL}/og-image.png`,
        `${BASE_URL}/work/poc-waste.webp`,
        `${BASE_URL}/work/excel-cleaner.webp`,
        `${BASE_URL}/work/fastshipment.webp`,
        `${BASE_URL}/work/shamgym.webp`,
      ],
    },
  ];
}
