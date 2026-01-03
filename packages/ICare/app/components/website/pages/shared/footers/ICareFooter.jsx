import React from "react";
import { Link } from "react-router";
import styles from "./ReceiversFooter.module.scss";

export default function ReceiversFooter() {
    const year = new Date().getFullYear();

    // ✅ MVP-friendly: no personal name shown in UI
    const COMPANY = {
        brand: "ICare",
        operatorLabel: "ICare (sole trader, UK)",
        tradingAs: "ICare",
        location: "Cheltenham, United Kingdom",
        email: "customershelp@icare.com",
        phone: "", // leave empty to hide phone
        vat: "",
    };

    const LOGO_SRC = "/images/logo/icare14.svg";

    return (
        <footer aria-label="Site footer" className={styles.footer}>
            <div className={styles.inner}>
                {/* TOP GRID */}
                <div className={styles.topGrid}>
                    {/* BRAND + CONTACT */}
                    <div className={styles.col}>
                        <Link to="/" aria-label="ICare home" className={styles.brandLink}>
                            <img src={LOGO_SRC} alt="ICare" className={styles.logo} />
                        </Link>

                        <p className={styles.tagline}>
                            A transparent marketplace connecting families with independent caregivers — without
                            agency markups.
                        </p>

                        <div className={styles.contactGrid}>
                            <div>
                                <div className={styles.label}>Email</div>
                                <a href={`mailto:${COMPANY.email}`} className={styles.valueLinkStrong}>
                                    {COMPANY.email}
                                </a>
                            </div>

                            {COMPANY.phone ? (
                                <div>
                                    <div className={styles.label}>Phone</div>
                                    <a
                                        href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                                        className={styles.valueLink}
                                    >
                                        {COMPANY.phone}
                                    </a>
                                </div>
                            ) : null}
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
                            <Link to="/" className={styles.navLink}>
                                Home
                            </Link>
                            <Link to="/how-it-works" className={styles.navLink}>
                                How it works
                            </Link>
                            <Link to="/terms" className={styles.navLink}>
                                Terms
                            </Link>
                            <Link to="/privacy" className={styles.navLink}>
                                Privacy Policy
                            </Link>
                            <Link to="/cookies" className={styles.navLink}>
                                Cookies
                            </Link>
                            <Link to="/contact" className={styles.navLink}>
                                Contact
                            </Link>
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
                        ICare is an introductory marketplace (not a care agency). Caregivers are independent
                        providers and agreements are made directly between families and caregivers (see Terms).
                    </div>
                </div>
            </div>
        </footer>
    );
}
