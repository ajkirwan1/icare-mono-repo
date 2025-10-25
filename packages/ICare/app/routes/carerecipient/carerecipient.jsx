import { IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard, IcareCard } from "react-library";
import { useNavigate } from "react-router";
import { useEffect, lazy, Suspense } from "react";
// import styles from "../../styles/pages/carerecipient.module.scss";
// import FullCalendar from "@fullcalendar/react";
// import listPlugin from "@fullcalendar/list";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import MyProfileCard from "../../components/cards/my-profile-card";




export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}
export const handle = {
  breadcrumb: "Home"
};

const MyDiaryCard = lazy(() => import("../../components/cards/my-diary-card.client.jsx"));

export default function CaregiverRecipientHome() {

  const navigate = useNavigate();

  useEffect(() => {
    const onNavigate = (e) => {
      const to = e && e.detail; // CustomEvent<string>
      if (typeof to === "string") {
        e.preventDefault?.();
        navigate(to);
      }
    };
    // listen high in the tree to catch composed/bubbling CustomEvents
    document.addEventListener("navigate", onNavigate);
    return () => document.removeEventListener("navigate", onNavigate);
  }, [navigate]);

  return (
    <>
      <IcareSection>
        <div
          style={{
            columnCount: 2,                // Two columns (max 50% width each)
            columnGap: "24px",             // Space between columns
            width: "100%"
            // maxWidth: "1200px",            // Optional container width
            // margin: "0 auto"
          }}
        >
          {/* Each child must avoid breaking inside a column */}
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <MyProfileCard />
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareRecommendedCaregiversCard />
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <Suspense fallback={<div>Loading diary...</div>}>
              <MyDiaryCard />
            </Suspense>
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareCard variant="elevated">
              <span slot="contents">
                <h2>Acount Summary</h2>
                Custom content inside Messages Card
              </span>
            </IcareCard>
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareCard variant="elevated">
              <span slot="contents">
                <h2>My Contracts</h2>
                Custom content inside Messages Card
              </span>
            </IcareCard>
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareCard variant="elevated">
              <span slot="contents">
                <h2>My Documents</h2>
                Custom content inside Messages Card
              </span>
            </IcareCard>
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareMessagesCard />
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareMessagesCard />
          </div>
          <div style={{ breakInside: "avoid", marginBottom: "24px" }}>
            <IcareMessagesCard />
          </div>
        </div>
      </IcareSection>
    </>
  );
}
