import { sanity } from "../lib/sanity.server";

export async function loader() {
  const siteUrl = (import.meta.env.VITE_SITE_URL || "https://icare-app.co.uk").replace(/\/$/, "");

  const staticPages = [
    { loc: "/", changefreq: "weekly", priority: "1.0" },
    { loc: "/how-it-works", changefreq: "monthly", priority: "0.8" },
    { loc: "/who-we-are", changefreq: "monthly", priority: "0.7" },
    { loc: "/icare-for-caregivers", changefreq: "monthly", priority: "0.8" },
    { loc: "/icare-for-carereceivers", changefreq: "monthly", priority: "0.8" },
    { loc: "/frequently-asked-questions", changefreq: "monthly", priority: "0.7" },
    { loc: "/contact-us", changefreq: "monthly", priority: "0.6" },
    { loc: "/trust-and-safety", changefreq: "monthly", priority: "0.6" },
    { loc: "/privacy", changefreq: "monthly", priority: "0.4" },
    { loc: "/safety-commitment", changefreq: "monthly", priority: "0.4" },
    { loc: "/care-guidance", changefreq: "weekly", priority: "0.8" }
  ];

  const posts = await sanity.fetch(`
    *[_type == "newsPost" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `);

  const staticXml = staticPages
    .map(
      (p) => `
  <url>
    <loc>${siteUrl}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("");

  const postsXml = posts
    .map(
      (post) => `
  <url>
    <loc>${siteUrl}/care-guidance/${post.slug}</loc>
    <lastmod>${(post._updatedAt || post.publishedAt).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticXml}${postsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
