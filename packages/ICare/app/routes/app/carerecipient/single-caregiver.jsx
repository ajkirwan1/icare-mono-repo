import { useState } from "react";
import { useLoaderData, NavLink } from "react-router";
import Card from "../../../components/application/data-display/card/card";
import { json } from "@remix-run/node";

export function meta() {
  return [
    { title: "ICare | Caregiver Profile" },
    {
      name: "description",
      content: "Meet trusted caregivers with verified experience and empathy."
    }
  ];
}

export async function loader({ params }) {
  const id = params.caregiverId;
  if (!id) {
    throw new Response("Caregiver id missing", { status: 400 });
  }

  const res = await fetch("http://localhost:4000/caregivers");
  if (!res.ok) {
    throw new Response("Failed to load caregivers", { status: res.status });
  }

  const caregivers = await res.json();
  const caregiver = caregivers.find((c) => String(c.id) === id);

  if (!caregiver) {
    throw new Response("Caregiver not found", { status: 404 });
  }
  return json(caregiver);
}

export default function CaregiverRecipientHome() {
  const caregiver = useLoaderData();
  const [isFavourited, setIsFavourited] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  const toggleFavourite = () => setIsFavourited((v) => !v);

  const colors = {
    background: "#ffffff",
    cardBg: "#f4f4f4",
    green: "#619482",
    greenDark: "#4c7865",
    border: "#dcdede",
    text: "#333"
  };

  const styles = {
    header: {
      fontSize: "1.6rem",
      fontWeight: 800,
      margin: "0 0 1.5rem 0",
      color: "#375d4f",
      letterSpacing: "0.4px"
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `3px solid ${colors.green}`,
      backgroundColor: "#fff"
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
      transition: "all 0.2s ease"
    }),
    langSwitch: {
      backgroundColor: "#e7ebe9",
      color: colors.greenDark,
      fontSize: "0.9rem",
      border: "none",
      borderRadius: "10px",
      padding: "0.4rem 0.8rem",
      cursor: "pointer",
      marginLeft: "auto"
    },
    shortBio: {
      backgroundColor: "#ffffff",
      borderRadius: "14px",
      padding: "1rem",
      marginTop: "1.5rem",
      fontSize: "1.05rem",
      lineHeight: 1.5,
      color: "#444",
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
    },
    section: { margin: "2rem 0" },
    sectionTitle: {
      fontSize: "1.3rem",
      color: colors.greenDark,
      borderLeft: `4px solid ${colors.green}`,
      paddingLeft: "0.5rem",
      marginBottom: "1rem"
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: `2px solid ${colors.border}`,
      marginTop: "2rem",
      paddingTop: "1.5rem",
      gap: "1rem",
      flexWrap: "wrap"
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
      boxShadow: "0 3px 10px rgba(97, 148, 130, 0.25)",
      cursor: "pointer"
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
      zIndex: 1000
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
      fontWeight: "600"
    }
  };

  if (!caregiver) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <main>
      <h1 style={styles.header}>Caregiver details</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <section>
          <Card
            title={caregiver.name}
            footerLinks={[
              { to: "/carerecipient/caregivers", label: "Send message" }
            ]}
          >
            <div style={{ display: "flex" }}>

              <img
                src={`/${caregiver.imgSrc}`}
                alt={caregiver.name}
                style={styles.avatar}
              />
              <div style={{ flex: 1 }}>
                <h1 style={styles.name}>{caregiver.name}</h1>
                <p style={styles.role}>Professional Caregiver</p>
                <p style={styles.location}>{caregiver.location}</p>
                <button
                  onClick={toggleFavourite}
                  style={styles.favButton(isFavourited)}
                >
                  ❤️ {isFavourited ? "In favourites" : "Add to favourites"}
                </button>
              </div>
            </div>

            <NavLink to="messages" style={styles.footerBtn}>
              ✉️ Send Message
            </NavLink>

            <NavLink to="resume" style={styles.footerBtn}>
              📄 View Resume
            </NavLink>
          </Card>

        </section>


        <Card title="Bio" subtitle="Basic details & account status">
          <h2
            style={{
              fontSize: "1.3rem",
              color: "#4c7865",
              borderLeft: "4px solid #619482",
              paddingLeft: "0.5rem",
              marginBottom: "1rem",
              fontWeight: "700"
            }}
          >
            Bio
          </h2>
          <div>
            I am an experienced and empathetic caregiver specializing in elderly
            care, companionship, and daily support.
          </div>
        </Card>

        <Card title="Rates & Services">
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Rates & Services</h2>
            <p>
              <strong>Hourly rate:</strong> {" "}
              £16–20 (negotiable)
            </p>
            <p>
              <strong>Live-in care:</strong> £110/day
            </p>
            <p>
              <strong>Specialties:</strong> Dementia care, Mobility support,
              Post-surgery recovery
            </p>
          </section>
        </Card>

        {/* REVIEWS */}
        <Card title="Client Reviews">
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Client Reviews</h2>
            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "14px",
                marginBottom: "1rem"
              }}
            >
              <p>
                <strong>Anna M.</strong> – ★★★★★
              </p>
              <p>Maria was very kind and attentive to my mother’s needs.</p>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "14px"
              }}
            >
              <p>
                <strong>Thomas L.</strong> – ★★★★☆
              </p>
              <p>Reliable, punctual and professional.</p>
            </div>
          </section>

        </Card>

        <Card title="Documents">
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "1.5rem",
              marginTop: "1rem"
            }}
          >
            <h3 style={styles.sectionTitle}>🧾 References ✅</h3>
            <p>
              Referee: Mrs. Müller, Munich <br />
              Phone: <strong>+49 176 543 982</strong>
              <br />
              “Maria was a wonderful caregiver — always helpful, trustworthy,
              and kind.”
            </p>

            <h3 style={styles.sectionTitle}>🪪 Criminal Record ✅</h3>
            <p>
              Verified via:{" "}
              <a
                href="https://www.gov.uk/request-copy-criminal-record"
                target="_blank"
                rel="noreferrer"
              >
                gov.uk
              </a>
            </p>

            <h3 style={styles.sectionTitle}>🛡 Insurance ✅</h3>
            <p>
              Provider: AXA Insurance Ltd
              <br />
              Policy number: AXA-CARE-9845321
              <br />
              Valid until: 15 March 2025
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
