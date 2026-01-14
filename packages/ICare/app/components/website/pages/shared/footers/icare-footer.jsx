import React from "react";
import { NavLink } from "react-router";
import styles from "./icare-footer.module.scss";

export default function ICareFooter() {
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

  const LOGO_SRC = "/images/logo/icareblack.svg";

  return (
    <footer aria-label="Site footer" className={styles.footer}>
      <div className={styles.inner}>
        {/* TOP GRID */}
        <div className={styles.topGrid}>
          {/* BRAND + CONTACT */}
          <div className={styles.col}>
            <NavLink to="/" aria-label="ICare home" className={styles.brandLink}>
              <img src={LOGO_SRC} alt="ICare" className={styles.logo} />
              <span className={styles.slogan}>Care made human</span>
            </NavLink>

            <p className={styles.tagline}>
              A transparent marketplace connecting families with independent caregivers — without
              agency markups.
            </p>

            {/* <div className={styles.contactGrid}>
              <div>
                <div className={styles.label}>Email</div>
                <a href={`mailto:${COMPANY.email}`} className={styles.valueLinkStrong}>
                  {COMPANY.email}
                </a>
              </div>

              {COMPANY.phone ? (
                <div>
                  <div className={styles.label}>Phone</div>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className={styles.valueLink}>
                    {COMPANY.phone}
                  </a>
                </div>
              ) : null}
            </div> */}
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

              {COMPANY.vat ? (
                <div>
                  <div className={styles.label}>VAT number</div>
                  <div className={styles.value}>{COMPANY.vat}</div>
                </div>
              ) : null}

              <div className={styles.valueMuted}>Operated in the United Kingdom.</div>
            </div>
          </div>

          {/* LINKS */}
          <div className={styles.col}>
            <div className={styles.heading}>Links</div>

            <nav aria-label="Footer links" className={styles.links}>
              <NavLink to="/" className={styles.navLink}>
                Home
              </NavLink>
              <NavLink to="/how-it-works" className={styles.navLink}>
                How it works
              </NavLink>
              <NavLink to="/terms-of-service" className={styles.navLink}>
                Terms
              </NavLink>
              <NavLink to="/privacy" className={styles.navLink}>
                Privacy Policy
              </NavLink>
              <NavLink to="/cookies" className={styles.navLink}>
                Cookies
              </NavLink>
              <NavLink to="/contact-us" className={styles.navLink}>
                Contact Us
              </NavLink>
              <NavLink className={styles.navLink} to="/trust-and-safety">
                Trust and safety
              </NavLink>
            </nav>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {year} {COMPANY.brand}.<br /> All rights reserved.
          </div>

          <div className={styles.disclaimer}>
            ICare is an introductory marketplace (not a care agency).<br /> Caregivers are independent
            providers and agreements are made directly between families and caregivers (see Terms).
          </div>
        </div>
      </div>
    </footer>
  );
}
