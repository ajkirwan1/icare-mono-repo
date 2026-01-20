import { useLoaderData, NavLink } from "react-router";
import { PortableText } from "@portabletext/react";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { urlFor } from "../../lib/sanityImage";
import classes from "./news-item.module.scss";

// Loader
export async function loader({ params }) {
  const slug = params.slug;

  if (!slug) { throw new Response("Not Found", { status: 404 }); }

  const { getNewsBySlug, getRelatedNews } = await import("../../lib/news.server");
  const post = await getNewsBySlug(slug);

  if (!post) { throw new Response("Not Found", { status: 404 }); }
  const related = await getRelatedNews({ id: post._id, tags: post.tags || [] });

  return { post, related };
}

// Optional: SEO metadata (works in React Router frameworks that support route meta)
export function meta({ data }) {
  const post = data?.post;
  if (!post) { return [{ title: "News | ICare" }]; }

  const siteUrl = "https://example.com"; // ideally from env
  const url = `${siteUrl}/news-and-articles/${post.slug}`;
  const title = `${post.title} | ICare`;
  const description = post.metaDescription || post.excerpt || "";
  const ogImage = post.heroImage
    ? urlFor(post.heroImage).width(1200).height(630).fit("crop").url()
    : `${siteUrl}/og-default.png`; // optional fallback
  return [
    { title },
    { name: "description", content: description },

    // Canonical
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:title", content: post.title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage }
  ];
}

const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className={classes.ptH2}>{children}</h2>,
    h3: ({ children }) => <h3 className={classes.ptH3}>{children}</h3>,
    normal: ({ children }) => (
      <p className={classes.ptParagraph}>{children}</p>
    )
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1200).fit("max").url()}
        alt={value?.alt || ""}
        className={classes.ptImage}
      />
    )
  }
};

export default function NewsPostPage() {
  const { post, related } = useLoaderData();

  const siteUrl = import.meta.env.VITE_SITE_URL; // ideally from env
  const canonicalUrl = `${siteUrl}/news-and-articles/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    mainEntityOfPage: canonicalUrl,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : "ICare",
    publisher: {
      "@type": "Organization",
      name: "ICare"
      // If you have a logo URL, include it:
      // logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    image: post.heroImage
      ? [urlFor(post.heroImage).width(1200).height(630).fit("crop").url()]
      : undefined
  };

  // Remove undefined keys (nice-to-have)
  Object.keys(articleJsonLd).forEach(
    (k) => articleJsonLd[k] === undefined && delete articleJsonLd[k]
  );

  return (
    <div className={classes.page}>
      <ICareNavbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className={classes.main}>
        <article className={classes.article}>
          <h1 className={classes.title}>{post.title}</h1>
          {post.subtitle && (
            <p className={classes.subtitle}>{post.subtitle}</p>
          )}
          <p className={classes.date}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {post.heroImage && (
            <img
              src={urlFor(post.heroImage)
                .width(1400)
                .height(700)
                .fit("crop")
                .url()}
              alt={post.heroImage?.alt || post.title}
              className={classes.heroImage}
            />
          )}
          {post.excerpt && (
            <p className={classes.excerpt}>{post.excerpt}</p>
          )}
          <hr className={classes.divider} />
          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className={classes.tags}>
              {post.tags.map((t) => (
                <span key={t} className={classes.tag}>
                  {t}
                </span>
              ))}
            </div>
          )}
          {related?.length > 0 && (
            <section className={classes.related}>
              <h2 className={classes.relatedTitle}>Related articles</h2>
              <ul className={classes.relatedGrid}>
                {related.map((r) => (
                  <li key={r._id} className={classes.relatedItem}>
                    <NavLink
                      to={`/news-and-articles/${r.slug}`}
                      className={classes.relatedLink}
                    >
                      <div className={classes.relatedCard}>
                        {r.heroImage && (
                          <img
                            src={urlFor(r.heroImage)
                              .width(800)
                              .height(420)
                              .fit("crop")
                              .url()}
                            alt={r.heroImage?.alt || r.title}
                            className={classes.relatedImage}
                          />
                        )}
                        <div className={classes.relatedTitleRow}>
                          <strong>{r.title}</strong>
                          <small className={classes.relatedDate}>
                            {new Date(r.publishedAt).toLocaleDateString()}
                          </small>
                        </div>
                        {r.excerpt && (
                          <p className={classes.relatedExcerpt}>
                            {r.excerpt}
                          </p>
                        )}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <ICareFooter />
    </div>
  );
}
