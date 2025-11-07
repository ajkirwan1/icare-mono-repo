import React from "react";
import { NavLink, Outlet } from "react-router";

// Component
export default function ContactCaregiverLayout() {

    console.log("ContactCaregiverLayout loader data:");

    return (
        <div style={{ padding: "1rem" }}>
            {/* <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        <li>
          <NavLink to="/carerecipient/messages/all-contacts">All contacts</NavLink>
        </li>
        <li>
          <NavLink to="new">Diary</NavLink>
        </li>
        <li>
          <NavLink to="archived">Qualifications</NavLink>
        </li>
        <li>
          <NavLink to="settings">Bio</NavLink>
        </li>
      </ul> */}
            <div>
                <Outlet />
            </div>
        </div>
    );
}
