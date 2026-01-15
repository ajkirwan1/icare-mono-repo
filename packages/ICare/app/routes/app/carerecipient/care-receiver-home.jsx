import ProfileCard from "../../../features/profile/profile-card.jsx";
import Card from "../../../components/application/data-display/card/card";


export default function CareRecieverHome() {

  return (
    <>
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
          <span>Welcome, Amanda</span>
          <section>
            <ProfileCard />
          </section>
          <section>
            <Card title="Recommended caregivers" subtitle="Basic details & account status">asdasdasd</Card>
          </section>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <section>
            <Card title="My documents" subtitle="Basic details & account status">asdasdasd</Card>
          </section>
          <section>
            <Card title="My inbox" subtitle="Basic details & account status">asdasdasd</Card>
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
