import { IcareSection } from "react-library";
import { Suspense, lazy } from "react";

const FullCalendarClient = lazy(() => import("../../../components/calender/full-calender.client.jsx"));

export default function CarerecipientDiaryHome() {
  return (
    <IcareSection>
      <h1>My diary</h1>
      <Suspense fallback={<p>Loading calendar...</p>}>
        <FullCalendarClient />
      </Suspense>
    </IcareSection>
  );
}
