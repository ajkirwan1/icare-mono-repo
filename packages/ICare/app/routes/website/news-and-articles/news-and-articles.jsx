import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import { NavLink, useLoaderData } from "react-router";
import { urlFor } from "../../../lib/sanityImage";
import classes from "./news-and-articles.module.scss";
import Tag from "~/components/website/common/tags/tag";
import EngagementSection from "~/components/website/common/sections/engagement-section";

function formatDate(dateString) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Europe/London"
    }).format(new Date(dateString));
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));

    const limit = 6;
    const offset = (page - 1) * limit;

    const { getNewsListPaged, getTagCounts, getNewsCount } = await import("../../../lib/news.server");
    const [posts, tagCounts, total] = await Promise.all([
        getNewsListPaged({ offset, limit }),
        getTagCounts(),
        getNewsCount()
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return { posts, tagCounts, page, totalPages, total };
}

export default function NewsAndArticlesPage() {
    const { posts, tagCounts, totalPages, total, page } = useLoaderData();

    return (
        <div style={{ minHeight: "100vh" }}>
            <ICareNavbar />

            <main className={classes.page}>
                <header className={classes.pageHeader}>
                    <div className={classes.pageHeaderMain}>
                        <h1>Care guidance</h1>
                        <p className={classes.intro}>
                            Practical information, clear explanations and real-world context to help you understand care options, responsibilities and everyday decisions — from early questions to ongoing support at home.
                        </p>
                    </div>

                    {tagCounts?.length > 0 && (
                        <aside className={classes.pageHeaderAside}>
                            <div className={classes.tagFlexContainer}>
                                <h2 className={classes.asideTitle}>Search by tags</h2>
                                <nav>
                                    <ul className={classes.tagsBar}>
                                        {tagCounts.slice(0, 20).map(({ tag, count }) => (
                                            <li key={tag}>
                                                <Tag
                                                    label={`${tag} (${count})`}
                                                    to={`/care-knowledge/tags/${tag}`}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    )}
                </header>

                <p className={classes.totalCount}>
                    Showing {(page - 1) * 2 + 1} – {Math.min(page * 2, total)} of {total} articles
                </p>

                <section>
                    <ul className={classes.grid}>
                        {posts.map((p) => (
                            <li key={p._id} className={classes.newsCard}>
                                <NavLink to={`/care-knowledge/${p.slug}`} className={classes.cardLink}>
                                    {p.heroImage && (
                                        <img
                                            src={urlFor(p.heroImage).width(600).height(360).fit("crop").url()}
                                            alt={p.heroImage?.alt || p.title}
                                            className={classes.heroImage}
                                        />
                                    )}

                                    <div className={classes.cardContent}>
                                        <div className={classes.titleRow}>
                                            <h2>{p.title}</h2>
                                            <small>{formatDate(p.publishedAt)}</small>
                                        </div>

                                        {p.excerpt && <p className={classes.excerpt}>{p.excerpt}</p>}
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ⬇⬇⬇ COMPACT ENGAGEMENT ⬇⬇⬇ */}
                <div className={classes.engagementCompact}>
                    <EngagementSection />
                </div>

                <div className={classes.pagination}>
                    <NavLink
                        to={`/care-knowledge?page=${page - 1}`}
                        className={`${classes.pageBtn} ${page <= 1 ? classes.disabled : ""}`}
                    >
                        ← Previous
                    </NavLink>

                    <span>Page {page} of {totalPages}</span>

                    <NavLink
                        to={`/care-knowledge?page=${page + 1}`}
                        className={`${classes.pageBtn} ${page >= totalPages ? classes.disabled : ""}`}
                    >
                        Next →
                    </NavLink>
                </div>
            </main>

            <ICareFooter />
        </div>
    );
}
