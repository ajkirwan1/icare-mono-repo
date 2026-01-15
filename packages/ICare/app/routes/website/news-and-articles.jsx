import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { Link, useLoaderData } from "react-router";
import { getNewsList } from "../../lib/news.server";

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
  const posts = await getNewsList();
  return { posts };
}

export default function TrustAndSafetyPage() {
  const { posts } = useLoaderData();
  return (
    <div style={{ minHeight: "100vh" }}>
      <ICareNavbar />
      <section style={styles.page}>
        <h1>News and articles</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((p) => (
            <li key={p._id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <Link to={`/news/${p.slug}`} style={{ fontSize: 18 }}>
                  {p.title}
                </Link>
                <small style={{ opacity: 0.7 }}>
                  {new Date(p.publishedAt).toLocaleDateString()}
                </small>
              </div>
              {p.excerpt ? <p style={{ margin: "8px 0 0" }}>{p.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      </section>
      <ICareFooter />
    </div>
  );
}
