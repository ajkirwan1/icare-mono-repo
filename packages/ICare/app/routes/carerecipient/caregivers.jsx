import { IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard } from "react-library";
// import { useMatches } from "react-router";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}
export const handle = {
  breadcrumb: "Homeasdasasdsad"
};

export default function CaregiverRecipientHome() {

  // const matches = useMatches();

  return (
    <>
      <IcareSection>
        ALL CAREGIVERS TO BE HERE
      </IcareSection>
    </>
  );
}
