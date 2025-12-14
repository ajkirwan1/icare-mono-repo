import { useEffect, useRef } from "react";
import ICareNavbar from "./ICareNavbar";

export default function HomePageHero({ imgSrc }) {
    // const heroRef = useRef(null);
    // const imgRef = useRef(null);

    // ===== Subtle parallax (same behavior as before) =====
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (!heroRef.current || !imgRef.current) return;

    //         const rect = heroRef.current.getBoundingClientRect();
    //         const offset = rect.top * 0.12;

    //         imgRef.current.style.transform = `translateY(${offset}px) scale(1.05)`;
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <>
            <ICareNavbar />
            <section
                // ref={heroRef}
                aria-label="ICare homepage hero"
                style={{
                    position: "relative",
                    minHeight: "clamp(680px, 85vh, 980px)",
                    width: "100%",
                    overflow: "hidden",
                    color: "#fff",
                }}
            >
                {/* ===== BACKGROUND IMAGE ===== */}
                <img
                    // ref={imgRef}
                    src={imgSrc}
                    alt="Care support background"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "scale(1.05)",
                        filter: "brightness(.72) saturate(.97)",
                        transition: "transform .1s linear",
                        zIndex: 0,
                    }}
                />

                {/* ===== DARK OVERLAY ===== */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,.6))",
                        zIndex: 1,
                    }}
                />

                {/* ===== CONTENT ===== */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(92vw, 1100px)",
                        margin: "0 auto",
                        paddingTop: "6rem",
                    }}
                >
                    {/* ================= HEADER ================= */}
                    <div
                        style={{
                            textAlign: "left",
                            textShadow: "0 2px 16px rgba(0,0,0,.35)",
                            transform: "translateX(-25%) scale(1.1)",
                            transformOrigin: "top left",
                        }}
                    >
                        <h1
                            style={{
                                margin: ".35rem 0 0",
                                fontWeight: 900,
                                letterSpacing: "-0.35px",
                                lineHeight: 1.05,
                                fontSize: "clamp(3rem, 5.2vw, 4.2rem)",
                                color: "#fdfdfd",
                            }}
                        >
                            ICare
                        </h1>
                    </div>

                    {/* ================= SUBHEADER ================= */}
                    <div
                        style={{
                            marginTop: "1rem",
                            textAlign: "left",
                            color: "rgba(255,255,255,.94)",
                            fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                            lineHeight: 1.55,
                            letterSpacing: "-0.25px",
                            transform: "translateX(-25%) scale(1.1)",
                            transformOrigin: "top left",
                        }}
                    >
                        <span style={{ display: "block", maxWidth: 600 }}>
                            <strong
                                style={{
                                    display: "block",
                                    marginBottom: ".25rem",
                                    fontSize: "1.8rem",
                                    fontWeight: 800,
                                    color: "#d9d7bd",
                                }}
                            >
                                Find a trusted and verified caregiver in your local area
                            </strong>
                        </span>

                        <div style={{ marginTop: "2.2rem", maxWidth: "48ch" }}>
                            <h2
                                style={{
                                    fontSize: "1.45rem",
                                    fontWeight: 800,
                                    color: "#d9d7bd",
                                    margin: 0,
                                    letterSpacing: "-0.3px",
                                }}
                            >
                                ICare is launching soon
                            </h2>

                            <p
                                style={{
                                    marginTop: ".7rem",
                                    fontSize: "1.05rem",
                                    color: "#d9d7bd",
                                    lineHeight: 1.55,
                                }}
                            >
                                We’re preparing trusted caregivers and finalising our platform.
                                <br />
                                Join the early access list to be notified when ICare becomes
                                available in your area.
                            </p>

                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: "1.2rem 0 1.6rem 0",
                                    display: "grid",
                                    gap: "0.65rem",
                                }}
                            >
                                {[
                                    "Verified caregivers arriving soon",
                                    "Secure messaging & transparent pricing",
                                    "Early access to care matches",
                                ].map((text) => (
                                    <li
                                        key={text}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            fontSize: "1rem",
                                            color: "#d9d7bd",
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#d9d7bd"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("You're on the early access list!");
                                }}
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    maxWidth: "420px",
                                }}
                            >
                                <button
                                    type="submit"
                                    style={{
                                        padding: "12px 18px",
                                        borderRadius: "999px",
                                        background: "#61674d",
                                        color: "#fff",
                                        border: "none",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Join waiting list
                                </button>
                            </form>
                        </div>

                        {/* ================= CTA ================= */}
                        <div style={{ marginTop: "2rem" }}>
                            <a
                                href="#how-it-works"
                                style={{
                                    padding: ".9rem 1.4rem",
                                    borderRadius: "999px",
                                    border: "2px solid #B97A57",
                                    background: "#B97A57",
                                    color: "#fff",
                                    fontWeight: 600,
                                    letterSpacing: "-0.2px",
                                    fontSize: "clamp(1rem, 1.3vw, 1rem)",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.55rem",
                                    transition: "all .25s ease",
                                    boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                                }}
                            >
                                How ICare works
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M13 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
