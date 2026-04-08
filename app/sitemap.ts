import type { MetadataRoute } from "next";
import { getHomepagePosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sapamedia.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getHomepagePosts(200);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/post/${post.slug}`,
    lastModified: post.created_at,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
