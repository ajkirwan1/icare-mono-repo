// ...existing code...
import React from "react";
import { json } from "@remix-run/node";
import { getAllMessages } from "../../../utils/db/get-all-messages";
import { useLoaderData, NavLink } from "react-router";
import { IcareAvatar } from "react-library";
import styles from "../../../styles/pages/messages-home.module.scss";

// Loader runs on server (SSR)
export async function loader() {

  const data = await getAllMessages();

  return json(data);
}

export default function MessagesHomePage() {
  const { data } = useLoaderData();

  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>My contacts</h2>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        <li>
          <NavLink to="/carerecipient/messages/all-contacts">All contacts</NavLink>
        </li>
        <li>
          <NavLink to="/carerecipient/messages/${id}/diary">Diary</NavLink>
        </li>
        <li>
          <NavLink to="archived">Qualifications</NavLink>
        </li>
        <li>
          <NavLink to="settings">Bio</NavLink>
        </li>
      </ul>
      <ul className={styles.threadList}
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          // padding: 0,
          // margin: 0,
          listStyle: "none"
        }}>
        {data.map((thread) => (
          <li
            key={thread.threadId}
            className={styles.threadItem}
            style={{
              width: 140,
              height: 140,
              listStyle: "none",
              borderRadius: 8,
              border: "1px solid #e6e6e6",
              padding: 12,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              textDecoration: "none",
              color: "inherit",
              overflow: "hidden"
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", width: "100%" }}>
              <IcareAvatar
                imgSrc={`/${thread.imgSrc}`}
                imgAlt={thread.caregiverName || "Caregiver"}
              />
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <strong style={{ fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {thread.caregiverName || "Unknown Caregiver"}
                </strong>
              </div>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#444", width: "100%" }}>
              <div style={{ marginBottom: 6 }}>Unread: {thread.unreadCount}</div>
              <div style={{ color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {new Date(thread.lastUpdated).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
