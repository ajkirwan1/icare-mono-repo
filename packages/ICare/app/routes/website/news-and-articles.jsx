import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { Link, useLoaderData } from "react-router";
// import { getNewsList } from "../../lib/news.server";
import { urlFor } from "../../lib/sanityImage";
import classes from "./news-and-articles.module.scss";


const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 1rem",
    paddingTop: "calc(var(--navbar-height) + 5vh)",
    display: "grid",
    gap: "3rem"
  },
  section: {
    display: "grid",
    gap: "1rem"
  },
  intro: {
    lineHeight: 1.6
  },
  introImage: {
    width: "420px",
    maxWidth: "45%",
    height: "auto",
    float: "right",
    margin: "0 0 1.5rem 2rem",
    borderRadius: "12px"
  }
};

export async function loader() {
  const { getNewsList } = await import("../../lib/news.server");
  const posts = await getNewsList();
  return { posts };
}

export default function NewsAndArticlesPage() {
  const { posts } = useLoaderData();

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

                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className={classes.tags}>
                      {p.tags.map((tag) => (
                        <span key={tag} className={classes.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <ICareFooter />
    </div>
  );
}


