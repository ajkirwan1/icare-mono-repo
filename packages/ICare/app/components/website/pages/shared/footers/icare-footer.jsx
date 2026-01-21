import React from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faLinkedin,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
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
        vat: "",
        socials: {
            instagram: "https://www.instagram.com/icare",
            linkedin: "https://www.linkedin.com/company/icare",
            facebook: "https://www.facebook.com/icare",
        },
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
                            A transparent marketplace connecting families with independent caregivers <br />without
                            agency markups.
                        </p>

                        {/* ✅ SOCIAL ICONS */}
                        <div className={styles.socials}>
                            <a
                                href={COMPANY.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="ICare on Instagram"
                                className={styles.socialLink}
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>

                            <a
                                href={COMPANY.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="ICare on LinkedIn"
                                className={styles.socialLink}
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>

                            <a
                                href={COMPANY.socials.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="ICare on Facebook"
                                className={styles.socialLink}
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
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
                            <NavLink to="/" className={styles.navLink}>Home</NavLink>
                            <NavLink to="/how-it-works" className={styles.navLink}>How it works</NavLink>
                            <NavLink to="/terms-of-service" className={styles.navLink}>Terms</NavLink>
                            <NavLink to="/privacy" className={styles.navLink}>Privacy Policy</NavLink>
                            <NavLink to="/cookies" className={styles.navLink}>Cookies</NavLink>
                            <NavLink to="/contact-us" className={styles.navLink}>Contact Us</NavLink>
                            <NavLink to="/trust-and-safety" className={styles.navLink}>
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
                        ICare is a marketplace that helps families and caregivers connect directly.<br />
                        Caregivers work independently, and care arrangements are agreed<br /> directly between families and caregivers (see <strong>Terms</strong>).
                    </div>
                </div>
            </div>
        </footer>
    );
}
