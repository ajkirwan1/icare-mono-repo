import React from "react";
import { Link } from "react-router";
import privacySrc from "/images/heros/privacy.jpg";
import ICareNavbar from "~/components/website/pages/shared/ICareNavbar";

export default function PrivacyPage() {
    const COLORS = {
        heroBg: "#0f172a",
        pageBg: "#fff9ef",
        panel: "rgba(255,255,255,0.92)",
        border: "rgba(15,23,42,0.10)",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        chipBg: "rgba(15,23,42,0.05)",
        heroChipBg: "rgba(31,171,31,0.20)",
        heroChipBorder: "rgba(31,171,31,0.45)",
    };

    // ✅ EDIT THESE (MVP)
    const COMPANY = {
        brand: "ICare",
        operator: "Katarzyna Kruk (sole trader)",
        tradingAs: "ICare",
        email: "customershelp@icare.com",
        address: "Cheltenham, Gloucestershire, GL50 1AA, United Kingdom",
        lastUpdated: "January 1, 2026",
    };

    const sectionIdStyle = { scrollMarginTop: 110 };

    // ✅ more spacing
    const heroNavWrap = {
        marginTop: 26,
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
    };

    const heroPillLink = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(2,8,23,0.26)",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 850,
        fontSize: ".92rem",
        backdropFilter: "blur(6px)",
    };

    const pageWrap = {
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: COLORS.pageBg,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
        color: COLORS.text,
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    // ✅ bigger vertical padding
    const container = {
        width: "min(1040px, 92vw)",
        margin: "0 auto",
        padding: "clamp(52px, 6vw, 88px) 0",
    };

    // ✅ bigger panel padding
    const panel = {
        background: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 22,
        padding: "clamp(22px, 3.2vw, 42px)",
        boxShadow: "0 18px 46px rgba(15,23,42,0.08)",
    };

    const h2 = {
        margin: "0 0 14px",
        fontWeight: 950,
        letterSpacing: "-0.3px",
        fontSize: "1.18rem",
        color: COLORS.text,
    };

    // ✅ more line-height + spacing
    const p = {
        margin: "0 0 16px",
        color: COLORS.text,
        lineHeight: 1.8,
        fontWeight: 650,
        fontSize: "1rem",
    };

    const small = {
        margin: "0 0 16px",
        color: COLORS.muted,
        lineHeight: 1.75,
        fontWeight: 650,
        fontSize: ".95rem",
    };

    // ✅ more list spacing
    const ul = {
        margin: "14px 0 18px",
        paddingLeft: 18,
        display: "grid",
        gap: 10,
        color: COLORS.text,
        lineHeight: 1.75,
        fontWeight: 650,
    };

    // ✅ much more section spacing
    const section = {
        paddingTop: 28,
        marginTop: 28,
        borderTop: `1px solid ${COLORS.border}`,
    };

    // ✅ add chips back if you want later (kept styles)
    const chipRow = {
        marginTop: 18,
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
    };

    const chip = {
        padding: "9px 12px",
        borderRadius: 999,
        background: COLORS.chipBg,
        border: `1px solid ${COLORS.border}`,
        fontWeight: 800,
        fontSize: ".88rem",
        color: COLORS.text,
    };

    const a = {
        color: COLORS.text,
        fontWeight: 900,
        textDecoration: "none",
        borderBottom: "1px solid rgba(15,23,42,0.22)",
    };

    // ✅ bigger note box spacing
    const noteBox = {
        marginTop: 18,
        padding: "16px 16px",
        borderRadius: 16,
        background: "rgba(15,23,42,0.04)",
        border: `1px solid ${COLORS.border}`,
        color: COLORS.text,
        lineHeight: 1.7,
        fontWeight: 650,
    };

    const codeLine = {
        margin: 0,
        fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: ".92rem",
        whiteSpace: "pre-wrap",
        color: COLORS.text,
        lineHeight: 1.7,
    };

    return (
        <>
            {/* ✅ Smooth scroll + offset */}
            <style>{`
        html { scroll-behavior: smooth; }
        #who, #data, #use, #emails, #law, #share, #retain, #rights, #contact {
          scroll-margin-top: 110px;
        }
      `}</style>

            {/* ================= HERO ================= */}
            <section
                aria-label="Privacy hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(640px, 78vh, 920px)",
                    width: "100%",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center left",
                    color: "#fff",
                    background: COLORS.heroBg,
                    fontFamily:
                        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                {/* Background */}
                <img
                    src={privacySrc}
                    alt="Privacy background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.75) contrast(1.05)",
                    }}
                />

                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,.38), rgba(0,0,0,.58))",
                    }}
                />

                <ICareNavbar />

                {/* Header layer */}
                <header
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(2,8,23,0.28)",
                        backdropFilter: "saturate(1.05) blur(4px)",
                        borderBottom: "1px solid rgba(255,255,255,0.14)",
                        height: 0,
                    }}
                />

                {/* Hero Copy */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(92vw, 1100px)",
                        paddingLeft: "clamp(18px, 4vw, 60px)",
                        paddingRight: "clamp(18px, 4vw, 60px)",
                    }}
                >
                    <h1
                        style={{
                            margin: "0 0 1.2rem",
                            fontWeight: 950,
                            fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
                            color: "#fff",
                            letterSpacing: "-0.6px",
                            lineHeight: 1.05,
                        }}
                    >
                        Privacy
                    </h1>

                    <p
                        style={{
                            margin: "0",
                            fontSize: "clamp(1.1rem, 1.2vw, 1.16rem)",
                            color: "rgba(255,255,255,.96)",
                            maxWidth: "66ch",
                            lineHeight: 1.8,
                            fontWeight: 650,
                        }}
                    >
                        We design ICare with privacy-first principles.<br />
                        Below you will find what we collect, why, and how to exercise your rights.
                    </p>

                    <div style={heroNavWrap} aria-label="Privacy on-page navigation">
                        {[
                            ["#who", "Who we are"],
                            ["#data", "Data we collect"],
                            ["#use", "How we use data"],
                            ["#emails", "Emails"],
                            ["#law", "Legal basis"],
                            ["#share", "Sharing"],
                            ["#retain", "Retention"],
                            ["#rights", "Your rights"],
                            ["#contact", "Contact"],
                        ].map(([href, label]) => (
                            <a key={href} href={href} style={heroPillLink}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <main style={pageWrap} aria-label="Privacy Policy content">
                <div style={container}>
                    <section style={panel}>
                        <div style={{ marginTop: 4 }}>
                            <p style={p}>
                                Welcome to ICare.<br />
                                This Privacy Policy explains how <strong>{COMPANY.brand}</strong> (“we”, “us”) collects,
                                uses and protects personal data when you use our website and MVP marketplace. ICare is an{" "}
                                <strong>introductory marketplace</strong> (not a care agency). Families and caregivers
                                communicate directly and make arrangements between themselves.
                            </p>

                            <p style={small}>
                                Cookies details:{" "}
                                <Link to="/cookies" style={a}>
                                    Cookies
                                </Link>
                                .
                            </p>
                        </div>

                        {/* WHO */}
                        <div style={section} id="who">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>1) Who we are</h2>
                            <p style={p}>
                                <strong>{COMPANY.brand}</strong> is operated by{" "}
                                <strong>{COMPANY.operator}</strong> trading as <strong>{COMPANY.tradingAs}</strong>.
                                We act as the “controller” for personal data we collect through this website and MVP
                                features (e.g., waitlist, profiles, messaging, and enquiries).
                            </p>
                            <p style={small}>
                                Families and caregivers are independent parties. Where you share personal data in messages
                                or agreements, you do so directly with the other party.
                            </p>
                        </div>

                        {/* DATA */}
                        <div style={section} id="data">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>2) Personal data we collect</h2>
                            <p style={p}>We collect only what’s needed to run the MVP and keep the service secure.</p>

                            <ul style={ul}>
                                <li>
                                    <strong>Waitlist / enquiries:</strong> email, postcode, care preferences, optional notes.
                                </li>
                                <li>
                                    <strong>Accounts & profiles (if enabled):</strong> name, contact details, location/availability,
                                    and information you choose to share.
                                </li>
                                <li>
                                    <strong>Messages (if enabled):</strong> content you send through the platform to enable direct communication.
                                </li>
                                <li>
                                    <strong>Technical data:</strong> IP address, device/browser info, approximate location, and logs for security.
                                </li>
                            </ul>

                            <p style={small}>Please avoid sharing unnecessary sensitive details in free-text fields.</p>
                        </div>

                        {/* USE */}
                        <div style={section} id="use">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>3) How we use your data</h2>
                            <ul style={ul}>
                                <li>To record your request and respond to you.</li>
                                <li>To prioritise the MVP launch by area and care needs (e.g., Cheltenham first).</li>
                                <li>To provide essential service messages (confirmation, support replies).</li>
                                <li>To keep the service secure and prevent misuse.</li>
                                <li>To improve the product (debugging, performance, basic analytics if enabled).</li>
                            </ul>
                        </div>

                        {/* EMAILS */}
                        <div style={section} id="emails">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>4) Emails (waitlist and updates)</h2>

                            <p style={p}>
                                We use your email address to: (1) confirm your waiting list request and respond to enquiries,
                                (2) send essential MVP service messages (for example, launch availability in your area),
                                and (3) send optional launch updates if you opted in.
                            </p>

                            <p style={p}>
                                You can unsubscribe at any time. If you unsubscribe from optional updates, we may still send
                                important service-related emails (for example, to confirm your request or respond to you).
                            </p>

                            <p style={small}>
                                We may use an email service provider to deliver messages (for example, Gmail or an email marketing platform).
                                These providers process data on our behalf to send emails and keep basic delivery logs.
                            </p>

                            <div style={noteBox} aria-label="Copy-paste text for forms and email footer">
                                <div style={{ fontWeight: 950, marginBottom: 12, letterSpacing: "-0.2px" }}>
                                    Copy-paste (MVP)
                                </div>

                                <div style={{ fontWeight: 900, marginBottom: 8 }}>Form checkbox label (optional)</div>
                                <p style={codeLine}>
                                    [ ] I’d like to receive early access and launch updates from ICare (email).
                                </p>

                                <div style={{ height: 16 }} />

                                <div style={{ fontWeight: 900, marginBottom: 8 }}>Form note (under the button)</div>
                                <p style={codeLine}>
                                    By joining the waiting list, you agree that we may email you about your request and the MVP launch in your area. You can unsubscribe at any time.
                                </p>

                                <div style={{ height: 16 }} />

                                <div style={{ fontWeight: 900, marginBottom: 8 }}>Email footer (add to every email)</div>
                                <p style={codeLine}>
                                    ICare is an agency-free marketplace. You’re receiving this email because you joined the ICare waiting list or contacted us.
                                    {"\n"}
                                    Unsubscribe: reply with “unsubscribe” or click the unsubscribe link (if available).
                                    {"\n"}
                                    Privacy: see our Privacy Policy.
                                    {"\n"}
                                    Operator: {COMPANY.operator} trading as {COMPANY.tradingAs}, {COMPANY.address}.
                                </p>
                            </div>
                        </div>

                        {/* LEGAL BASIS */}
                        <div style={section} id="law">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>5) Legal basis (UK GDPR)</h2>
                            <p style={p}>We process personal data under these legal bases:</p>
                            <ul style={ul}>
                                <li>
                                    <strong>Contract / steps before contract:</strong> providing the features you request (e.g., waitlist).
                                </li>
                                <li>
                                    <strong>Legitimate interests:</strong> security, fraud prevention, and improving the service.
                                </li>
                                <li>
                                    <strong>Consent:</strong> where required (e.g., optional email updates and non-essential cookies).
                                </li>
                                <li>
                                    <strong>Legal obligations:</strong> where required by law.
                                </li>
                            </ul>
                        </div>

                        {/* SHARING */}
                        <div style={section} id="share">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>6) Sharing your data</h2>
                            <p style={p}>We do not sell your personal data. We may share it only when necessary:</p>
                            <ul style={ul}>
                                <li>
                                    <strong>With service providers:</strong> hosting, email delivery, analytics, and security tools (to run the MVP).
                                </li>
                                <li>
                                    <strong>For legal reasons:</strong> if required by law, to protect users, or to prevent misuse.
                                </li>
                            </ul>
                            <p style={small}>
                                If we add payments later, payment providers process payment data under their own privacy policies.
                                We will update this page accordingly.
                            </p>
                        </div>

                        {/* RETENTION */}
                        <div style={section} id="retain">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>7) Data retention</h2>
                            <p style={p}>
                                We keep data only as long as needed for the MVP service, safety, and legal requirements.
                            </p>
                            <ul style={ul}>
                                <li>Waitlist data: until the MVP launch period ends or you request deletion.</li>
                                <li>Support enquiries: as long as needed to respond and resolve issues.</li>
                                <li>Technical logs: kept for security and debugging for a limited period.</li>
                            </ul>
                        </div>

                        {/* RIGHTS */}
                        <div style={section} id="rights">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>8) Your rights</h2>
                            <p style={p}>Under UK GDPR, you may have the right to:</p>
                            <ul style={ul}>
                                <li>Request access to your data</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion (where applicable)</li>
                                <li>Object to processing or request restriction</li>
                                <li>Request data portability</li>
                                <li>Withdraw consent (where processing is based on consent)</li>
                            </ul>

                            <p style={small}>
                                To exercise your data rights (DSAR), email us at{" "}
                                <a href={`mailto:${COMPANY.email}`} style={a}>
                                    {COMPANY.email}
                                </a>{" "}
                                with your name, the email you used on ICare, and what you’d like us to do (access,
                                correction, deletion, etc.).
                            </p>
                        </div>

                        {/* CONTACT */}
                        <div style={section} id="contact">
                            <div style={sectionIdStyle} />
                            <h2 style={h2}>9) Contact</h2>
                            <p style={p}>Questions about privacy? Contact:</p>
                            <ul style={ul}>
                                <li>
                                    <strong>{COMPANY.brand}</strong> — {COMPANY.operator} trading as {COMPANY.tradingAs}
                                </li>
                                <li>
                                    Email:{" "}
                                    <a href={`mailto:${COMPANY.email}`} style={a}>
                                        {COMPANY.email}
                                    </a>
                                </li>
                                <li>Address: {COMPANY.address}</li>
                            </ul>
                            <p style={small}>
                                We may update this policy as the MVP grows. We’ll post changes here with a new “Last updated” date.
                            </p>
                        </div>

                        {/* ✅ OPTIONAL: meta chips at bottom (more spaced) */}
                        <div style={{ ...chipRow, marginTop: 34 }}>
                            <div style={chip}>Last updated: {COMPANY.lastUpdated}</div>
                            <div style={chip}>
                                Operator: {COMPANY.operator} trading as {COMPANY.tradingAs}
                            </div>
                            <div style={chip}>Address: {COMPANY.address}</div>
                            <div style={chip}>
                                Contact:{" "}
                                <a href={`mailto:${COMPANY.email}`} style={{ ...a, borderBottom: "none" }}>
                                    {COMPANY.email}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
