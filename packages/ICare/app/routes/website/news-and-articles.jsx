import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { Link, NavLink, useLoaderData } from "react-router";
// import { getNewsList } from "../../lib/news.server";
import { urlFor } from "../../lib/sanityImage";
import classes from "./news-and-articles.module.scss";


export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));

  const limit = 2;
  const offset = (page - 1) * limit;


  const { getNewsListPaged, getTagCounts, getNewsCount } = await import("../../lib/news.server");
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
        <h1>News and articles</h1>

        <p className={classes.intro}>
          Updates, research and insights on aging, in-home care, workforce
          challenges, and the growing impact of care costs on families across
          the UK and Europe.
        </p>
        {tagCounts?.length > 0 && (
          <section>
            <h2>Search by tags</h2>
            <div className={classes.tagsBar}>
              {tagCounts.slice(0, 20).map(({ tag, count }) => (
                <Link key={tag} to={`/news-and-articles/tags/${tag}`} className={classes.tagChip}>
                  {tag} <span className={classes.tagCount}>({count})</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <p className={classes.totalCount}>
          Showing {(page - 1) * 2 + 1}–
          {Math.min(page * 2, total)} of {total} articles
        </p>
        <section className={classes.newsletter}>
          <div className={classes.newsletterInner}>
            <h2 className={classes.newsletterTitle}>Get monthly care insights</h2>
            <p className={classes.newsletterText}>
              Evidence-led updates on aging, in-home care, workforce pressures, and care
              costs across the UK and Europe. No spam — unsubscribe anytime.
            </p>

            <form
              className={classes.newsletterForm}
              method="post"
              action="/newsletter/subscribe"
            >
              <label className={classes.srOnly} htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={classes.newsletterInput}
                autoComplete="email"
              />

              <button type="submit" className={classes.newsletterButton}>
                Subscribe
              </button>
            </form>

            <p className={classes.newsletterFinePrint}>
              By subscribing you agree to receive emails from ICare. Unsubscribe at any
              time.
            </p>
          </div>
        </section>

        <ul className={classes.grid}>
          {posts.map((p) => (
            <li key={p._id} className={classes.newsCard}>
              <Link
                to={`/news-and-articles/${p.slug}`}
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
                      {new Date(p.publishedAt).toLocaleDateString()}
                    </small>
                  </div>

                  {p.subtitle && (
                    <p className={classes.subtitle}>{p.subtitle}</p>
                  )}

                  {p.excerpt && (
                    <p className={classes.excerpt}>{p.excerpt}</p>
                  )}

                  <div className={classes.tags}>
                    {p.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/news-and-articles/tags/${tag}`}
                        className={classes.tag}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                </div>
              </Link>
            </li>
          ))}
        </ul>
        <section className={classes.contribute}>
          <div className={classes.contributeInner}>
            <h2>Have something to contribute?</h2>
            <p>
              We welcome insights from carers, healthcare professionals, researchers,
              and people with lived experience of in-home care. If you have data,
              case studies, or stories that could help families, we’d love to hear from you.
            </p>
            <Link to="/contribute" className={classes.contributeButton}>
              Submit an article
            </Link>
          </div>
        </section>
        <div className={classes.pagination}>
          <Link
            to={`/news-and-articles?page=${page - 1}`}
            className={`${classes.pageBtn} ${page <= 1 ? classes.disabled : ""}`}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : 0}
          >
            ← Previous
          </Link>

          <span className={classes.pageInfo}>
            Page {page} of {totalPages}
          </span>

          <Link
            to={`/news-and-articles?page=${page + 1}`}
            className={`${classes.pageBtn} ${page >= totalPages ? classes.disabled : ""}`}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : 0}
          >
            Next →
          </Link>
        </div>

      </main>

      <ICareFooter />
    </div>
  );
}


