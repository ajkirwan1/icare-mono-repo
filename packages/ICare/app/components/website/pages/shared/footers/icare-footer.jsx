import React from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import styles from "./icare-footer.module.scss";

export default function ICareFooter() {
  const year = new Date().getFullYear();

  const COMPANY = {
    brand: "ICare",
    operatorLabel: "ICare (sole trader, UK)",
    tradingAs: "ICare",
    location: "Cheltenham, United Kingdom",
    email: "customershelp@icare.com",
    socials: {
      linkedin: "https://www.linkedin.com/company/icare",
      facebook: "https://www.facebook.com/profile.php?id=61587936540417"
    }
  };

  const LOGO_SRC = "/images/logo/icareblack.svg";

  const iconStyle = {
    fontSize: "0.9em",
    lineHeight: 1
  };

  const handleShare = async () => {
    const shareData = {
      title: "ICare",
      text: "A transparent way to arrange home care — without agency markups.",
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — silent
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
      } catch {
        // silent fail
      }
    }
  };

  return (
    <footer aria-label="Site footer" className={styles.footer}>
      <div className={styles.inner}>
        {/* TOP GRID */}
        <div className={styles.topGrid}>
          {/* BRAND */}
          <div className={styles.col}>
            <NavLink to="/" aria-label="ICare home" className={styles.brandLink}>
              <img src={LOGO_SRC} alt="ICare" className={styles.logo} />
              <span className={styles.slogan}>Care made human</span>
            </NavLink>

            <p className={styles.tagline}>
              A transparent marketplace connecting families with independent caregivers without agency markups.
            </p>

            {/* SOCIAL ICONS + SHARE */}
            <div className={styles.socials}>
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ICare on LinkedIn"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
              </a>

              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ICare on Facebook"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
              </a>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share ICare"
                className={styles.socialLink}
              >
                <FontAwesomeIcon icon={faShareNodes} style={iconStyle} />
              </button>
            </div>
          </div>

          {/* BUSINESS DETAILS */}
          <div className={styles.col}>
            <div className={styles.heading}>Business details</div>

            <div className={styles.detailsGrid}>
              <div>
                <div className={styles.label}>Operator</div>
                <div className={styles.value}>{COMPANY.operatorLabel}</div>
              </div>

              <div>
                <div className={styles.label}>Location</div>
                <div className={styles.value}>{COMPANY.location}</div>
              </div>

              <div className={styles.valueMuted}>Operated in the United Kingdom.</div>
            </div>
          </div>

          {/* LINKS */}
          <div className={styles.col}>
            <nav aria-label="Footer links" className={styles.links}>
              <NavLink to="/" className={styles.navLink}>Home</NavLink>
              <NavLink to="/how-it-works" className={styles.navLink}>How it works</NavLink>
              <NavLink to="/who-we-are" className={styles.navLink}>Who we are</NavLink>
              <NavLink to="/care-knowledge" className={styles.navLink}>Care guidance</NavLink>
              <NavLink to="/trust-and-safety" className={styles.navLink}>Trust & safety</NavLink>
              <NavLink to="/contact-us" className={styles.navLink}>Contact us</NavLink>
              <NavLink to="/frequently-asked-questions" className={styles.navLink}>FAQ</NavLink>
            </nav>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM BAR: legal left / copyright right */}
        <div className={styles.bottomBar}>
          <div className={styles.legalLinks} aria-label="Legal links">
            <NavLink to="/safety-commitment">Safety commitment</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
          </div>

          <div className={styles.copyright}>
            © {year} {COMPANY.brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
