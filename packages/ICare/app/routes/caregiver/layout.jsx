import { Outlet } from "react-router";
import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { caregiverNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";

export default function CaregiverLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ICareAppNavbar navItems={caregiverNavItems} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <ICareFooter />
    </div>
  );
}
