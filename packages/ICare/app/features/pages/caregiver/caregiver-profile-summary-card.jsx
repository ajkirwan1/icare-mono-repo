import Card from "../../../components/application/data-display/card/card";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { NavLink } from "react-router";
import styles from "./caregiver-profile-summary-card.module.scss";

export default function CaregiverProfileSummaryCard() {

  const person = {
    name: "Jane Doe",
    age: 68,
    location: "Springfield, IL",
    profileCompletion: 60,
    lastUpdated: "2 days ago",
    activeRequests: 2,
    preferredCare: "Companionship / Day care"
  };
  const sections = [
    { label: "Personal information", complete: true },
    { label: "Caregiver preferences", complete: true },
    { label: "Personal biography", complete: false },
    { label: "Personal health", complete: false }
  ];

  return (
    <Card title="My profile summary" subtitle="Basic details & account status">
      <div style={{ display: "grid", gap: 14 }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(15, 23, 42, 0.08)",
            background: "#fff"
          }}
        >
          <img
            src={imgSrc}
            alt="Profile"
            width={40}
            height={40}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(97, 148, 130, 0.35)",
              background: "#fff",
              flexShrink: 0
            }}
          />

          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10
              }}
            >
              <strong
                style={{
                  fontSize: "0.95rem",
                  color: "#1f2937",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {person.name}
              </strong>

              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: "#2f5b4b",
                  background: "rgba(97, 148, 130, 0.12)",
                  border: "1px solid rgba(97, 148, 130, 0.25)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                  flexShrink: 0
                }}
              >
                {person.profileCompletion}% complete
              </span>
            </div>

            <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 3 }}>
              {person.age} <span style={{ opacity: 0.6 }}>•</span>{" "}
              {person.location}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 10
          }}
        >
          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(15, 23, 42, 0.06)",
              background: "#f4f9f7",
              padding: 12
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#4b5563" }}>
              Active requests
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#111827" }}>
              {person.activeRequests}
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(15, 23, 42, 0.06)",
              background: "#f4f9f7",
              padding: 12
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#4b5563" }}>
              Preferred care
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "#111827",
                marginTop: 2,
                lineHeight: 1.2
              }}
            >
              {person.preferredCare}
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(15, 23, 42, 0.06)",
              background: "#f4f9f7",
              padding: 12
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#4b5563" }}>
              Last updated
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "#111827",
                marginTop: 2
              }}
            >
              {person.lastUpdated}
            </div>
          </div>
        </div>

        {/* Section completion */}
        <div style={{ display: "grid", gap: 10 }}>
          {sections.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid rgba(15, 23, 42, 0.06)",
                background: "#fff"
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#374151" }}>
                {s.label}
              </span>

              {s.complete ? (
                <FaCheckCircle style={{ color: "#16a34a", fontSize: "1.1rem" }} />
              ) : (
                <FaTimesCircle style={{ color: "#dc2626", fontSize: "1.1rem" }} />
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255, 248, 230, 0.95)",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            fontSize: "0.8rem",
            color: "#475569",
            lineHeight: 1.3
          }}
        >
          Tip: Completing your biography helps caregivers match you faster.
        </div>
      </div>
    </Card>
  );
}
