import { Outlet } from "react-router";
import Breadcrumbs from "../../../components/bread-crumbs/bread-crumbs";
import ICareAppNavbar from "../../../components/application/app-navbar/icare-app-navbar";
import ICareFooter from "../../../components/website/pages/shared/footers/icare-footer";

const carerecipientNavItems = [
  { to: "/carerecipient", label: "Home" },
  { to: "/carerecipient/contacts/home", label: "Contacts" },
  { to: "/carerecipient/caregivers", label: "Find caregivers" },
  { to: "/carerecipient/inbox", label: "Inbox" },
  { to: "/carerecipient/documents", label: "Documents" },
  { to: "/carerecipient/care-requests", label: "Care requests" },
  { to: "/carerecipient/profile/personal-details", label: "My profile" },
  { to: "/", label: "Logout" }
];

export default function SomeParent() {
  return (
    <>
      <ICareAppNavbar itemsProp={carerecipientNavItems} />

      <div style={{ padding: "50px", background: "#fff9ef" }}>
        <Breadcrumbs />
        <Outlet />
        <div style={{ marginTop: "20px" }}>
          <ICareFooter />
        </div>
      </div>
    </>
  );
}
