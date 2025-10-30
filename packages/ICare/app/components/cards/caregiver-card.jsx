import { IcareCard } from "react-library";
import FavouriteComponent from "../favourite/favourite-component";
import { NavLink } from "react-router";


export default function CaregiverCard({ data }) {
  console.log("CaregiverCard data:", data);
  return (
    <IcareCard variant="elevated">
      <span slot="contents">
        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <div>
            <img
              src={`/${data.imgSrc}`}
              alt={`${data.name}'s avatar`}
              style={{ width: "200px", height: "auto", borderRadius: "8px" }}
            />

          </div>
          <div style={{ flex: 1, marginLeft: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>{data.name}</h2>
              <FavouriteComponent />
            </div>
            <p>Specialty: {data.specialty}</p>
            <p>Experience: {data.experience} years</p>
            {/* VERIFIED BADGE */}
            <div style={{ marginTop: "0.5rem" }}>
              {data.verified ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    color: "#16a34a", // green-600
                    fontWeight: 600
                  }}
                >
                  ✅ Verified
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    color: "#dc2626", // red-600
                    fontWeight: 600
                  }}
                >
                  ⚠️ Not Verified
                </span>
              )}
              <p>Availability: {data.availability}</p>
              <p>Rating: {data.rating} / 5</p>
              <p>Bio: {data.miniBio}</p>
              <p>Location: {data.location}</p>
              <p>{data.specialties.map(val => (
                <span key={val} style={{
                  display: "inline-block",
                  backgroundColor: "#e0f2fe", // blue-100
                  color: "#0369a1", // blue-700
                  padding: "0.25rem 0.5rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  marginRight: "0.5rem",
                  marginTop: "0.5rem"
                }}>{val}</span>
              ))}</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <NavLink to={`/carerecipient/caregivers/${data.id}`}>
            View caregiver</NavLink>
        </div>
      </span>
    </IcareCard>
  );
}
