// ...existing code...
import React from "react";
import { json } from "@remix-run/node";
import { getAllMessages } from "../../../utils/db/get-all-messages";
import { useLoaderData, NavLink } from "react-router";
import { IcareAvatar } from "react-library";
import styles from "../../../styles/pages/messages-home.module.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";


// Loader runs on server (SSR)
export async function loader() {

  const data = await getAllMessages();

  return json(data);
}

export default function Diary() {
  const { data } = useLoaderData();

  const events = [
    { title: "Meditation", start: "2025-10-10T09:00:00" },
    { title: "Work meeting", start: "2025-10-11T14:00:00" }
  ];

  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Diary</h2>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        <li>
          <NavLink to="/carerecipient/messages/all-contacts">All contacts</NavLink>
        </li>
        <li>
          <NavLink to="new">Diary</NavLink>
        </li>
        <li>
          <NavLink to="archived">Qualifications</NavLink>
        </li>
        <li>
          <NavLink to="settings">Bio</NavLink>
        </li>
      </ul>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </>
  );
}
