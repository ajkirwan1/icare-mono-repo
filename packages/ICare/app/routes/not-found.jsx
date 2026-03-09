import { NavLink } from "react-router";
import ICareNavbar from "~/components/website/pages/shared/icare-navbar";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import styles from "~/styles/pages/not-found.module.scss";

export async function loader() {
  throw new Response("Not Found", { status: 404 });
}

export default function NotFoundPage() {
  const links = [
    { label: "Home", to: "/" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "FAQs", to: "/frequently-asked-questions" },
    { label: "Contact Us", to: "/contact-us" }
  ];

  return (
    <>
      <ICareNavbar />
      <section aria-label="Page not found" className={styles.wrap}>
        <div className={styles.overlay} />
        <div className={styles.card}>
          <p className={styles.code}>404</p>
          <h1 className={styles.heading}>Page not found</h1>
          <p className={styles.desc}>
            {"Sorry, the page you're looking for doesn't exist or has been moved. Try one of the links below to get back on track."}
          </p>
          <div className={styles.linksWrap}>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={styles.link}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </section>
      <ICareFooter />
    </>
  );
}
