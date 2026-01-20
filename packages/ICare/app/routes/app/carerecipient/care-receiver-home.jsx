import { useEffect, useState } from "react";
import ProfileCard from "../../../features/profile/profile-card.jsx";
import Card from "../../../components/application/data-display/card/card";
import { NavLink } from "react-router";
import RecommendedCaregiverCard from "../../../components/application/care-receiver/recommended-caregivers/recommended-caregiver-card.jsx";


export default function CareRecieverHome() {
  const styles = {
    header: {
      fontSize: "1.6rem",
      fontWeight: 800,
      margin: "0 0 1.5rem 0",
      color: "#375d4f",
      letterSpacing: "0.4px"
    }
  };
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedCaregivers = async () => {
      try {
        const response = await fetch("/api/recommended-caregivers");

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "darta");
        setCaregivers(data);
      } catch (error) {
        console.error("Error fetching recommended caregivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedCaregivers();
  }, []);

  return (
    <>
      <h1 style={styles.header}>Amanda's homepage</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
          gap: "20px",
          alignItems: "start",
          width: "100%"
        }}
      >
        <div style={{ display: "grid", gap: 20 }}>
          <section>
            <ProfileCard />
          </section>
          <section>
            <RecommendedCaregiverCard />
          </section>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <section>
            <Card
              title="My documents"
              subtitle="Basic details & account status"
              footerLinkContent="View your documents"
              footerLinkTo="/carerecipient/documents"
            >asdasdasd</Card>
          </section>
          <section>
            <Card
              title="My inbox"
              subtitle="Basic details & account status"
              footerLinkContent="View your messages"
              footerLinkTo="/carerecipient/care-requests"
            >asdasdasd</Card>
          </section>
          <section>
            <Card
              title="My care requests"
              subtitle="Basic details & account status"
              footerLinkContent="View your care requests"
              footerLinkTo="/carerecipient/care-requests"
            >asdasdasd</Card>
          </section>
        </div>

      </div>

      {/* ===== Responsive tweaks ===== */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: minmax(0, 2fr)"] {
            grid-template-columns: 1fr;
          }
          aside[aria-label="Messages & notifications"] {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}
