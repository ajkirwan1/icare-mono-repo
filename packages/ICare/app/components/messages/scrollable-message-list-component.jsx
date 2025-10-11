import { NavLink } from "react-router";
import { IcareAvatar } from "react-library";
import styles from "../../styles/components/messages/scrollable-message-list.module.scss";

export default function ScrollableMessageList({ threads }) {
  return (
    <ul style={{ flex: "1 1 auto", overflowY: "auto", padding: "10px" }}>
      {threads.map((thread, idx) => (
        <NavLink
          key={thread.threadId}
          to={`carerecipient/contacts/${thread.threadId}`}
        >
          <li
            className={styles.threadItem}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "12px 8px",
              borderBottom: idx < threads.length - 1 ? "1px solid #e6e6e6" : "none"
              // background: "transparent"
            }}
          >
            <IcareAvatar
              imgSrc={`/${thread.imgSrc}`}
              imgAlt={thread.caregiverName || "Caregiver"}
            />
            <div>
              <strong>{thread.caregiverName || "Unknown Caregiver"}</strong><br />
              Unread Messages: {thread.unreadCount}<br />
              {/* Last Updated: {new Date(thread.lastUpdated).toISOString()}<br /> */}
            </div>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
