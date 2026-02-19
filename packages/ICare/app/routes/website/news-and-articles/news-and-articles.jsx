import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import { NavLink, useLoaderData } from "react-router";
import { urlFor } from "../../../lib/sanityImage";
import classes from "~/styles/pages/news-and-articles/news-and-articles.module.scss";
import Tag from "~/components/website/common/tags/tag";
import EngagementSection from "~/components/website/common/sections/engagement-section";

export const meta = () => {
  const title = "Care guidance | ICare";
  const description = "Expert articles and practical guidance on home care in the UK for families and caregivers.";
  const url = "https://icare-app.co.uk/care-knowledge";
  const image = "https://icare-app.co.uk/images/og/default.jpg";

  return [
    { title },
    { name: "description", content: description },
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
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/care-knowledge" }
  ];
};

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

  return { posts, tagCounts, page, totalPages, total, limit };
}

export default function NewsAndArticlesPage() {
  const { posts, tagCounts, total, page, limit } = useLoaderData();

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ICareNavbar />

      <main className={classes.page}>
        <div className={classes.pageHeaderMain}>
          <h1>Care guidance</h1>

          <p className={classes.intro}>
            Stay informed with clear, up-to-date guidance on home care in the UK.
            <br />
            Care guidance brings together practical explanations, evolving standards and real-world context
            to support everyday care decisions - from early questions to ongoing support at home.
          </p>
        </div>

        <header className={classes.pageHeader}>
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

        <div className={classes.pageContent}>
          <section className={classes.twoCols} aria-label="For families and caregivers">
            {/* === FAMILIES: INTRO (row 1 col 1) === */}
            <div className={`${classes.block} ${classes.familiesIntro}`}>
              <h2 className={classes.sectionTitle}>For families</h2>

              <p className={classes.paragraph}>
                If you're caring for an elderly parent or relative, you'll find guidance on the questions that
                often feel hardest to answer from early concerns to ongoing support at home.
              </p>

              <p className={classes.paragraphSmall}>
                We cover practical topics to help you understand options, prepare for conversations, and feel
                more confident in your decisions without pressure or assumptions.
              </p>
            </div>

            {/* === CAREGIVERS: INTRO (row 1 col 2) === */}
            <div className={`${classes.block} ${classes.caregiversIntro}`}>
              <h2 className={classes.sectionTitle}>For caregivers</h2>

              <p className={classes.paragraph}>
                Whether you're new to care work or an experienced professional, we share insights to support
                your journey with practical guidance and real-world context from the UK care sector.
              </p>
            </div>

            {/* === FAMILIES: BODY (row 2 col 1) === */}
            <div className={`${classes.block} ${classes.familiesBody}`}>
              <h3 className={classes.topicsHeading}>Topics we cover</h3>

              <div>
                <ul className={classes.topicsList}>
                  <li>Recognising when your loved one may need more support</li>
                  <li>Understanding different types of care and companionship</li>
                  <li>Having difficult conversations with family members</li>
                  <li>Navigating guilt, worry, and emotional overwhelm</li>
                  <li>Finding trusted help that respects dignity and independence</li>
                  <li>Research and statistics to support informed decisions</li>
                </ul>

                <p className={classes.closing}>
                  Our goal is to help you feel more informed, supported, and less alone.
                </p>
              </div>
            </div>

            {/* === CAREGIVERS: BODY (row 2 col 2) === */}
            <div className={`${classes.block} ${classes.caregiversBody}`}>
              <h3 className={classes.topicsHeading}>Topics we cover</h3>

              <div>
                <ul className={classes.topicsList}>
                  <li>Understanding the emotional aspects of care work</li>
                  <li>Building meaningful relationships with those you support</li>
                  <li>Navigating the care sector and finding fulfilling work</li>
                  <li>Self-care and avoiding burnout</li>
                  <li>Professional development and growth</li>
                  <li>Stories and perspectives from other caregivers</li>
                </ul>
                <p className={classes.closing}>
                  Caregiving is skilled, meaningful work. We&apos;re here to support you in doing it well while looking after yourself.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className={classes.engagementCompact}>
          <EngagementSection />
        </div>
      </main>
      <ICareFooter />
    </div>
  );
}
