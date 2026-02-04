// import { IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard } from "react-library";
import { useMatches } from "react-router";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}
export const handle = {
  breadcrumb: "Home"
};

export default function CaregiverRecipientHome() {

  const matches = useMatches();
  console.log(matches);
  return (
    <>
      {/* <IcareSection>
        <IcareMessagesCard />
      </IcareSection>
      <IcareSection>
        <IcareRecommendedCaregiversCard />
      </IcareSection> */}
      <div>
        <div style={{ padding: 16, background: "#f9fafb", borderRadius: 8, marginBottom: 16 }}>Messages placeholder</div>
      </div>
      <div>
        <div style={{ padding: 16, background: "#f9fafb", borderRadius: 8 }}>Recommended caregivers placeholder</div>
      </div>
    </>
  );
}
