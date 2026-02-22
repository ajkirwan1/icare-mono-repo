import { Outlet } from "react-router";
import Breadcrumbs from "../../../components/bread-crumbs/bread-crumbs";
import ICareAppNavbar from "../../../components/application/app-navbar/icare-app-navbar";
import ICareFooter from "../../../components/website/pages/shared/footers/icare-footer";

const carerecipientNavItems = [
  { to: "/caregiver", label: "Home" },
  { to: "/caregiver/available-care-roles", label: "Caregiving roles" },
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
