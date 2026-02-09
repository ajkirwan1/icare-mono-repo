import { useLoaderData, NavLink } from "react-router";
import { PortableText } from "@portabletext/react";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import { urlFor } from "../../../lib/sanityImage";
import classes from "~/styles/pages/news-and-articles/news-item.module.scss";
import Tag from "~/components/website/common/tags/tag";
import EngagementSection from "~/components/website/common/sections/engagement-section";

// Loader
export async function loader({ params }) {
    const slug = params.slug;

    if (!slug) { throw new Response("Not Found", { status: 404 }); }

    const { getNewsBySlug, getRelatedNews } = await import("../../../lib/news.server");
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
    const url = `${siteUrl}/care-knowledge/${post.slug}`;
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
        normal: ({ children }) => <p className={classes.ptParagraph}>{children}</p>
    },

    types: {
        image: ({ value }) => (
            <img
                src={urlFor(value).width(1200).fit("max").url()}
                alt={value?.alt || ""}
                className={classes.ptImage}
            />
        ),

        cta: ({ value }) => {
            const { text, href, variant = "primary", newTab } = value || {};
            if (!text || !href) { return null; }

            return (
                <div className={classes.ptCtaWrap}>
                    <a
                        href={href}
                        className={`${classes.ptCta} ${variant === "secondary" ? classes.ptCtaSecondary : classes.ptCtaPrimary
                            }`}
                        target={newTab ? "_blank" : undefined}
                        rel={newTab ? "noopener noreferrer" : undefined}
                    >
                        {text}
                    </a>
                </div>
            );
        },

        inlineImage: ({ value }) => {
            const img = value?.image;
            if (!img) { return null; }

            const align = value?.align || "wide";
            const wrapClass =
                align === "full" ? classes.ptInlineImageFull :
                    align === "center" ? classes.ptInlineImageCenter :
                        align === "left" ? classes.ptInlineImageLeft :
                            align === "right" ? classes.ptInlineImageRight :
                                classes.ptInlineImageWide;


            return (
                <figure className={`${classes.ptInlineImage} ${wrapClass}`}>
                    <img
                        src={urlFor(img).width(1400).fit("max").url()}
                        alt={img?.alt || value?.caption || ""}
                        className={classes.ptInlineImageImg}
                    />
                    {value?.caption && (
                        <figcaption className={classes.ptInlineImageCaption}>
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        }
    }
};


export default function NewsPostPage() {
    const { post, related } = useLoaderData();

    const siteUrl = import.meta.env.VITE_SITE_URL; // ideally from env
    const canonicalUrl = `${siteUrl}/care-knowledge/${post.slug}`;

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

    const breadcrumbJsonLd = {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "care knowledge",
                item: `${siteUrl}/care-knowledge`
            },
            {
                "@type": "ListItem",
                position: 2,
                name: post.title,
                item: canonicalUrl
            }
        ]
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [breadcrumbJsonLd, articleJsonLd]
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main id="icare-main">
                <nav aria-label="Breadcrumb" className={classes.breadcrumbs}>
                    <ol className={classes.breadcrumbList}>
                        <li className={classes.crumb}><NavLink to="/care-knowledge">care knowledge</NavLink></li>
                        <li className={classes.crumb} aria-current="page">{post.title}</li>
                    </ol>
                </nav>
                <article className={classes.article}>
                    <header style={{ display: "flex", paddingTop: "2vh", paddingBottom: "2vh", gap: "2vw" }}>
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
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <h1 className={classes.title}>{post.title}</h1>
                            {post.subtitle && (
                                <p className={classes.subtitle}>{post.subtitle}</p>
                            )}
                            <p className={classes.date}>
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                        </div>

                    </header>

                    <div className={classes.articleContent} style={{ maxWidth: "800px", margin: "0 auto" }}>
                        {post.excerpt && (
                            <p className={classes.excerpt}>{post.excerpt}</p>
                        )}
                        {Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className={classes.tags}>
                                {post.tags.map((t) => (
                                    <Tag key={t} label={t}>
                                        {t}
                                    </Tag>
                                ))}
                            </div>
                        )}
                        <hr className={classes.divider} />
                        {post.body && (
                            <PortableText
                                value={post.body}
                                components={portableTextComponents}
                            />
                        )}
                    </div>

                    {related?.length > 0 && (
                        <section className={classes.related} aria-label="Related articles">
                            <div className={classes.relatedHeader}>
                                <h2 className={classes.relatedTitle}>Related articles</h2>

                                <div className={classes.carouselControls}>
                                    <button
                                        type="button"
                                        className={classes.carouselButton}
                                        onClick={() => {
                                            const el = document.getElementById("related-carousel");
                                            if (!el) { return; }
                                            el.scrollBy({ left: -(el.clientWidth * 0.9), behavior: "smooth" });
                                        }}
                                        aria-label="Scroll left"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        className={classes.carouselButton}
                                        onClick={() => {
                                            const el = document.getElementById("related-carousel");
                                            if (!el) { return; }
                                            el.scrollBy({ left: el.clientWidth * 0.9, behavior: "smooth" });
                                        }}
                                        aria-label="Scroll right"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>

                            <ul id="related-carousel" className={classes.relatedCarousel}>
                                {related.map((r) => (
                                    <li key={r._id} className={classes.relatedSlide}>
                                        <NavLink to={`/care-knowledge/${r.slug}`} className={classes.relatedLink}>
                                            <article className={classes.relatedCard}>
                                                {r.heroImage && (
                                                    <img
                                                        src={urlFor(r.heroImage).width(800).height(450).fit("crop").url()}
                                                        alt={r.heroImage?.alt || r.title}
                                                        className={classes.relatedImage}
                                                        loading="lazy"
                                                    />
                                                )}

                                                <div className={classes.relatedBody}>
                                                    <div className={classes.relatedTitleRow}>
                                                        <strong className={classes.relatedCardTitle}>{r.title}</strong>
                                                        <small className={classes.relatedDate}>
                                                            {new Date(r.publishedAt).toLocaleDateString()}
                                                        </small>
                                                    </div>

                                                    {r.excerpt && <p className={classes.relatedExcerpt}>{r.excerpt}</p>}
                                                </div>
                                            </article>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </article>
                <EngagementSection />
            </main>
            <ICareFooter />
        </div>
    );
}
