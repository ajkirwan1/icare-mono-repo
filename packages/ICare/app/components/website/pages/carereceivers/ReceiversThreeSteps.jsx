
import { Link } from "react-router";

export default function ReceiversThreeSteps() {
    return (
        <section
            aria-label="3 Steps Minimal"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: "#FAF8F5",
                padding: "120px 0",
                borderTop: "1px solid #EAE6E1",
            }}
        >
            <div
                style={{
                    width: "min(980px,90vw)",
                    margin: "0 auto",
                    padding: "0 24px",
                }}
            >

                {/* ===== HEADER ===== */}
                <header
                    className="sr"
                    style={{
                        opacity: 0,
                        transform: "translateY(25px)",
                        transition: "all .8s cubic-bezier(0.25,0.1,0.25,1)",
                        textAlign: "center",
                        marginBottom: "4rem",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 800,
                            color: "#1A1A1A",
                            fontSize: "clamp(2.4rem, 3vw, 3rem)",
                            letterSpacing: "-0.5px",
                            lineHeight: 1.1,
                        }}
                    >
                        Find your caregiver in 3 simple steps
                    </h2>

                    <p
                        style={{
                            maxWidth: "60ch",
                            margin: "22px auto 0",
                            fontSize: "1.15rem",
                            color: "#444",
                            lineHeight: 1.75,
                            fontWeight: 400,
                        }}
                    >
                        A calm, human-centered process designed for clarity, trust and ease.
                    </p>
                </header>

                {/* ===== STEPS GRID ===== */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "3.6rem",
                        padding: "0 12px",
                    }}
                >
                    {[
                        {
                            n: "1",
                            t: "Browse verified caregivers",
                            d: "Review experience, languages, skills and availability — all clearly laid out.",
                        },
                        {
                            n: "2",
                            t: "Start a private conversation",
                            d: "Message directly, ask questions and exchange documents securely.",
                        },
                        {
                            n: "3",
                            t: "Agree terms together",
                            d: "Set hours, expectations and rate — transparent, simple and human.",
                        },
                    ].map((s, i) => (
                        <div
                            key={s.n}
                            className="sr"
                            style={{
                                opacity: 0,
                                transform: "translateY(30px)",
                                transition: `all .9s ${0.15 + i * 0.15}s cubic-bezier(0.25,0.1,0.25,1)`,
                                display: "grid",
                                gridTemplateColumns: "auto 1fr",
                                gap: "1.6rem",
                                alignItems: "start",
                            }}
                        >
                            {/* NUMBER ICON */}
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    border: "2px solid #A67A63",
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 700,
                                    fontSize: "1.35rem",
                                    color: "#A67A63",
                                }}
                            >
                                {s.n}
                            </div>

                            {/* TEXT */}
                            <div>
                                <h3
                                    style={{
                                        margin: "0 0 0.4rem",
                                        fontSize: "1.32rem",
                                        fontWeight: 700,
                                        color: "#1A1A1A",
                                        letterSpacing: "-0.2px",
                                    }}
                                >
                                    {s.t}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "1.05rem",
                                        lineHeight: 1.65,
                                        color: "#4A4A4A",
                                    }}
                                >
                                    {s.d}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== CTA BUTTON ===== */}
                <div
                    className="sr"
                    style={{
                        opacity: 0,
                        transform: "translateY(25px)",
                        transition: "all .9s .45s cubic-bezier(0.25,0.1,0.25,1)",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "4rem",
                    }}
                >
                    <Link
                        to="/register"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "14px 40px",
                            borderRadius: 999,
                            background: "#A67A63",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            textDecoration: "none",
                            letterSpacing: ".3px",
                            boxShadow: "0 10px 26px rgba(166,122,99,0.22)",
                            transition: "all .25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 14px 34px rgba(166,122,99,0.26)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 10px 26px rgba(166,122,99,0.22)";
                        }}
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </section>
    );
}
