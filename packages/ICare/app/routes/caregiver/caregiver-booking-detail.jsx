import BookingDetailPage from "../app/carerecipient/booking-detail.jsx";
import "./caregiver-booking-detail.css";

export { meta, handle, loader } from "../app/carerecipient/booking-detail.jsx";

export default function CaregiverBookingDetailPage() {
  return (
    <div className="cg-booking-detail-wrapper">
      <BookingDetailPage />
    </div>
  );
}
