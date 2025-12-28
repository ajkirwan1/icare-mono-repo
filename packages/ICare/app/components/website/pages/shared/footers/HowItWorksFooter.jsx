import React from "react";
import { Link } from "react-router";

export default function HowItWorksFooter() {
    const year = new Date().getFullYear();

    // ✅ FAKE DATA (podmień na swoje)
    const COMPANY = {
        brand: "ICare",
        legalName: "ICare Marketplace Ltd",
        companyNo: "12345678",
        jurisdiction: "Registered in England & Wales",
        registeredOffice: "12 High Street, Cheltenham, GL50 1AA, United Kingdom",
        email: "customershelp@icare.com",
        phone: "+44 20 1234 5678",
        vat: "GB123456789", // optional
    };

    // ✅ ONE TEXT COLOR FOR WHOLE FOOTER
    const TEXT = "#0F172A";

    const colors = {
        bg: "#fff9ef",
        text: TEXT,
        muted: TEXT,
        light: TEXT,
        border: "rgba(15,23,42,0.18)",
        hoverBg: "rgba(15,23,42,0.08)",
    };

    const heading = {
        color: colors.text,
        fontWeight: 800,
        fontSize: "0.98rem",
        marginBottom: 12,
        letterSpacing: "-0.15px",
    };

    const label = {
        color: colors.text,
        fontWeight: 700,
        fontSize: "0.9rem",
        marginBottom: 4,
        letterSpacing: "-0.1px",
        opacity: 0.9,
    };

    const value = {
        color: colors.text,
        fontWeight: 560,
        fontSize: "0.95rem",
        lineHeight: 1.5,
        opacity: 0.9,
    };

    const linkBase = {
        color: colors.text,
        textDecoration: "none",
        fontWeight: 650,
        fontSize: "0.98rem",
        padding: "6px 10px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        transition: "background-color .16s ease, color .16s ease, transform .16s ease, opacity .16s ease",
        opacity: 0.95,
    };

    const onEnter = (e) => {
        e.currentTarget.style.background = colors.hoverBg;
        e.currentTarget.style.color = colors.text; // stays same
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.opacity = "1";
    };

    const onLeave = (e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = colors.text; // stays same
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.opacity = "0.95";
    };

    return (
        <footer
            aria-label="Site footer"
            style={{
                background: colors.bg,
                borderTop: `1px solid ${colors.border}`,
                color: colors.text, // ✅ whole footer text color
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    padding: "clamp(32px,4vw,52px) clamp(18px,4vw,44px)",
                }}
            >
                {/* TOP GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.35fr 1fr 1fr",
                        gap: "clamp(18px,3vw,42px)",
                        alignItems: "start",
                        justifyItems: "start",
                        textAlign: "left",
                    }}
                >
                    {/* BRAND + CONTACT */}
                    <div style={{ width: "100%" }}>
                        <div
                            style={{
                                fontWeight: 850,
                                letterSpacing: "-0.35px",
                                color: colors.text,
                                fontSize: "1.22rem",
                                lineHeight: 1.1,
                            }}
                        >
                            {COMPANY.brand}
                        </div>

                        <p
                            style={{
                                margin: "12px 0 0",
                                color: colors.text,
                                lineHeight: 1.6,
                                maxWidth: "52ch",
                                fontSize: "0.98rem",
                                fontWeight: 520,
                                opacity: 0.9,
                            }}
                        >
                            A transparent marketplace connecting families with caregivers — without agency markups.
                        </p>

                        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
                            <div>
                                <div style={label}>Email</div>
                                <a
                                    href={`mailto:${COMPANY.email}`}
                                    style={{ ...value, textDecoration: "none", color: colors.text }}
                                    onMouseEnter={onEnter}
                                    onMouseLeave={onLeave}
                                >
                                    {COMPANY.email}
                                </a>
                            </div>

                            <div>
                                <div style={label}>Phone</div>
                                <a
                                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                                    style={{ ...value, textDecoration: "none", color: colors.text }}
                                    onMouseEnter={onEnter}
                                    onMouseLeave={onLeave}
                                >
                                    {COMPANY.phone}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* LEGAL DETAILS (UK) */}
                    <div style={{ width: "100%" }}>
                        <div style={heading}>Company details</div>

                        <div style={{ display: "grid", gap: 12 }}>
                            <div>
                                <div style={label}>Legal name</div>
                                <div style={value}>{COMPANY.legalName}</div>
                            </div>

                            <div>
                                <div style={label}>Company number</div>
                                <div style={value}>{COMPANY.companyNo}</div>
                            </div>

                            <div>
                                <div style={label}>Registered office</div>
                                <div style={value}>{COMPANY.registeredOffice}</div>
                            </div>

                            <div style={{ ...value, opacity: 0.85 }}>{COMPANY.jurisdiction}</div>
                        </div>
                    </div>

                    {/* LINKS (ROUTING) */}
                    <div style={{ width: "100%" }}>
                        <div style={heading}>Links</div>

                        <nav aria-label="Footer links" style={{ display: "grid", gap: 10 }}>
                            <Link to="/" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Home
                            </Link>

                            <Link
                                to="/how-it-works"
                                style={linkBase}
                                onMouseEnter={onEnter}
                                onMouseLeave={onLeave}
                            >
                                How it works
                            </Link>

                            <Link to="/landing" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Landing
                            </Link>

                            <Link to="/terms" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Terms
                            </Link>

                            <Link to="/privacy" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Privacy Policy
                            </Link>

                            <Link to="/cookies" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Cookies
                            </Link>

                            <Link to="/contact" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* DIVIDER */}
                <div
                    style={{
                        height: 1,
                        background: colors.border,
                        margin: "22px 0 14px",
                    }}
                />

                {/* BOTTOM BAR */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.3fr",
                        gap: 12,
                        alignItems: "start",
                        color: colors.text,
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        lineHeight: 1.5,
                        opacity: 0.9,
                    }}
                >
                    <div>
                        © {year} {COMPANY.legalName}. All rights reserved.
                    </div>

                    <div style={{ maxWidth: 760 }}>
                        ICare is a marketplace. Caregivers are independent providers and agreements are made
                        directly between families and caregivers (see Terms).
                    </div>
                </div>
            </div>
        </footer>
    );
}
