import Card from "../../components/application/data-display/card/card";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { NavLink } from "react-router";

export default function ProfileCard() {

  const percentage = 66; // number between 0-100

  return (
    <Card title="My profile" subtitle="Basic details & account status">
      {/* <p>Manage your personal information and settings.</p> */}
      <div style={{ display: "flex" }}>
        <img src={imgSrc} alt="Care Receiver Profile" style={{ height: "400px", borderRadius: "8px", marginTop: "16px" }} />
        <div style={{ flex: "1 1 auto", minWidth: 0, height: "100%", marginLeft: "24px", marginTop: "16px" }}>
          <p><strong>Name:</strong> Jane Doe</p>
          <p><strong>Age:</strong> 68</p>
          <p><strong>Location:</strong> Springfield, IL</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "24px" }}>
            <h3>Profile Completion</h3>
            <div style={{ width: "100px", height: "100px" }}>
              <CircularProgressbar value={percentage} text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "#333333",
                  pathColor: "#4CAF50",
                  trailColor: "#d6d6d6",
                  strokeLinecap: "round"
                })}
              />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "16px", justifyContent: "space-between" }}>
              <span>Personal Information</span>
              <FaCheckCircle color="green" size={24} style={{ marginRight: "8px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "16px", justifyContent: "space-between" }}>
              <span>Caregiver preferences</span>
              <FaCheckCircle color="green" size={24} style={{ marginRight: "8px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "16px", justifyContent: "space-between" }}>
              <span>Personal Biography</span>
              <FaTimesCircle color="red" size={24} style={{ marginRight: "8px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "16px", justifyContent: "space-between" }}>
              <span>Personal Health</span>
              <FaTimesCircle color="red" size={24} style={{ marginRight: "8px" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink style={{
          padding: "10px 20px",
          color: "#4CAF50",
          cursor: "pointer",
          marginTop: "16px"
        }} to="/carerecipient/profile/personal-details">Edit Profile</NavLink>
      </div>
    </Card>
  );
}
