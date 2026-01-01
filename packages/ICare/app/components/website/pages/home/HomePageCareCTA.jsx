import React from "react";
import { Link } from "react-router";

export default function HomePageCareCTA() {
    return (
        <section
            aria-label="ICare caregivers and care receivers"
            style={{
                position: "relative",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "760px",
            }}
        >
            {/* ================= CAREGIVERS ================= */}
            <div style={{ position: "relative", minHeight: "380px" }}>
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
                        padding: "clamp(1.25rem, 4vw, 3rem)", // ✅ smaller on mobile
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "36px",
                            padding: "clamp(1.4rem, 3vw, 2.5rem)", // ✅ responsive padding
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
                                fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", // ✅ clamps better
                                lineHeight: 1.05,
                            }}
                        >
                            ICare for caregivers
                        </h2>

                        <p
                            style={{
                                margin: "1rem 0 1.6rem",
                                fontSize: "clamp(1.02rem, 1.6vw, 1.2rem)", // ✅ clamps better
                                lineHeight: 1.7,
                                color: "#0f172a",
                            }}
                        >
                            Find fair care jobs, connect directly with families
                            and work on your own terms — without agencies.
                        </p>

                        <Link
                            to="/icare-for-caregivers"
                            style={{
                                alignSelf: "flex-start",
                                padding: "clamp(12px, 1.6vw, 16px) clamp(22px, 2.6vw, 34px)", // ✅ responsive
                                borderRadius: "999px",
                                background: "#61674d",
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "clamp(.98rem, 1.2vw, 1.05rem)", // ✅ responsive
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Join as caregiver
                        </Link>
                    </div>
                </div>
            </div>

            {/* ================= CARE RECEIVERS ================= */}
            <div style={{ position: "relative", minHeight: "380px" }}>
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
                        padding: "clamp(1.25rem, 4vw, 3rem)", // ✅ smaller on mobile
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.7)",
                            borderRadius: "36px",
                            padding: "clamp(1.4rem, 3vw, 2.5rem)", // ✅ responsive padding
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
                                fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", // ✅ clamps better
                                lineHeight: 1.05,
                                color: "#B97A57",
                            }}
                        >
                            ICare for care receivers
                        </h2>

                        <p
                            style={{
                                margin: "1rem 0 1.6rem",
                                fontSize: "clamp(1.02rem, 1.6vw, 1.2rem)", // ✅ clamps better
                                lineHeight: 1.7,
                                color: "#0f172a",
                            }}
                        >
                            Find trusted, verified caregivers matched
                            to your family’s real needs.
                        </p>

                        <Link
                            to="/icare-for-care-receivers"
                            style={{
                                alignSelf: "flex-start",
                                padding: "clamp(12px, 1.6vw, 16px) clamp(22px, 2.6vw, 34px)", // ✅ responsive
                                borderRadius: "999px",
                                background: "#B97A57",
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "clamp(.98rem, 1.2vw, 1.05rem)", // ✅ responsive
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Find care
                        </Link>
                    </div>
                </div>
            </div>

            {/* ✅ Responsive: stack on smaller screens */}
            <style>{`
        @media (max-width: 980px) {
          section[aria-label="ICare caregivers and care receivers"] {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
        }
      `}</style>
        </section>
    );
}
