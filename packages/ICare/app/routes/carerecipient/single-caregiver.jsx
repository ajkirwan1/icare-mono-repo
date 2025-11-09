import { useState } from "react";
import { useLoaderData, NavLink } from "react-router";
import { json } from "@remix-run/node";

export function meta() {
    return [
        { title: "ICare | Caregiver Profile" },
        { name: "description", content: "Meet trusted caregivers with verified experience and empathy." },
    ];
}

export async function loader({ params }) {
    const id = params.caregiverId;
    if (!id) throw new Response("Caregiver id missing", { status: 400 });

    const res = await fetch("http://localhost:4000/caregivers");
    if (!res.ok) throw new Response("Failed to load caregivers", { status: res.status });

    const caregivers = await res.json();
    const caregiver = caregivers.find((c) => String(c.id) === id);

    if (!caregiver) throw new Response("Caregiver not found", { status: 404 });
    return json(caregiver);
}

export default function CaregiverRecipientHome() {
    const caregiver = useLoaderData();
    const [isFavourited, setIsFavourited] = useState(false);
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [showDocs, setShowDocs] = useState(false);
    const [language, setLanguage] = useState("en"); // 🇬🇧 / 🇩🇪

    const toggleFavourite = () => setIsFavourited((v) => !v);
    const isGerman = language === "de";

    const colors = {
        background: "#ffffff",
        cardBg: "#f4f4f4",
        green: "#619482",
        greenDark: "#4c7865",
        border: "#dcdede",
        text: "#333",
    };

    const styles = {
        wrapper: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: colors.background,
            padding: "3rem 1rem",
            fontFamily: "Nunito, sans-serif",
            position: "relative",
        },
        card: {
            backgroundColor: colors.cardBg,
            borderRadius: "30px",
            maxWidth: "900px",
            width: "100%",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            padding: "2.5rem",
            color: colors.text,
            border: `1px solid ${colors.border}`,
            position: "relative",
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            borderBottom: `2px solid ${colors.border}`,
            paddingBottom: "1.5rem",
        },
        avatar: {
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${colors.green}`,
            backgroundColor: "#fff",
        },
        name: { fontSize: "1.9rem", margin: 0, color: colors.greenDark },
        role: { fontSize: "1rem", color: "#777" },
        location: { fontSize: "1.1rem", color: "#5c6b67" },
        favButton: (active) => ({
            marginTop: "1rem",
            backgroundColor: active ? colors.green : "#e7ebe9",
            color: active ? "#fff" : colors.greenDark,
            fontSize: "1rem",
            border: "none",
            borderRadius: "14px",
            padding: "0.7rem 1.2rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
        }),
        langSwitch: {
            backgroundColor: "#e7ebe9",
            color: colors.greenDark,
            fontSize: "0.9rem",
            border: "none",
            borderRadius: "10px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
            marginLeft: "auto",
        },
        shortBio: {
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "1rem",
            marginTop: "1.5rem",
            fontSize: "1.05rem",
            lineHeight: 1.5,
            color: "#444",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        },
        section: { margin: "2rem 0" },
        sectionTitle: {
            fontSize: "1.3rem",
            color: colors.greenDark,
            borderLeft: `4px solid ${colors.green}`,
            paddingLeft: "0.5rem",
            marginBottom: "1rem",
        },
        footer: {
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${colors.border}`,
            marginTop: "2rem",
            paddingTop: "1.5rem",
            gap: "1rem",
            flexWrap: "wrap",
        },
        footerBtn: {
            backgroundColor: colors.green,
            color: "#fff",
            textDecoration: "none",
            padding: "1rem 2rem",
            borderRadius: "36px",
            fontWeight: "700",
            fontSize: "1.1rem",
            transition: "all 0.25s ease",
            boxShadow: "0 3px 10px rgba(97,148,130,0.25)",
            cursor: "pointer",
        },
        stickyCTA: {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            backgroundColor: colors.green,
            color: "#fff",
            borderRadius: "50px",
            padding: "1rem 1.8rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1.05rem",
            transition: "all 0.3s ease",
            zIndex: 1000,
        },
        phoneBtn: {
            display: "inline-block",
            marginTop: "1rem",
            backgroundColor: "#fff",
            border: `2px solid ${colors.green}`,
            color: colors.greenDark,
            borderRadius: "50px",
            padding: "0.6rem 1rem",
            cursor: "pointer",
            fontWeight: "600",
        },
    };

    if (!caregiver) return <p style={{ textAlign: "center" }}>Loading...</p>;

    return (
        <main style={styles.wrapper}>
            <div style={styles.card}>
                {/* HEADER */}
                <header style={styles.header}>
                    <img src={`/${caregiver.imgSrc}`} alt={caregiver.name} style={styles.avatar} />
                    <div style={{ flex: 1 }}>
                        <h1 style={styles.name}>
                            {caregiver.name} <span style={{ fontSize: "1rem" }}>✅ Verified</span>
                        </h1>
                        <p style={styles.role}>Professional Caregiver</p>
                        <p style={styles.location}>{caregiver.location}</p>
                        <div>
                            <span>🏅 ID Verified | 🪪 Police Checked | 🛡 Insured</span>
                        </div>
                        <button onClick={toggleFavourite} style={styles.favButton(isFavourited)}>
                            ❤️ {isFavourited ? "In favourites" : "Add to favourites"}
                        </button>



                    </div>

                    <button
                        style={styles.langSwitch}
                        onClick={() => setLanguage(isGerman ? "en" : "de")}
                    >
                        {isGerman ? "Switch to English 🇬🇧" : "Wechseln zu Deutsch 🇩🇪"}
                    </button>
                </header>

                <section style={{ margin: "2rem 0" }}>
                    <h2
                        style={{
                            fontSize: "1.3rem",
                            color: "#4c7865",
                            borderLeft: "4px solid #619482",
                            paddingLeft: "0.5rem",
                            marginBottom: "1rem",
                            fontWeight: "700",
                        }}
                    >
                        Bio
                    </h2>

                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "14px",
                            padding: "1.2rem",
                            fontSize: "1.05rem",
                            lineHeight: 1.65,
                            color: "#444",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                            fontWeight: "500",
                        }}
                    >
                        I am an experienced and empathetic caregiver specializing in elderly care, companionship, and daily support.
                    </div>
                </section>

                <div
                    style={{
                        borderTop: "1px solid #dcdede",
                        borderBottom: "1px solid #dcdede",
                        backgroundColor: "#e9f4f0",
                        textAlign: "center",
                        padding: "1rem",
                        marginTop: "2rem",
                        fontSize: "0.95rem",
                        color: "#3e6355",
                        letterSpacing: "0.3px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        lineHeight: 1.6,
                    }}
                >
                    🔒 <strong>ICare Secure Platform</strong> – all agreements and payments are protected.<br />
                    All communication and arrangements take place securely within the ICare chat.
                </div>


                {/* RATES */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>{isGerman ? "Tarife & Leistungen" : "Rates & Services"}</h2>
                    <p>
                        <strong>{isGerman ? "Stundenlohn" : "Hourly rate"}:</strong>{" "}
                        {isGerman ? "18–22 € (verhandelbar)" : "£16–20 (negotiable)"}
                    </p>
                    <p><strong>{isGerman ? "24h Pflege" : "Live-in care"}:</strong> {isGerman ? "120 €/Tag" : "£110/day"}</p>
                    <p><strong>{isGerman ? "Spezialisierungen" : "Specialties"}:</strong> Dementia care, Mobility support, Post-surgery recovery</p>
                </section>

                {/* REVIEWS */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>{isGerman ? "Kundenbewertungen" : "Client Reviews"}</h2>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "14px", marginBottom: "1rem" }}>
                        <p><strong>Anna M.</strong> – ★★★★★</p>
                        <p>{isGerman ? "Maria war sehr freundlich und aufmerksam gegenüber meiner Mutter." : "Maria was very kind and attentive to my mother’s needs."}</p>
                    </div>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "14px" }}>
                        <p><strong>Thomas L.</strong> – ★★★★☆</p>
                        <p>{isGerman ? "Zuverlässig, pünktlich und professionell." : "Reliable, punctual and professional."}</p>
                    </div>
                </section>

                {/* DOCUMENTS */}
                <footer style={styles.footer}>
                    <NavLink to="messages" style={styles.footerBtn}>
                        ✉️ {isGerman ? `Nachricht senden` : `Send Message`}
                    </NavLink>

                    <NavLink to="resume" style={styles.footerBtn}>
                        📄 {isGerman ? "Lebenslauf ansehen" : "View Resume"}
                    </NavLink>

                    <button
                        onClick={() => setShowDocs((v) => !v)}
                        style={{
                            ...styles.footerBtn,
                            backgroundColor: showDocs ? colors.greenDark : colors.green,
                        }}
                    >

                        📎 {showDocs
                            ? (isGerman ? "Dokumente ausblenden" : "Hide Documents")
                            : (isGerman ? "Dokumente anzeigen" : "View Documents")}
                    </button>
                </footer>

                {showDocs && (
                    <div style={{ background: "#fff", borderRadius: "14px", padding: "1.5rem", marginTop: "1rem" }}>
                        <h3 style={styles.sectionTitle}>{isGerman ? "🧾 Referenzen" : "🧾 References"} ✅</h3>
                        <p>
                            {isGerman
                                ? "Referenzgeber: Frau Müller, München"
                                : "Referee: Mrs. Müller, Munich"} <br />
                            {isGerman ? "Telefon:" : "Phone:"} <strong>+49 176 543 982</strong><br />
                            “{isGerman
                                ? "Maria war eine hervorragende Betreuungskraft, stets hilfsbereit und vertrauenswürdig."
                                : "Maria was a wonderful caregiver — always helpful, trustworthy, and kind."}”
                        </p>

                        <h3 style={styles.sectionTitle}>{isGerman ? "🪪 Führungszeugnis" : "🪪 Criminal Record"} ✅</h3>
                        <p>
                            {isGerman
                                ? "Verifiziert über: "
                                : "Verified via: "}
                            <a
                                href={
                                    isGerman
                                        ? "https://www.bundesjustizamt.de/DE/Themen/Buergerdienste/Fuehrungszeugnis/Fuehrungszeugnis_node.html"
                                        : "https://www.gov.uk/request-copy-criminal-record"
                                }
                                target="_blank"
                                rel="noreferrer"
                            >
                                {isGerman ? "bundesjustizamt.de" : "gov.uk"}
                            </a>
                        </p>

                        <h3 style={styles.sectionTitle}>{isGerman ? "🛡 Versicherung" : "🛡 Insurance"} ✅</h3>
                        <p>
                            {isGerman ? "Versicherer:" : "Provider:"} {isGerman ? "Allianz Deutschland AG" : "AXA Insurance Ltd"}<br />
                            {isGerman ? "Policen-Nr.:" : "Policy number:"} AXA-CARE-9845321<br />
                            {isGerman ? "Gültig bis:" : "Valid until:"} 15 March 2025
                        </p>
                    </div>
                )}


            </div>

            {/* 💬 STICKY CTA BUTTON */}
            <button
                style={styles.stickyCTA}
                onClick={() => alert(isGerman ? "Anfrage gesendet ✅" : "Request sent ✅")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = colors.greenDark)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = colors.green)}
            >
                💬 {isGerman ? "Pflegekraft anfragen" : "Request Caregiver"}
            </button>
        </main>
    );
}
