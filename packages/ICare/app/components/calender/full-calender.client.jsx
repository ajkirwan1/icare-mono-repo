import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function FullCalendarClient() {
  return (
    <FullCalendar
      plugins={[listPlugin, dayGridPlugin, timeGridPlugin]}
    // initialView="listWeek"
    // events={[]}
    // height="auto"
    />
  );
}
