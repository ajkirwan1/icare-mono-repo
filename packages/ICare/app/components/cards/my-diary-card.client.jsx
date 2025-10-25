import { IcareCard } from "react-library";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { NavLink } from "react-router";

const events = [
  {
    title: "Doctor Appointment – Dr. Adams",
    start: "2025-10-20T09:30:00",
    end: "2025-10-20T10:15:00",
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
    extendedProps: {
      type: "appointment",
      location: "Downtown Medical Clinic",
      status: "confirmed"
    }
  },
  {
    title: "Physical Therapy Session",
    start: "2025-10-21T14:00:00",
    end: "2025-10-21T15:00:00",
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
    extendedProps: {
      type: "therapy",
      caregiver: "Emma Brown",
      status: "scheduled"
    }
  },
  {
    title: "Medication Reminder – Morning Pills",
    start: "2025-10-22T08:00:00",
    backgroundColor: "#FFC107",
    borderColor: "#FFC107",
    extendedProps: {
      type: "reminder",
      status: "pending"
    }
  },
  {
    title: "Weekly Check-in Call",
    start: "2025-10-22T17:30:00",
    backgroundColor: "#FF9800",
    borderColor: "#FF9800",
    extendedProps: {
      type: "communication",
      contact: "Care Coordinator",
      status: "scheduled"
    }
  },
  {
    title: "Caregiver Visit – Sarah J.",
    start: "2025-10-23T10:00:00",
    end: "2025-10-23T13:00:00",
    backgroundColor: "#9C27B0",
    borderColor: "#9C27B0",
    extendedProps: {
      type: "caregiver_visit",
      caregiver: "Sarah Johnson",
      status: "completed"
    }
  },
  {
    title: "Family Visit",
    start: "2025-10-24T15:00:00",
    end: "2025-10-24T17:00:00",
    backgroundColor: "#FF5722",
    borderColor: "#FF5722",
    extendedProps: {
      type: "personal",
      visitors: ["Daughter", "Grandson"],
      status: "confirmed"
    }
  },
  {
    title: "Refill Medication",
    start: "2025-10-25T11:00:00",
    backgroundColor: "#607D8B",
    borderColor: "#607D8B",
    extendedProps: {
      type: "reminder",
      status: "pending"
    }
  },
  {
    title: "Exercise Session – Morning Walk",
    start: "2025-10-26T07:30:00",
    backgroundColor: "#03A9F4",
    borderColor: "#03A9F4",
    extendedProps: {
      type: "exercise",
      duration: "30 min",
      status: "done"
    }
  },
  {
    title: "Nutrition Consultation",
    start: "2025-10-27T10:00:00",
    end: "2025-10-27T11:00:00",
    backgroundColor: "#8BC34A",
    borderColor: "#8BC34A",
    extendedProps: {
      type: "appointment",
      location: "Wellness Center",
      status: "scheduled"
    }
  },
  {
    title: "Medication Reminder – Evening Pills",
    start: "2025-10-27T20:00:00",
    backgroundColor: "#FFC107",
    borderColor: "#FFC107",
    extendedProps: {
      type: "reminder",
      status: "pending"
    }
  }
];


export default function MyDiaryCard() {
  return (
    <IcareCard variant="elevated">
      <span slot="contents">
        <NavLink to="/carerecipient/diary" style={{ color: "inherit" }}>
          <h2>My Diary</h2>
        </NavLink>
        <FullCalendar
          plugins={[listPlugin]}
          initialView="listWeek"
          events={events}
          height="auto"
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <NavLink style={{
            padding: "10px 20px",
            color: "#4CAF50",
            cursor: "pointer",
            marginTop: "16px"
          }} to="/carerecipient/diary">View Diary</NavLink>
        </div>
      </span>
    </IcareCard>
  );
}
