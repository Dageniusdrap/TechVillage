import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes: MetadataRoute.Sitemap = ["/"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
  const listingRoutes: MetadataRoute.Sitemap = (await import("@/data/listings")).LISTINGS.map((l) => ({
    url: `${base}/listings/${l.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const routes: MetadataRoute.Sitemap = [...staticRoutes, ...listingRoutes];
  return routes;
}
