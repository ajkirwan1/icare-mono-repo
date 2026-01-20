import { sanity } from "../lib/sanity.server";

export async function loader() {
  const siteUrl = "https://icare.com"; // use env in prod

  const posts = await sanity.fetch(`
    *[_type == "newsPost" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `);

  const urls = posts.map((post) => ({
    loc: `${siteUrl}/news-and-articles/${post.slug}`,
    lastmod: (post._updatedAt || post.publishedAt).split("T")[0]
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/news-and-articles</loc>
  </url>
  ${urls
      .map(
        (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
      )
      .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
