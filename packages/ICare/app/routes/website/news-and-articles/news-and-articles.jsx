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
    const [posts, tagCounts, total] = await Promise.all([getNewsListPaged({ offset, limit }), getTagCounts(), getNewsCount()]);

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
                        <h1>News and articles</h1>
                        <p className={classes.intro}>
                            Updates, research and insights on aging, in-home care, workforce
                            challenges, and the growing impact of care costs on families across
                            the UK and Europe.
                        </p>
                    </div>
                    {tagCounts?.length > 0 && (
                        <aside className={classes.pageHeaderAside} aria-label="Search and browse by tags">
                            <div className={classes.tagFlexContainer}>
                                <h2 className={classes.asideTitle}>Search by tags</h2>
                                <nav aria-label="Search by tags">
                                    <div className={classes.tagsCarouselWrap}>
                                        <ul
                                            id="tags-carousel"
                                            className={classes.tagsBar}
                                            role="list"
                                        >
                                            {tagCounts.slice(0, 20).map(({ tag, count }) => (
                                                <li key={tag} className={classes.tagsCarouselItem}>
                                                    <Tag
                                                        label={`${tag} (${count})`}
                                                        to={`/care-knowledge/tags/${tag}`}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </aside>
                    )}
                </header>
                <p className={classes.totalCount}>
                    Showing {(page - 1) * 2 + 1} –
                    {Math.min(page * 2, total)} of {total} articles
                </p>
                <section style={{ display: "flex", gap: "2vw" }}>
                    <ul className={classes.grid} style={{ flex: "5" }}>
                        {posts.map((p) => (
                            <li key={p._id} className={classes.newsCard}>
                                <NavLink
                                    to={`/care-knowledge/${p.slug}`}
                                    className={classes.cardLink}
                                >
                                    {p.heroImage && (
                                        <img
                                            src={urlFor(p.heroImage)
                                                .width(600)
                                                .height(360)
                                                .fit("crop")
                                                .url()}
                                            alt={p.heroImage?.alt || p.title}
                                            className={classes.heroImage}
                                        />
                                    )}

                                    <div className={classes.cardContent}>
                                        <div className={classes.titleRow}>
                                            <h2 className={classes.title}>{p.title}</h2>
                                            <small className={classes.date}>
                                                {formatDate(p.publishedAt)}
                                            </small>
                                        </div>

                                        {p.subtitle && (
                                            <p style={{ display: "none" }} className={classes.subtitle}>{p.subtitle}</p>
                                        )}

                                        {p.excerpt && (
                                            <p className={classes.excerpt}>{p.excerpt}</p>
                                        )}

                                        <div style={{ display: "none" }} className={classes.tags}>
                                            {p.tags.map((tag) => (
                                                <>
                                                    <Tag
                                                        label={tag}
                                                        to={`/care-knowledge/tags/${tag}`}
                                                    />
                                                </>

                                            ))}
                                        </div>

                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </section>
                <EngagementSection />
                <div className={classes.pagination}>
                    <NavLink
                        to={`/care-knowledge?page=${page - 1}`}
                        className={`${classes.pageBtn} ${page <= 1 ? classes.disabled : ""}`}
                        aria-disabled={page <= 1}
                        tabIndex={page <= 1 ? -1 : 0}
                    >
                        ← Previous
                    </NavLink>
                    <span className={classes.pageInfo}>
                        Page {page} of {totalPages}
                    </span>
                    <NavLink
                        to={`/care-knowledge?page=${page + 1}`}
                        className={`${classes.pageBtn} ${page >= totalPages ? classes.disabled : ""}`}
                        aria-disabled={page >= totalPages}
                        tabIndex={page >= totalPages ? -1 : 0}
                    >
                        Next →
                    </NavLink>
                </div>
            </main>
            <ICareFooter />
        </div>
    );
}


