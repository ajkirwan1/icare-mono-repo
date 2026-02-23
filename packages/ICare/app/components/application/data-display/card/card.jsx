import styles from "./card.module.scss";
import NotificationsLabel from "../../ui/notifications-label/notifications-label";
import { NavLink } from "react-router";

function SectionHeader({ title, subtitle, cta, icon }) {
  return (
    <header className={styles.header}>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "space-between" }}>
        {/* <NotificationsLabel /> */}
        <h3 className={styles.title}>{icon && <span className={styles.titleIcon}>{icon}</span>}{title}</h3>
        {cta && <NavLink to={cta.to} className={styles.cta}>{cta}</NavLink>}
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
  icon,
  children,
  footerLinks
}) {

  return (
    <article className={styles.card}>
      {(title || subtitle || cta) && (
        <SectionHeader title={title} subtitle={subtitle} cta={cta} icon={icon} />
      )}
      {children}
      <SectionFooter links={footerLinks} />
    </article>
  );
}
