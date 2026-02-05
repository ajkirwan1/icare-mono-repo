import { Outlet, NavLink } from "react-router";
// import { IcarePage, IcareHeader, IcareSection, IcareButton, IcareAvatar } from "react-library";

export default function SomeParent() {
  return (
    // <IcarePage>
    //   <IcareHeader>
    //     <li slot="nav-links"><NavLink to="/#" style={{ "color": "black" }}>Link</NavLink></li>
    //     <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
    //     <li slot="nav-links"><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
    //     <li slot="header-buttons"><IcareButton href='/'>Logout</IcareButton></li>
    //     <li slot="header-avatar"><IcareAvatar /></li>
    //   </IcareHeader>
    //   <IcareSection>
    //     Breadcrumb
    //   </IcareSection>
    //   <Outlet />
    // </IcarePage>
    <div>
      <nav>
        <ul>
          <li><NavLink to="/#" style={{ "color": "black" }}>Link</NavLink></li>
          <li><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
          <li><NavLink to="#" style={{ "color": "black" }}>Link</NavLink></li>
          <li><a href='/'>Logout</a></li>
        </ul>
      </nav>
      <div>Breadcrumb</div>
      <Outlet />
    </div>
  );
}
