import ICareAppNavbar from "~/components/application/app-navbar/icare-app-navbar";
import { careReceiverNavItems } from "~/components/application/app-navbar/nav-items";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";
import BookingDetailPage from "../app/carerecipient/booking-detail.jsx";
import "./carereceiver-booking-detail.css";

export { meta, handle, loader } from "../app/carerecipient/booking-detail.jsx";

export default function CarereceiverBookingDetailPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <ICareAppNavbar navItems={careReceiverNavItems} />
            <main style={{ flex: 1 }}>
                <div className="cr-booking-detail-wrapper">
                    <BookingDetailPage />
                </div>
            </main>
            <ICareFooter />
        </div>
    );
}
