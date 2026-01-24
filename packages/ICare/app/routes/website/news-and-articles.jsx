import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import { Link, NavLink, useLoaderData, useNavigation, useFetcher } from "react-router";
import { urlFor } from "../../lib/sanityImage";
import classes from "./news-and-articles.module.scss";
import Tag from "~/components/website/common/tags/tag";
import SubmitButton from "../../components/website/common/buttons/submit-buttons/submit-button";
import NavigationButton from "~/components/website/common/buttons/navigation-buttons/navigation-button";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

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


  const { getNewsListPaged, getTagCounts, getNewsCount } = await import("../../lib/news.server");
  const [posts, tagCounts, total] = await Promise.all([getNewsListPaged({ offset, limit }), getTagCounts(), getNewsCount()]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { posts, tagCounts, page, totalPages, total };
}


export async function action({ request }) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim(); // honeypot
  const delayMs = Math.min(Number(formData.get("_delay") || 0), 2000); // cap at 2s

  // Honeypot: real users won't fill it, bots often will.
  // Return ok:true so bots don't learn.
  if (company) {
    if (delayMs) { await sleep(delayMs); }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (delayMs) { await sleep(delayMs); }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Please enter a valid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log(import.meta.env.VITE_API_URL, "VITE");

  const apiUrl = import.meta.env.VITE_API_URL; // THIS is correct for Vite

  if (!apiUrl) {
    return new Response(
      JSON.stringify({ ok: false, error: "Server misconfigured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const resp = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "news-page" })
  });

  if (!resp.ok) {
    let message = "Subscription failed.";
    try {
      const data = await resp.json();
      message = data?.error || message;
    } catch { }

    return new Response(
      JSON.stringify({ ok: false, error: message }),
      { status: resp.status, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}

export default function NewsAndArticlesPage() {
  const { posts, tagCounts, totalPages, total, page } = useLoaderData();
  const fetcher = useFetcher();
  const result = fetcher.data;
  // const navigation = useNavigation();

  const isSubmitting = fetcher.state === "submitting";

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
                          to={`/news-and-articles/tags/${tag}`}
                        />
                      </li>
                    ))}
                  </ul>

                  <div className={classes.carouselControls}>
                    <button
                      type="button"
                      className={classes.carouselBtn}
                      aria-label="Scroll tags left"
                      onClick={() => {
                        const el = document.getElementById("tags-carousel");
                        el?.scrollBy({ left: -300, behavior: "smooth" });
                      }}
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className={classes.carouselBtn}
                      aria-label="Scroll tags right"
                      onClick={() => {
                        const el = document.getElementById("tags-carousel");
                        el?.scrollBy({ left: 300, behavior: "smooth" });
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </nav>
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
                        {formatDate(p.publishedAt)}
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
                        <>
                          <Tag
                            label={tag}
                            to={`/news-and-articles/tags/${tag}`}
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
        <section className={classes.engagement}>
          <div className={classes.engagementInner}>

            {/* Newsletter */}
            <div className={classes.newsletterBlock}>
              <h2 className={classes.newsletterTitle}>Get monthly care insights</h2>
              <p className={classes.newsletterText}>
                Evidence-led updates on aging, in-home care, workforce pressures, and care
                costs across the UK and Europe. No spam — unsubscribe anytime.
              </p>

              <fetcher.Form className={classes.newsletterForm} method="post">
                {/* Honeypot field (hidden) */}
                <div className={classes.hpWrap} aria-hidden="true">
                  <label className={classes.hpLabel} htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className={classes.hpInput}
                  />
                </div>

                {/* Optional artificial delay (dev: 600ms). Set to 0 in prod if you want. */}
                <input type="hidden" name="_delay" value="6000" />

                <label className={classes.srOnly} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={classes.newsletterInput}
                  autoComplete="email"
                />

                <SubmitButton
                  variant="tertiary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className={classes.btnSpinnerWrap}>
                      <span className={classes.spinner} aria-hidden="true" />
                      Subscribing…
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </SubmitButton>
                Subscribe to ICare

                {/* Inline feedback */}
                {result?.ok && !isSubmitting && (
                  <p className={classes.newsletterFinePrint}>Thanks — you’re subscribed.</p>
                )}
                {result?.ok === false && !isSubmitting && (
                  <p className={classes.newsletterFinePrintError}>{result.error}</p>
                )}
              </fetcher.Form>


              {result?.ok && (
                <p className={classes.newsletterFinePrint}>
                  Thanks — you’re subscribed.
                </p>
              )}

              <p className={classes.newsletterFinePrint}>
                Unsubscribe anytime. We respect your privacy.
              </p>
            </div>

            {/* Contribute */}
            <div className={classes.contributeBlock}>
              <h2>Have something to contribute?</h2>
              <p>
                We welcome insights from carers, healthcare professionals, researchers,
                and people with lived experience of in-home care.
              </p>
              <p>
                If you have data, case studies, or stories that could help families,
                we’d love to hear from you.
              </p>

              <NavigationButton to="/contribute">Submit an article</NavigationButton>
            </div>

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


