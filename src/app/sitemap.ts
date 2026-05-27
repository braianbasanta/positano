import type { MetadataRoute } from "next";

const SITE_URL = "https://positanopizzeriabcn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/carta`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pizza-domicilio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/trabaja-con-nosotros`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
