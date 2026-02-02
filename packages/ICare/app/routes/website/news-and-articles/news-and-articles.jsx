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
        timeZone: "Europe/London",
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
        getNewsCount(),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return { posts, tagCounts, page, totalPages, total, limit };
}

export default function NewsAndArticlesPage() {
    const { posts, tagCounts, totalPages, total, page, limit } = useLoaderData();

    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const sectionTitleStyle = {
        margin: 0,
        fontSize: "1.55rem",
        lineHeight: 1.25,
        letterSpacing: "-0.2px",
        fontWeight: 700,
        color: "rgba(15, 23, 42, 0.95)",
    };

    const paragraphStyle = {
        margin: "0.8rem 0 0",
        fontSize: "1.15rem",
        lineHeight: 1.7,
        color: "rgba(15, 23, 42, 0.88)",
        fontWeight: 420,
        maxWidth: "70ch",
    };

    const topicsLabelStyle = {
        margin: "1.1rem 0 0",
        fontSize: "1.08rem",
        fontWeight: 700,
        color: "rgba(15, 23, 42, 0.92)",
    };

    const topicsListStyle = {
        margin: "0.7rem 0 0",
        paddingLeft: "1.1rem",
        display: "grid",
        gap: "0.55rem",
        fontSize: "1.08rem",
        lineHeight: 1.6,
        color: "rgba(15, 23, 42, 0.86)",
        maxWidth: "72ch",
    };

    const closingStyle = {
        margin: "1rem 0 0",
        fontSize: "1.12rem",
        lineHeight: 1.7,
        color: "rgba(15, 23, 42, 0.86)",
        fontWeight: 450,
        maxWidth: "70ch",
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <ICareNavbar />

            <main className={classes.page}>
                <header className={classes.pageHeader}>
                    <div className={classes.pageHeaderMain}>
                        <h1>Care guidance</h1>

                        <p className={classes.intro}>
                            Stay informed with clear, up-to-date guidance on home care in the UK.
                            <br />
                            Care guidance brings together practical explanations, evolving standards and real-world context
                            to support everyday care decisions — from early questions to ongoing support at home.
                        </p>

                        {/* ✅ CTA row */}
                        <div
                            style={{
                                marginTop: "1.2rem",
                                display: "flex",
                                gap: "12px",
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <NavLink
                                to="/newsletter"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.85rem 1.25rem",
                                    borderRadius: 999,
                                    textDecoration: "none",
                                    fontWeight: 800,
                                    fontSize: "1rem",
                                    background: "#778d43",
                                    color: "#fff",
                                    letterSpacing: ".01em",
                                }}
                            >
                                Subscribe to updates
                            </NavLink>

                            <NavLink
                                to="/waitlist"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.85rem 1.25rem",
                                    borderRadius: 999,
                                    textDecoration: "none",
                                    fontWeight: 800,
                                    fontSize: "1rem",
                                    background: "transparent",
                                    color: "rgba(15, 23, 42, 0.92)",
                                    border: "1px solid rgba(15, 23, 42, 0.18)",
                                }}
                            >
                                Join waitlist
                            </NavLink>

                            <span
                                style={{
                                    fontSize: "0.98rem",
                                    color: "rgba(15, 23, 42, 0.70)",
                                    fontWeight: 650,
                                }}
                            >
                                Guidance is general information — not medical advice.
                            </span>
                        </div>

                        {/* ✅ FOR FAMILIES */}
                        <section
                            aria-label="For families"
                            style={{
                                marginTop: "2.2rem",
                                paddingTop: "1.6rem",
                                borderTop: "1px solid rgba(15, 23, 42, 0.10)",
                                maxWidth: 860,
                            }}
                        >
                            <h2 style={sectionTitleStyle}>For families</h2>

                            <p style={paragraphStyle}>
                                If you're caring for an elderly parent or relative, you'll find guidance on the questions that
                                often feel hardest to answer — from early concerns to ongoing support at home.
                            </p>

                            <p style={{ ...paragraphStyle, marginTop: "0.75rem", fontSize: "1.12rem", color: "rgba(15, 23, 42, 0.84)" }}>
                                We cover practical topics to help you understand options, prepare for conversations, and feel
                                more confident in your decisions — without pressure or assumptions.
                            </p>

                            <p style={topicsLabelStyle}>Topics we cover:</p>

                            <ul style={topicsListStyle}>
                                <li>Recognising when your loved one may need more support</li>
                                <li>Understanding different types of care and companionship</li>
                                <li>Having difficult conversations with family members</li>
                                <li>Navigating guilt, worry, and emotional overwhelm</li>
                                <li>Finding trusted help that respects dignity and independence</li>
                                <li>Research and statistics to support informed decisions</li>
                            </ul>

                            <p style={closingStyle}>
                                Our goal is to help you feel more informed, supported, and less alone.
                            </p>
                        </section>

                        {/* ✅ FOR CAREGIVERS (added under Families, same style) */}
                        <section
                            aria-label="For caregivers"
                            style={{
                                marginTop: "1.8rem",
                                paddingTop: "1.6rem",
                                borderTop: "1px solid rgba(15, 23, 42, 0.10)",
                                maxWidth: 860,
                            }}
                        >
                            <h2 style={sectionTitleStyle}>For caregivers</h2>

                            <p style={paragraphStyle}>
                                Whether you're new to care work or an experienced professional, we share insights to support
                                your journey — with practical guidance and real-world context from the UK care sector.
                            </p>

                            <p style={topicsLabelStyle}>Topics we cover:</p>

                            <ul style={topicsListStyle}>
                                <li>Understanding the emotional aspects of care work</li>
                                <li>Building meaningful relationships with those you support</li>
                                <li>Navigating the care sector and finding fulfilling work</li>
                                <li>Self-care and avoiding burnout</li>
                                <li>Professional development and growth</li>
                                <li>Stories and perspectives from other caregivers</li>
                            </ul>

                            <p style={closingStyle}>
                                Caregiving is skilled, meaningful work. We’re here to support you in doing it well — while looking after yourself.
                            </p>
                        </section>
                    </div>

                    {tagCounts?.length > 0 && (
                        <aside className={classes.pageHeaderAside}>
                            <div className={classes.tagFlexContainer}>
                                <h2 className={classes.asideTitle}>Search by tags</h2>
                                <nav>
                                    <ul className={classes.tagsBar}>
                                        {tagCounts.slice(0, 20).map(({ tag, count }) => (
                                            <li key={tag}>
                                                <Tag label={`${tag} (${count})`} to={`/care-knowledge/tags/${tag}`} />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>
                    )}
                </header>

                <p className={classes.totalCount}>
                    Showing {start} – {end} of {total} articles
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

                    <span>
                        Page {page} of {totalPages}
                    </span>

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
