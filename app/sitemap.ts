import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ytmate.in"

  // Tool pages
  const tools = ["youtube", "instagram", "facebook", "x", "vimeo", "audio-converter", "video-quality"]

  // Blog slugs (in a real app, these would come from a database or CMS)
  const blogSlugs = [
    "how-to-download-youtube-videos",
    "instagram-reels-downloader-guide",
    "convert-videos-to-mp3",
    "download-facebook-videos",
    "best-video-formats-explained",
    "download-twitter-videos",
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
