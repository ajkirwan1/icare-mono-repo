import { NavLink } from "react-router";

export default function AvailableCareRolesListCard() {
  const dummyRoles = [
    {
      id: 1,
      title: "Live-in Caregiver",
      location: "Dublin",
      hourlyRate: "€20/hr",
      schedule: "Full-time",
      careType: "Live-in",
      postedAt: "2 days ago",
      urgency: "High",
      description: "Provide full-time in-home care, companionship, and daily support.",
      requirements: ["Experience required", "Background check"]
    },
    {
      id: 2,
      title: "Elderly Day Care Assistant",
      location: "Cork",
      hourlyRate: "€18/hr",
      schedule: "Weekdays",
      careType: "Day care",
      postedAt: "5 days ago",
      urgency: "Medium",
      description: "Assist seniors with daily activities during daytime hours.",
      requirements: ["Training provided"]
    },
    {
      id: 3,
      title: "Post-Surgery Home Support",
      location: "Galway",
      hourlyRate: "€22/hr",
      schedule: "Short-term",
      careType: "Recovery support",
      postedAt: "1 day ago",
      urgency: "High",
      description: "Short-term recovery support following hospital discharge.",
      requirements: ["Medical experience preferred"]
    },
    {
      id: 4,
      title: "Companion Care Assistant",
      location: "Limerick",
      hourlyRate: "€16/hr",
      schedule: "Part-time",
      careType: "Companionship",
      postedAt: "1 week ago",
      urgency: "Low",
      description: "Provide companionship, conversation, and light household help.",
      requirements: ["No formal experience required"]
    },
    {
      id: 5,
      title: "Night Care Assistant",
      location: "Waterford",
      hourlyRate: "€21/hr",
      schedule: "Nights",
      careType: "Overnight care",
      postedAt: "3 days ago",
      urgency: "High",
      description: "Overnight supervision and emergency assistance.",
      requirements: ["First aid certified"]
    },
    {
      id: 6,
      title: "Dementia Care Specialist",
      location: "Dublin",
      hourlyRate: "€24/hr",
      schedule: "Flexible",
      careType: "Specialist care",
      postedAt: "Today",
      urgency: "Medium",
      description: "Specialized support for individuals living with dementia.",
      requirements: ["Dementia care experience"]
    },
    {
      id: 7,
      title: "Night Care Assistant",
      location: "Waterford",
      hourlyRate: "€21/hr",
      schedule: "Nights",
      careType: "Overnight care",
      postedAt: "3 days ago",
      urgency: "High",
      description: "Overnight supervision and emergency assistance.",
      requirements: ["First aid certified"]
    },
    {
      id: 8,
      title: "Dementia Care Specialist",
      location: "Dublin",
      hourlyRate: "€24/hr",
      schedule: "Flexible",
      careType: "Specialist care",
      postedAt: "Today",
      urgency: "Medium",
      description: "Specialized support for individuals living with dementia.",
      requirements: ["Dementia care experience"]
    }
  ];


  return (
    <>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "14px"
        }}
      >
        {dummyRoles.map((role) => (
          <NavLink
            key={role.id}
            to={`/caregiver/available-care-roles/${role.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li
              key={role.id}
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = "rgba(97,148,130,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)";
              }}
            >
              {/* Header row */}
              <img
                src="https://ui-avatars.com/api/?name=Caregiver&background=E6F0EC&color=4C7865&size=128"
                alt="Caregiver avatar"
                width={56}
                height={56}
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}
              >
                <div>
                  <strong style={{ display: "block", fontSize: "0.95rem" }}>
                    {role.title}
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "#555" }}>
                    {role.location} · {role.schedule}
                  </span>
                </div>

                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  {role.hourlyRate}
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#444",
                  lineHeight: 1.4
                }}
              >
                {role.description}
              </p>

              {/* Meta row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  color: "#666"
                }}
              >
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: "#eef5f2",
                      fontWeight: 500
                    }}
                  >
                    {role.careType}
                  </span>

                  {role.urgency === "High" && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: "#fdecea",
                        color: "#b42318",
                        fontWeight: 600
                      }}
                    >
                      High urgency
                    </span>
                  )}
                </div>

                <span>{role.postedAt}</span>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </>


  );
}
