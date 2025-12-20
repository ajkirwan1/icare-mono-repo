import { useEffect, useRef } from "react";
import { IcareHeroNew } from "react-library";

export default function HeroComponent({ imgSrc }) {
    const heroRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const img = hero.querySelector("img");

        const handleScroll = () => {
            const rect = hero.getBoundingClientRect();
            const offset = rect.top * 0.12;
            if (img) img.style.transform = `translateY(${offset}px) scale(1.05)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <IcareHeroNew
            imageSrc={imgSrc}
            slot="hero-content"
            ref={heroRef}
            style={{ overflow: "hidden" }}
        >
            {/* ================= HEADER ================= */}
            <span
                slot="header-content"
                style={{
                    display: "block",
                    width: "min(92vw, 1100px)",
                    marginTop: "6rem",
                    textAlign: "left",
                    color: "#fff",
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
            </span>

            {/* ================= SUBHEADER ================= */}
            <span
                slot="subheader-content"
                style={{
                    display: "block",
                    width: "min(92vw, 1100px)",
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
                        ICare is launching soon
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
                            margin: "1.2rem 0 1.6rem",
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

                    {/* ================= CTA BUTTONS ================= */}
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            marginTop: "2.4rem",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        {/* FORM BUTTON */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("You're on the early access list!");
                            }}
                            style={{
                                margin: 0,
                                display: "flex",
                            }}
                        >
                            <button
                                type="submit"
                                style={{
                                    minWidth: "220px",
                                    height: "52px",
                                    padding: "0 28px",
                                    borderRadius: "999px",
                                    background: "#61674d",
                                    color: "#fff",
                                    border: "none",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Join waiting list
                            </button>
                        </form>

                        {/* LINK BUTTON */}
                        <a
                            href="#how-it-works"
                            style={{
                                minWidth: "220px",
                                height: "52px",
                                padding: "0 28px",
                                borderRadius: "999px",
                                background: "#B97A57",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1rem",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
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
            </span>
        </IcareHeroNew>
    );
}
