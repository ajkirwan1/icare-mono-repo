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
                    src="images/web/homepage/caregiverbottom2.png"
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
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: "clamp(5rem, 8vw, 8rem)",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "36px",
                            padding: "2.5rem",
                            color: "#0F172A",
                            width: "100%",
                            maxWidth: "640px",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                                lineHeight: 1.05,
                            }}
                        >
                            ICare for caregivers
                        </h2>

                        <p
                            style={{
                                margin: "1rem 0px 1.8rem",
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
                    src="images/web/homepage/carerceiverbottom.png"
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
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: "clamp(5rem, 8vw, 8rem)",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "36px",
                            padding: "2.5em",
                            color: "#0F172A",
                            width: "100%",
                            maxWidth: "640px",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                                lineHeight: 1.05,
                                color: "#B97A57"
                            }}
                        >
                            ICare for care receivers
                        </h2>

                        <p
                            style={{
                                margin: "1rem 0px 1.8rem",
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
