import { IcareSection } from "react-library";
import { NavLink } from "react-router";


export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export default function CaregiverAccountHome() {

  return (
    <>
      <IcareSection>
        <h1>My account details</h1>
        <nav>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "1rem" }}>
            <li>
              <NavLink to="/carerecipient/account/my-account">My Accounts</NavLink>
            </li>
            <li>
              <NavLink to="/carerecipient/account/billing-information">Billing Information</NavLink>
            </li>
            <li>
              <NavLink to="/carerecipient/account/security-settings">Security Settings</NavLink>
            </li>
            <li>
              <NavLink to="/carerecipient/account/notification-preferences">Notification Preferences</NavLink>
            </li>
          </ul>
        </nav>
      </IcareSection>
    </>
  );
}
