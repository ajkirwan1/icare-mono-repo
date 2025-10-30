import { IcareSection } from "react-library";
import { getAllCaregivers } from "../../utils/db/get-all-caregivers";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import CaregiverCard from "../../components/cards/caregiver-card";
import { useState } from "react";

export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
  ];
}

export async function loader() {
  const data = await getAllCaregivers();
  return json(data);
}

export default function CaregiverRecipientHome() {
  const { caregivers } = useLoaderData();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <IcareSection>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {/* LEFT FILTER PANEL */}
        <div
          style={{
            width: isExpanded ? "250px" : "60px",
            transition: "width 0.3s ease",
            background: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "1rem",
            overflow: "hidden"
          }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {isExpanded ? "« Hide Filters" : "»"}
          </button>

          {isExpanded && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontWeight: "600" }}>Location</label>
                <select style={{ width: "100%", marginTop: "0.25rem" }}>
                  <option>All</option>
                  <option>New York</option>
                  <option>Chicago</option>
                  <option>Los Angeles</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: "600" }}>Availability</label>
                <select style={{ width: "100%", marginTop: "0.25rem" }}>
                  <option>Any</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: "600" }}>Rating</label>
                <select style={{ width: "100%", marginTop: "0.25rem" }}>
                  <option>All</option>
                  <option>4★ & up</option>
                  <option>3★ & up</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* CAREGIVER GRID */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
              gap: "2rem"
            }}
          >
            {caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver.id} data={caregiver} />
            ))}
          </div>
        </div>
      </div>
    </IcareSection>
  );
}
