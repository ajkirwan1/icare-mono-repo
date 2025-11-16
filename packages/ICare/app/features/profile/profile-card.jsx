import Card from "../../components/application/data-display/card/card";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { NavLink } from "react-router";
import styles from "./profile-card.module.scss";

export default function ProfileCard() {

  const percentage = 66;

  return (
    <Card title="My profile" subtitle="Basic details & account status">
      <div className={styles.container}>
        <img
          src={imgSrc}
          alt="Care Receiver Profile"
          className={styles.profileImage}
        />

        <div className={styles.infoSection}>

          <p><strong>Name:</strong> Jane Doe</p>
          <p><strong>Age:</strong> 68</p>
          <p><strong>Location:</strong> Springfield, IL</p>

          <div className={styles.completionSection}>
            <h3>Profile Completion</h3>

            <div className={styles.progressWrapper}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "#333333",
                  pathColor: "#4CAF50",
                  trailColor: "#d6d6d6",
                  strokeLinecap: "round"
                })}
              />
            </div>
          </div>

          <div className={styles.sectionsStatus}>
            <div className={styles.statusRow}>
              <span>Personal Information</span>
              <FaCheckCircle className={styles.iconGreen} size={24} />
            </div>

            <div className={styles.statusRow}>
              <span>Caregiver preferences</span>
              <FaCheckCircle className={styles.iconGreen} size={24} />
            </div>

            <div className={styles.statusRow}>
              <span>Personal Biography</span>
              <FaTimesCircle className={styles.iconRed} size={24} />
            </div>

            <div className={styles.statusRow}>
              <span>Personal Health</span>
              <FaTimesCircle className={styles.iconRed} size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.editRow}>
        <NavLink className={styles.editLink} to="/carerecipient/profile/personal-details">
          Edit Profile
        </NavLink>
      </div>
    </Card>
  );
}
