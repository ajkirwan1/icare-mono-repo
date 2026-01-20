import { useEffect, useState } from "react";
import Card from "../../../components/application/data-display/card/card";
import "react-circular-progressbar/dist/styles.css";

const API = import.meta.env.VITE_API_URL;

export default function AvailableCareRolesCard() {

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const run = async () => {
      console.log("FIRED");
      const res = await fetch("http://localhost:4001/api/available-care-roles");
      console.log(res);
      const data = await res.json();
      console.log(data);
      setRoles(data);
    };
    run();
  }, []);

  const numberOfCareRoles = roles.length;

  return (
    <Card
      title="Available care roles"
      subtitle="View all care role positions"
      footerLinkContent="View available care roles"
      footerLinkTo="/caregiver/available-care-roles"
    >
      <div style={{ display: "grid", gap: "6px" }}>
        <div>
          <strong>{numberOfCareRoles}</strong> care roles currently available
        </div>

        <div style={{ fontSize: "0.9rem", color: "#555" }}>
          Locations: <em>Loading locations…</em>
        </div>

        <div style={{ fontSize: "0.9rem", color: "#555" }}>
          Hourly rates: <em>Calculating range…</em>
        </div>

        <div style={{ fontSize: "0.85rem", color: "#777", marginTop: "4px" }}>
          <em>Checking for recently added roles…</em>
        </div>
      </div>
    </Card>
  );
}
