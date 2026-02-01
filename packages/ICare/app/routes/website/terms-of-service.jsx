import React from "react";

export default function TermsOfService() {
    const TEXT = "#0F172A";

    const wrap = {
        width: "100%",
        background: "rgba(255, 249, 239, 0.70)",
        color: TEXT,
        padding: "clamp(3rem, 5vw, 4rem) 0",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    };

    const container = {
        width: "min(92vw, 980px)",
        margin: "0 auto",
    };

    const h1 = {
        margin: 0,
        fontWeight: 600,
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontSize: "clamp(2.1rem, 3vw, 2.5rem)",
        color: TEXT,
    };

    const meta = {
        margin: "10px 0 0",
        color: "rgba(15,23,42,0.72)",
        fontWeight: 500,
        lineHeight: 1.55,
        fontSize: "1.05rem",
    };

    const block = {
        marginTop: "clamp(18px, 2.8vw, 26px)",
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 18,
        padding: "clamp(16px, 2.4vw, 22px)",
        boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
    };

    const h2 = {
        margin: "0 0 10px",
        fontWeight: 800,
        letterSpacing: "-0.2px",
        fontSize: "1.22rem",
        color: TEXT,
    };

    const p = {
        margin: "10px 0 0",
        color: "rgba(15,23,42,0.90)",
        fontWeight: 400,
        lineHeight: 1.75,
        fontSize: "1.08rem",
    };

    const ul = {
        margin: "10px 0 0",
        paddingLeft: 18,
        color: "rgba(15,23,42,0.90)",
        lineHeight: 1.75,
        fontSize: "1.08rem",
    };

    const li = { margin: "8px 0" };

    const callout = {
        marginTop: 14,
        borderRadius: 14,
        background: "rgba(185,122,87,0.08)",
        border: "1px solid rgba(185,122,87,0.22)",
        padding: "12px 14px",
        color: "rgba(15,23,42,0.92)",
        lineHeight: 1.65,
        fontSize: "1.02rem",
        fontWeight: 500,
    };

    const divider = {
        margin: "18px 0 0",
        height: 1,
        background: "rgba(15,23,42,0.08)",
    };

    return (
        <section aria-label="Terms of Service" style={wrap}>
            <div style={container}>
                <h1 style={h1}>ICare Terms of Service</h1>
                <p style={meta}>
                    Last updated: <strong>[01/02/2026]</strong>
                </p>

                <div style={block}>
                    <h2 style={h2}>1. About ICare</h2>
                    <p style={p}>
                        ICare is a UK-based matching platform that helps families and independent caregivers
                        connect directly. ICare does not provide regulated care services, medical services or
                        nursing services.
                    </p>

                    <div style={callout}>
                        <strong>Important:</strong> Any care arrangement or agreement is made directly between
                        the family (or care receiver) and the caregiver. ICare is not a care agency and is not
                        the employer of caregivers.
                    </div>

                    <div style={divider} />

                    <h2 style={h2}>2. Who can use ICare</h2>
                    <ul style={ul}>
                        <li style={li}>You must be 18 years or older to use the platform.</li>
                        <li style={li}>
                            Families must have the authority to arrange support for themselves or on behalf of
                            another person.
                        </li>
                        <li style={li}>
                            Caregivers must provide accurate information about their experience, availability and
                            right to work in the UK.
                        </li>
                    </ul>

                    <div style={divider} />

                    <h2 style={h2}>3. Accounts and profiles</h2>
                    <p style={p}>
                        Users are responsible for keeping their account information accurate and secure.
                        Profiles must not include misleading, unlawful or harmful content.
                    </p>
                    <ul style={ul}>
                        <li style={li}>Do not impersonate others or provide false information.</li>
                        <li style={li}>Do not share login credentials.</li>
                        <li style={li}>Keep profile information up to date.</li>
                    </ul>

                    <div style={divider} />

                    <h2 style={h2}>4. Matching, messaging and agreements</h2>
                    <p style={p}>
                        ICare provides tools to browse profiles and communicate. ICare does not guarantee that a
                        suitable match will be found and does not take part in negotiating or supervising care
                        arrangements.
                    </p>
                    <ul style={ul}>
                        <li style={li}>
                            Families and caregivers agree details such as tasks, schedule, rate and start date
                            directly with each other.
                        </li>
                        <li style={li}>
                            ICare does not assess suitability for specific tasks or situations.
                        </li>
                        <li style={li}>
                            Families remain responsible for selecting a caregiver appropriate to their needs.
                        </li>
                    </ul>

                    <div style={divider} />

                    <h2 style={h2}>5. What ICare does not do</h2>
                    <ul style={ul}>
                        <li style={li}>
                            ICare does not provide medical advice, diagnosis or clinical decision-making.
                        </li>
                        <li style={li}>
                            ICare does not provide regulated or nursing care services.
                        </li>
                        <li style={li}>
                            ICare is not the employer of caregivers and does not manage employment obligations.
                        </li>
                        <li style={li}>
                            ICare is not responsible for agreements or interactions outside the platform.
                        </li>
                    </ul>

                    <div style={divider} />

                    <h2 style={h2}>6. Fees and paid features</h2>
                    <p style={p}>
                        ICare may introduce paid features in the future. Any fees will be explained clearly
                        before you choose to use a paid feature.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>7. Verification and trust information</h2>
                    <p style={p}>
                        ICare may request verification information from caregivers (such as identity checks or
                        DBS information where available). Verification helps build trust but does not guarantee
                        suitability for every situation.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>8. Safety and emergencies</h2>
                    <p style={p}>
                        ICare does not provide emergency or medical support.
                    </p>
                    <p style={p}>
                        In urgent situations in the UK, contact local emergency services by calling{" "}
                        <strong>999</strong>.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>9. Acceptable use</h2>
                    <ul style={ul}>
                        <li style={li}>Do not harass, abuse or discriminate against others.</li>
                        <li style={li}>Do not post unlawful or harmful content.</li>
                        <li style={li}>Do not misuse or attempt to bypass platform security.</li>
                    </ul>

                    <div style={divider} />

                    <h2 style={h2}>10. Suspension or termination</h2>
                    <p style={p}>
                        Users may stop using ICare at any time. ICare may suspend or remove accounts where these
                        Terms are breached or where there is a risk to others.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>11. Liability</h2>
                    <p style={p}>
                        ICare provides the platform on an “as is” basis. To the extent permitted by law, ICare
                        is not liable for losses arising from user-to-user arrangements.
                    </p>
                    <p style={p}>
                        Nothing in these Terms limits liability where it cannot be limited by law.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>12. Privacy and cookies</h2>
                    <p style={p}>
                        Personal data is handled in line with our Privacy Policy and Cookies Policy.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>13. Governing law</h2>
                    <p style={p}>
                        These Terms are governed by the laws of England and Wales. ICare operates in the United
                        Kingdom only.
                    </p>

                    <div style={divider} />

                    <h2 style={h2}>14. Contact</h2>
                    <p style={p}>
                        If you have questions about these Terms, contact us at{" "}
                        <strong>customershelp@icare.com</strong>.
                    </p>
                </div>
            </div>
        </section>
    );
}
