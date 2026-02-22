import { Outlet } from "react-router";
import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { adminNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ICareAppNavbar navItems={adminNavItems} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <ICareFooter />
    </div>
  );
}
