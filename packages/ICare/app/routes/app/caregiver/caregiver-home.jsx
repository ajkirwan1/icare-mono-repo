import Card from "../../../components/application/data-display/card/card.jsx";
import AvailableCareRolesCard from "../../../features/pages/caregiver/available-care-roles.jsx";
import MyDocumentsCard from "../../../features/pages/caregiver/my-documents.jsx";
import CaregiverProfileSummaryCard from "../../../features/pages/caregiver/caregiver-profile-summary-card.jsx";


export default function CaregiverHome() {
  const styles = {
    header: {
      fontSize: "1.6rem",
      fontWeight: 800,
      margin: "0 0 1.5rem 0",
      color: "#375d4f",
      letterSpacing: "0.4px"
    }
  };

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
            <CaregiverProfileSummaryCard />
          </section>
          <section>
            <MyDocumentsCard />
          </section>
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <section>
            <AvailableCareRolesCard />
          </section>
          <section>
            <Card
              title="My inbox"
              subtitle="Basic details & account status"
              footerLinkContent="View your messages"
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
