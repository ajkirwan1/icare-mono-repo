import styles from "./card.module.scss";
import NotificationsLabel from "../../ui/notifications-label/notifications-label";
import { NavLink } from "react-router";

function SectionHeader({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* <NotificationsLabel /> */}
          <h3 className={styles.title}>{title}</h3>
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}

function SectionFooter({ links }) {
  if (!links || links.length === 0) { return null; }

  return (
    <footer className={styles.footer}>
      {links.map((link, index) => (
        <NavLink key={index} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </footer>
  );
}

export default function Card({
  title,
  subtitle,
  cta,
  children,

  // NEW (preferred)
  footerLinks,

  // OLD (still supported)
  footerLinkContent,
  footerLinkTo
}) {
  const resolvedFooterLinks = footerLinks?.length
    ? footerLinks
    : footerLinkContent && footerLinkTo
      ? [{ to: footerLinkTo, label: footerLinkContent }]
      : [];

  return (
    <article className={styles.card}>
      {(title || subtitle || cta) && (
        <SectionHeader title={title} subtitle={subtitle} cta={cta} />
      )}

      {children}

      <SectionFooter links={resolvedFooterLinks} />
    </article>
  );
}
