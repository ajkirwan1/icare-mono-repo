import Card from "../../../../components/application/data-display/card/card";
import "react-circular-progressbar/dist/styles.css";
import { NavLink } from "react-router";

export default function RecommendedCaregiverCard({
  caregivers = [],
  loading = false,
  error = ""
}) {

  return (
    <Card
      title="Recommended caregivers"
      subtitle="Basic details & account status"
      footerLinkContent="Search for caregivers"
      footerLinkTo="/carerecipient/caregivers"
    >
      {loading && <div>Loading caregivers…</div>}
      {!loading && error ? <div>{error}</div> : null}

      {!loading && caregivers.length === 0 && (
        <div>No recommendations available.</div>
      )}

      {!loading && caregivers.length > 0 && (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 26,
            padding: 0,
            margin: 0,
            listStyle: "none"
          }}
        >
          {caregivers.map((caregiver) => (
            <li
              key={caregiver.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.06)";
              }}
            >
              <NavLink
                to={`caregivers/${caregiver.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 22,
                  textDecoration: "none",
                  color: "inherit",
                  height: "100%"
                }}
              >
                {/* Avatar */}
                <img
                  src={caregiver.imgSrc}
                  alt={caregiver.imgAlt}
                  width={96}
                  height={96}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 14,
                    boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                    height: "96px",
                    width: "96px"
                  }}
                />

                {/* Name */}
                <strong
                  style={{
                    fontSize: "1.05rem",
                    color: "#1f2937",
                    marginBottom: 6
                  }}
                >
                  {caregiver.name}
                </strong>

                {/* Bio */}
                <p
                  style={{
                    fontSize: 14,
                    color: "#4b5563",
                    lineHeight: 1.45,
                    margin: 0
                  }}
                >
                  {caregiver.bio}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>


      )}
    </Card>
  );
}
