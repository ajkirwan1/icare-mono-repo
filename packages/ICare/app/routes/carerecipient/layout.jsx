import { Outlet, NavLink } from "react-router";
import { IcarePage, IcareHeader, IcareSection, IcareButton, IcareAvatar } from "react-library";
import Breadcrumbs from "../../components/bread-crumbs/bread-crumbs";

// export const handle = {
//   breadcrumb: "Layout"
// };

export default function SomeParent() {
  return (
    <IcarePage>
      <IcareHeader>
        <li slot="nav-links"><NavLink to="/#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
        <li slot="header-buttons"><IcareButton href='/'>Logout</IcareButton></li>
        <li slot="header-avatar"><IcareAvatar /></li>
      </IcareHeader>
      <Breadcrumbs />
      <Outlet />
    </IcarePage>

  );
}
