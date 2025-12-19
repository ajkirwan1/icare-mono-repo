import React from "react";
import { Link } from "react-router";

export default function HomePageCareCTA() {
    return (
        <section
            aria-label="ICare caregivers and care receivers"
            style={{
                position: "relative",
                width: "100%",
                minHeight: "760px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
            }}
        >
            {/* ================= CAREGIVERS ================= */}
            <div style={{ position: "relative" }}>
                <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
                    alt="Caregiver supporting an elderly person"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.7)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "clamp(5rem, 8vw, 8rem)",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.82)",
                            borderRadius: "36px",
                            padding: "4.2rem",
                            color: "#0F172A",
                            width: "100%",
                            maxWidth: "640px",
                            minHeight: "420px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "clamp(2.6rem, 3.4vw, 3.1rem)",
                                lineHeight: 1.05,
                            }}
                        >
                            ICare for caregivers
                        </h2>

                        <p
                            style={{
                                margin: "1.6rem 0 2.8rem",
                                fontSize: "1.2rem",
                                lineHeight: 1.7,
                                color: "#334155",
                            }}
                        >
                            Find fair care jobs, connect directly with families,
                            and work on your own terms — without agencies.
                        </p>

                        <Link
                            to="/icare-for-caregivers"
                            style={{
                                alignSelf: "flex-start",
                                padding: "16px 34px",
                                borderRadius: "999px",
                                background: "#61674d",
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                textDecoration: "none",
                            }}
                        >
                            Join as caregiver
                        </Link>
                    </div>
                </div>
            </div>

            {/* ================= CARE RECEIVERS ================= */}
            <div style={{ position: "relative" }}>
                <img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1600&auto=format&fit=crop"
                    alt="Diverse family receiving care support"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(.7)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "clamp(5rem, 8vw, 8rem)",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.82)",
                            borderRadius: "36px",
                            padding: "4.2rem",
                            color: "#0F172A",
                            width: "100%",
                            maxWidth: "640px",
                            minHeight: "420px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "clamp(2.6rem, 3.4vw, 3.1rem)",
                                lineHeight: 1.05,
                            }}
                        >
                            ICare for care receivers
                        </h2>

                        <p
                            style={{
                                margin: "1.6rem 0 2.8rem",
                                fontSize: "1.2rem",
                                lineHeight: 1.7,
                                color: "#334155",
                            }}
                        >
                            Find trusted, verified caregivers matched
                            to your family’s real needs.
                        </p>

                        <Link
                            to="/icare-for-care-receivers"
                            style={{
                                alignSelf: "flex-start",
                                padding: "16px 34px",
                                borderRadius: "999px",
                                background: "#B97A57",
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                textDecoration: "none",
                            }}
                        >
                            Find care
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
