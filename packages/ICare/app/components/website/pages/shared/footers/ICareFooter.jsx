import React from "react";
import { NavLink, Link } from "react-router";
import styles from "./ReceiversFooter.module.scss";

export default function ReceiversFooter() {
  const year = new Date().getFullYear();

  const COMPANY = {
    brand: "ICare",
    operatorLabel: "ICare (sole trader, UK)",
    tradingAs: "ICare",
    location: "Cheltenham, United Kingdom",
    email: "customershelp@icare.com",
    phone: "",
    vat: ""
  };

  const LOGO_SRC = "/images/logo/icare17footer.svg";

  // ✅ 20% bigger + black text
  const footerStyle = {
    fontSize: "120%",
    color: "#0F172A"
  };

  // ✅ email to the left
  const contactLeft = { textAlign: "left" };
  const emailLeft = { textAlign: "left", display: "inline-block", color: "#0F172A", marginLeft: "-10px" };

  // ✅ logo 30% bigger
  const logoStyle = { transform: "scale(1.3)", transformOrigin: "left center" };

  return (
    <footer aria-label="Site footer" className={styles.footer} style={footerStyle}>
      <div className={styles.inner}>
        {/* TOP GRID */}
        <div className={styles.topGrid}>
          {/* BRAND + CONTACT */}
          <div className={styles.col}>
            <Link to="/" aria-label="ICare home" className={styles.brandLink}>
              <img src={LOGO_SRC} alt="ICare" className={styles.logo} style={logoStyle} />
            </Link>

            <p className={styles.tagline} style={{ color: "rgb(15, 23, 42)" }}>
              A transparent marketplace connecting families with independent caregivers — without
              agency markups.
            </p>

            <div className={styles.contactGrid} style={contactLeft}>
              <div>
                <div className={styles.label} style={{ color: "rgb(15, 23, 42)" }}>
                  Email
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className={styles.valueLinkStrong}
                  style={emailLeft}
                >
                  {COMPANY.email}
                </a>
              </div>

              {COMPANY.phone ? (
                <div>
                  <div className={styles.label} style={{ color: "#000" }}>
                    Phone
                  </div>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className={styles.valueLink}
                    style={{ textAlign: "left", display: "inline-block", color: "#000" }}
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* BUSINESS DETAILS */}
          <div className={styles.col}>
            <div className={styles.heading} style={{ color: "#000" }}>
              Business details
            </div>

            <div className={styles.detailsGrid}>
              <div>
                <div className={styles.label} style={{ color: "#000" }}>
                  Operator
                </div>
                <div className={styles.value} style={{ color: "#000" }}>
                  {COMPANY.operatorLabel}
                </div>
              </div>

              <div>
                <div className={styles.label} style={{ color: "#000" }}>
                  Location
                </div>
                <div className={styles.value} style={{ color: "#000" }}>
                  {COMPANY.location}
                </div>
              </div>

              {COMPANY.vat ? (
                <div>
                  <div className={styles.label} style={{ color: "#000" }}>
                    VAT number
                  </div>
                  <div className={styles.value} style={{ color: "#000" }}>
                    {COMPANY.vat}
                  </div>
                </div>
              ) : null}

              <div className={styles.valueMuted} style={{ color: "#000" }}>
                Operated in the United Kingdom.
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div className={styles.col}>
            <div className={styles.heading} style={{ color: "#000" }}>
              Links
            </div>

            <nav aria-label="Footer links" className={styles.links}>
              <Link to="/" className={styles.navLink} style={{ color: "#0F172A" }}>
                Home
              </Link>
              <Link to="/how-it-works" className={styles.navLink} style={{ color: "#0F172A" }}>
                How it works
              </Link>
              <Link to="/terms-of-service" className={styles.navLink} style={{ color: "#0F172A" }}>
                Terms
              </Link>
              <Link to="/privacy" className={styles.navLink} style={{ color: "#0F172A" }}>
                Privacy Policy
              </Link>
              <Link to="/cookies" className={styles.navLink} style={{ color: "#0F172A" }}>
                Cookies
              </Link>
              <Link to="/contact" className={styles.navLink} style={{ color: "#0F172A" }}>
                Contact
              </Link>
              <NavLink className={styles.navLink} style={{ color: "#0F172A" }} to="trust-and-safety">Trust and safety</NavLink>
            </nav>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright} style={{ color: "#000" }}>
            © {year} {COMPANY.brand}.<br /> All rights reserved.
          </div>

          <div className={styles.disclaimer} style={{ color: "#000" }}>
            ICare is an introductory marketplace (not a care agency). Caregivers are independent
            providers and agreements are made directly between families and caregivers (see Terms).
          </div>
        </div>
      </div>
    </footer>
  );
}
