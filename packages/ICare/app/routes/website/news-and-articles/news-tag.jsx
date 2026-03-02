import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import { Link, useLoaderData } from "react-router";
import { urlFor } from "../../../lib/sanityImage";
import EngagementSection from "~/components/website/common/sections/engagement-section";
import classes from "~/styles/pages/news-and-articles/news-and-articles.module.scss"; // reuse your existing grid styles

function prettifyTag(tag) {
    // "in-home-care" -> "In home care"
    const spaced = tag.replace(/-/g, " ");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export async function loader({ params }) {
    const tag = params.tag;
    if (!tag) { throw new Response("Not Found", { status: 404 }); }

    const { getNewsByTag } = await import("../../../lib/news.server");
    const posts = await getNewsByTag(tag);

    return { tag, posts };
}

export function meta({ data }) {
    const tag = data?.tag;
    const pretty = tag ? prettifyTag(tag) : "Tag";
    const encodedTag = tag ? encodeURIComponent(tag) : "";
    const url = tag
        ? `https://icare-app.co.uk/care-guidance/tags/${encodedTag}`
        : "https://icare-app.co.uk/care-guidance";
    const image = "https://icare-app.co.uk/images/og/default.jpg";

    const title = `${pretty} articles | ICare`;
    const description = `Read updates and research on ${pretty}, including insights on in-home care, workforce challenges, and care costs.`;

    return [
        { title },
        { name: "description", content: description },
        { tagName: "link", rel: "canonical", href: url },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image }
    ];
}

export default function NewsTagPage() {
    const { tag, posts } = useLoaderData();
    const prettyTag = prettifyTag(tag);

    return (
        <div style={{ minHeight: "100vh" }}>
            <ICareNavbar />

            <main className={classes.page}>
                <nav aria-label="Breadcrumb" className={classes.breadcrumbs}>
                    <ol className={classes.breadcrumbList}>
                        <li className={classes.crumb}><Link to="/care-guidance">care knowledge</Link></li>
                        <li className={classes.crumb} aria-current="page">{prettyTag}</li>
                    </ol>
                </nav>
                <h1>Topic: {prettyTag}</h1>

                <p className={classes.intro}>
                    Articles tagged with <strong>{prettyTag}</strong>. Explore the latest
                    updates and research related to this topic.
                </p>

                {posts.length === 0 ? (
                    <div>
                        <p>No posts found for this topic yet.</p>
                        <Link to="/care-guidance">← Back to all news</Link>
                    </div>
                ) : (
                    <ul className={classes.grid}>
                        {posts.map((p) => (
                            <li key={p._id} className={classes.newsCard}>
                                <Link to={`/care-guidance/${p.slug}`} className={classes.cardLink}>
                                    {p.heroImage && (
                                        <img
                                            src={urlFor(p.heroImage).width(600).height(360).fit("crop").url()}
                                            alt={p.heroImage?.alt || p.title}
                                            className={classes.heroImage}
                                        />
                                    )}

                                    <div className={classes.cardContent}>
                                        <div className={classes.titleRow}>
                                            <h2 className={classes.title}>{p.title}</h2>
                                            <small className={classes.date}>
                                                {new Date(p.publishedAt).toLocaleDateString()}
                                            </small>
                                        </div>

                                        {p.subtitle && <p className={classes.subtitle}>{p.subtitle}</p>}
                                        {p.excerpt && <p className={classes.excerpt}>{p.excerpt}</p>}

                                        {Array.isArray(p.tags) && p.tags.length > 0 && (
                                            <div className={classes.tags}>
                                                {p.tags.map((t) => (
                                                    <Link
                                                        key={t}
                                                        to={`/care-guidance/tags/${t}`}
                                                        className={classes.tag}
                                                        style={{ textDecoration: "none", color: "inherit" }}
                                                    >
                                                        {t}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ marginTop: "3rem" }}>
                    <Link to="/care-guidance">← Back to all news</Link>
                </div>
                <EngagementSection />
            </main>

            <ICareFooter />
        </div>
    );
}
