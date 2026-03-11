import { Link } from "react-router";
import "./carereceiver-pages.css";

const settingsCards = [
    {
        title: "Payment Methods",
        description: "Manage saved cards, default payment method and Stripe setup status.",
        cta: "Open Payments",
        to: "/carereceiver/settings/payment",
        status: "Required for bookings",
        statusVariant: "critical"
    },
    {
        title: "Notifications",
        description: "Choose which booking and messaging alerts you receive by email.",
        cta: "Edit Notifications",
        to: "/carereceiver/settings/notifications",
        status: "Recommended",
        statusVariant: "recommended"
    },
    {
        title: "Security",
        description: "Review account security options and session protection preferences.",
        cta: "Review Security",
        to: "/carereceiver/settings/security",
        status: "Important",
        statusVariant: "important"
    }
];

export default function CarereceiverSettings() {
    return (
        <div className="cr-page cr-page--caregiver-settings">
            <div className="cr-shell cr-shell--caregiver-settings">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/carereceiver/dashboard">Dashboard</Link>
                    <span>&rsaquo;</span>
                    <strong>Settings</strong>
                </nav>

                <header className="cr-header">
                    <h1>Settings</h1>
                    <p>Manage payment, notifications and account security in one place.</p>
                </header>

                <section className="cr-grid cr-grid--1-1">
                    {settingsCards.map((item) => (
                        <article className="cr-card" key={item.title}>
                            <div className="cr-inline">
                                <h2 style={{ marginBottom: 0 }}>{item.title}</h2>
                                <span className={`cr-chip ${`cr-chip--${item.statusVariant}`}`}>{item.status}</span>
                            </div>
                            <p className="cr-muted" style={{ marginTop: "10px" }}>{item.description}</p>
                            <div style={{ marginTop: "16px" }}>
                                <Link className="cr-button cr-button--primary" to={item.to}>
                                    {item.cta}
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    );
}
