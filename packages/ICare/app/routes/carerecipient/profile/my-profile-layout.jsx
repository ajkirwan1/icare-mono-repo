import { Outlet, NavLink } from "react-router";

export default function MyProfileLayout() {
  return (
    <>
      <h1>My account</h1>
      <nav>
        <NavLink to="/carerecipient/profile/personal-details" style={{ marginRight: "1rem" }}>My Profile</NavLink>
        <NavLink to="/carerecipient/profile/medical-information" style={{ marginRight: "1rem" }}>Medical Information</NavLink>
        <NavLink to="/carerecipient/profile/security-settings" style={{ marginRight: "1rem" }}>Security Settings</NavLink>
        <NavLink to="/carerecipient/profile/notification-settings" style={{ marginRight: "1rem" }}>Notification Preferences</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
