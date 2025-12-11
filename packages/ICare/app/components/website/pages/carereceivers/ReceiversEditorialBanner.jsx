import React from "react";

export default function LocalCareMVP_Compact() {
    const locations = [
        { name: "Cheltenham", slug: "cheltenham" },
        { name: "Gloucester", slug: "gloucester" },
        { name: "Tewkesbury", slug: "tewkesbury" },
        { name: "Stroud", slug: "stroud" },
        { name: "Bristol", slug: "bristol", soon: true },
    ];

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            alert("Your browser does not support location.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                window.location.href = `/caregivers?lat=${latitude}&lng=${longitude}&radius=15`;
            },
            () => alert("Unable to access your location.")
        );
    };

    const handlePostcode = (e) => {
        e.preventDefault();
        const postcode = e.target.postcode.value.trim();
        if (!postcode) return;
        window.location.href = `/caregivers?postcode=${postcode}`;
    };

    return (
        <section
            style={{
                width: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                padding: "60px 0", // smaller section height
                background: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(92vw, 1100px)", // reduced max width
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "0.9fr 1.1fr", // smaller left column
                    gap: "2rem", // smaller gap
                }}
            >
                {/* LEFT SIDE — CARDS + SEARCH */}
                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "2rem", // smaller headline
                            fontWeight: 800,
                            color: "#1A1A1A",
                            lineHeight: 1.2,
                        }}
                    >
                        Local care near you
                    </h2>

                    <p
                        style={{
                            marginTop: "0.6rem",
                            fontSize: "1rem",
                            color: "#555",
                            maxWidth: "45ch",
                            lineHeight: 1.5,
                        }}
                    >
                        Search by postcode or explore your local area.
                    </p>

                    {/* ---- POSTCODE SEARCH ---- */}
                    <form onSubmit={handlePostcode} style={{ marginTop: "1.2rem" }}>
                        <input
                            name="postcode"
                            placeholder="Enter your postcode"
                            style={{
                                width: "60%",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: "1px solid #DDD",
                                marginRight: "6px",
                                fontSize: "0.95rem",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "10px 18px",
                                background: "#1FAB1F",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "none",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                cursor: "pointer",
                            }}
                        >
                            Search
                        </button>
                    </form>

                    {/* ---- FIND NEAR ME ---- */}
                    <button
                        onClick={handleGeolocation}
                        style={{
                            marginTop: "1rem",
                            background: "#E8F8E8",
                            color: "#1FAB1F",
                            padding: "10px 18px",
                            borderRadius: "10px",
                            border: "1px solid #CDEBCC",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                        }}
                    >
                        Find caregivers near me
                    </button>

                    {/* ---- LOCATION CARDS (smaller) ---- */}
                    <div
                        style={{
                            marginTop: "1.8rem",
                            display: "grid",
                            gap: "0.6rem",
                        }}
                    >
                        {locations.map((loc) => (
                            <a
                                key={loc.slug}
                                href={`/caregivers?location=${loc.slug}`}
                                style={{
                                    padding: "10px 14px",
                                    background: "#FAFAF8",
                                    borderRadius: "12px",
                                    border: "1px solid #EEE",
                                    textDecoration: "none",
                                    color: "#222",
                                    fontWeight: 600,
                                    fontSize: "0.95rem", // smaller text
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                {/* Map Pin Icon */}
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#6A5F52"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>

                                {loc.name}
                                {loc.soon && (
                                    <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                                        (soon)
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE — SMALLER STATIC MAP */}
                <div
                    style={{
                        width: "100%",
                        height: "320px", // smaller map
                        borderRadius: "18px",
                        overflow: "hidden",
                        border: "1px solid #DDD",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                    }}
                >
                    <iframe
                        title="ICare regional map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24423.66405590769!2d-2.1043901!3d51.9005727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487103223f0fdc09%3A0xdeb7850289dad11!2sCheltenham%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000001"
                    />
                </div>
            </div>
        </section>
    );
}
