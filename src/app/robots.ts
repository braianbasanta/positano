import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /go/* son redirects de tracking de anuncios: no deben indexarse ni que los
    // crawlers los visiten (inflaría el conteo de clics). /admin ya es noindex.
    rules: { userAgent: "*", allow: "/", disallow: ["/go/", "/admin"] },
    sitemap: "https://positanopizzeriabcn.com/sitemap.xml",
  };
}
