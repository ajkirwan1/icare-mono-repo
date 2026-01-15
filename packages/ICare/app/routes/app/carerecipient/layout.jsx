import { Outlet } from "react-router";
import Breadcrumbs from "../../../components/bread-crumbs/bread-crumbs";
import ICareAppNavbar from "../../../components/application/app-nav-bar/icare-app-navbar";

export default function SomeParent() {
  return (
    <>
      <ICareAppNavbar />
      <div style={{ padding: "50px", background: "#fff9ef" }}>
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  );
}
