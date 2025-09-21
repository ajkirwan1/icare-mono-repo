import { IcarePage, IcareHeader, IcareMessagesCard, IcareSection, IcareRecommendedCaregiversCard, IcareButton, IcareAvatar } from "react-library";
import { NavLink, useMatches } from "react-router";

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
    <IcarePage>
      <IcareHeader>
        <li slot="nav-links"><NavLink to="/#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="header-buttons"><IcareButton href='/'>Logout</IcareButton></li>
        <li slot="header-avatar"><IcareAvatar /></li>
      </IcareHeader>
      <IcareSection>
        Breadcrumb
      </IcareSection>
      <IcareSection>
        <IcareMessagesCard />
      </IcareSection>
      <IcareSection>
        <IcareRecommendedCaregiversCard />
      </IcareSection>
    </IcarePage>
  );
}
