// import { IcareSection } from "react-library";
import { getAllCaregivers } from "../../../utils/db/get-all-caregivers";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import CaregiverCard from "../../../components/cards/caregiver-card";

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
  const styles = {
    header: {
      fontSize: "1.6rem",
      fontWeight: 800,
      margin: "0 0 1.5rem 0",
      color: "#375d4f",
      letterSpacing: "0.4px"
    }
  };
  const { caregivers } = useLoaderData();

  return (
    <div>
      <h1 style={styles.header}>Find caregivers</h1>
      <div style={{ display: "flex", gap: "1.5rem" }}>

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
    </div>

  );
}
