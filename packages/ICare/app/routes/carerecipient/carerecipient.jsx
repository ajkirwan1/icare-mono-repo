import { IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard } from "react-library";
import { useMatches, useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "../../styles/pages/carerecipient.module.scss";

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
  const navigate = useNavigate();
  console.log(matches);

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
        <div className={styles.grid}>
          <IcareMessagesCard />
          <IcareRecommendedCaregiversCard />
        </div>
      </IcareSection>
    </>
  );
}
