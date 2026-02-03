import React from "react";
import { Link } from "react-router";

export default function WhoIsICareForSection() {
    const TEXT = "#0F172A";
    const MUTED = "rgba(15,23,42,0.72)";
    const BRAND = "#778d43";

    return (
        <section
            aria-label="Who ICare is for"
            style={{
                width: "100%",
                padding: "clamp(3.5rem, 6vw, 5rem) 0",
                background: "#fff9ef",
                fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                color: TEXT,
            }}
        >
            <div style={{ width: "min(1100px, 92vw)", margin: "0 auto" }}>
                {/* HEADER */}
                <header style={{ textAlign: "center", marginBottom: "3.2rem" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 500,
                            fontSize: "clamp(2.2rem, 3.2vw, 2.8rem)",
                            letterSpacing: "-0.6px",
                            lineHeight: 1.15,
                        }}
                    >
                        A calmer home care marketplace
                        <br />for families and caregivers
                    </h2>

                    <p
                        style={{
                            margin: "1.2rem auto 0",
                            maxWidth: "65ch",
                            fontSize: "1.35rem",
                            lineHeight: 1.65,
                            color: MUTED,
                        }}
                    >
                        ICare connects families with independent caregivers through clear
                        profiles, direct messaging and a guided process — so both sides can
                        agree support with confidence.
                    </p>
                </header>

                {/* TWO COLUMNS */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: 24,
                        padding: "clamp(2rem, 3vw, 3rem)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "clamp(2rem, 4vw, 3.5rem)",
                        border: "1px solid rgba(15,23,42,0.08)",
                    }}
                >
                    {/* FOR FAMILIES */}
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "1.6rem",
                                fontWeight: 600,
                                letterSpacing: "-0.3px",
                            }}
                        >
                            For families & care receivers
                        </h3>

                        <p
                            style={{
                                margin: "0.8rem 0 1.4rem",
                                fontSize: "1.2rem",
                                lineHeight: 1.6,
                                color: MUTED,
                            }}
                        >
                            Find companionship that fits your home — without agency pressure
                            and without guessing what happens next.
                        </p>

                        <ul
                            style={{
                                margin: 0,
                                paddingLeft: "1.1rem",
                                display: "grid",
                                gap: "0.8rem",
                                fontSize: "1.15rem",
                                lineHeight: 1.55,
                            }}
                        >
                            <li>
                                Clear caregiver profiles with experience, availability and key
                                information shown upfront.
                            </li>
                            <li>
                                Direct, secure messaging to agree routines, schedules and start
                                dates.
                            </li>
                        </ul>

                        <div style={{ marginTop: "2rem" }}>
                            <Link
                                to="/waiting-list"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.9rem 1.9rem",
                                    borderRadius: 999,
                                    border: "1.5px solid #0F172A",
                                    textDecoration: "none",
                                    fontWeight: 700,
                                    color: "#0F172A",
                                }}
                            >
                                Join the waiting list
                            </Link>

                            <p
                                style={{
                                    marginTop: "0.8rem",
                                    fontSize: "0.95rem",
                                    color: MUTED,
                                }}
                            >
                                We’ll notify you when ICare opens in your area.
                            </p>
                        </div>
                    </div>

                    {/* FOR CAREGIVERS */}
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "1.6rem",
                                fontWeight: 600,
                                letterSpacing: "-0.3px",
                            }}
                        >
                            For caregivers
                        </h3>

                        <p
                            style={{
                                margin: "0.8rem 0 1.4rem",
                                fontSize: "1.2rem",
                                lineHeight: 1.6,
                                color: MUTED,
                            }}
                        >
                            Build trust faster and spend less time on back-and-forth — with a
                            profile designed for clarity.
                        </p>

                        <ul
                            style={{
                                margin: 0,
                                paddingLeft: "1.1rem",
                                display: "grid",
                                gap: "0.8rem",
                                fontSize: "1.15rem",
                                lineHeight: 1.55,
                            }}
                        >
                            <li>
                                Secure messaging to align expectations before you start.
                            </li>
                            <li>
                                A clear profile highlighting your experience, availability and
                                optional video introduction.
                            </li>
                        </ul>

                        <div style={{ marginTop: "2rem" }}>
                            <Link
                                to="/caregivers"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.9rem 2.1rem",
                                    borderRadius: 999,
                                    background: BRAND,
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: 700,
                                }}
                            >
                                I’m a caregiver
                            </Link>

                            <p
                                style={{
                                    marginTop: "0.8rem",
                                    fontSize: "0.95rem",
                                    color: MUTED,
                                }}
                            >
                                Learn how ICare supports independent caregivers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LEGAL NOTE */}
                <p
                    style={{
                        marginTop: "1.8rem",
                        fontSize: "0.95rem",
                        color: MUTED,
                        maxWidth: "75ch",
                    }}
                >
                    ICare is a matching platform. We don’t provide care services or manage
                    care delivery.
                </p>
            </div>

            <style>{`
        @media (max-width: 900px) {
          section [aria-label="Who ICare is for"] > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}