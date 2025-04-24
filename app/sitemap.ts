import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://electronichub.com"

  // Main pages
  const routes = [
    "",
    "/search",
    "/ai-assistant",
    "/datasheets",
    "/equivalents",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Category pages
  const categories = ["bjt", "mosfet", "igbt", "scr", "ic"]
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Component pages - in a real implementation, you would fetch these from your database
  // This is a simplified example with just a few components
  const componentIds = ["2SA1943", "2SD718", "TIP42C", "BC337", "2N3906", "S8050", "2SC4793", "13003", "BC557"]
  const componentRoutes = componentIds.map((id) => ({
    url: `${baseUrl}/component/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...routes, ...categoryRoutes, ...componentRoutes]
}
