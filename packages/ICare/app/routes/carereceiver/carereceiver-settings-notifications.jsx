import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./carereceiver-pages.css";

const STORAGE_KEY = "icare.carereceiver.notification-settings.v1";
const defaultSettings = {
    bookingUpdatesEmail: true,
    bookingRemindersEmail: true,
    newMessagesEmail: true,
    productAnnouncementsEmail: false
};

function loadInitialSettings() {
    if (typeof window === "undefined") {
        return defaultSettings;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaultSettings;
        }

        const parsed = JSON.parse(raw);
        return {
            bookingUpdatesEmail: Boolean(parsed.bookingUpdatesEmail),
            bookingRemindersEmail: Boolean(parsed.bookingRemindersEmail),
            newMessagesEmail: Boolean(parsed.newMessagesEmail),
            productAnnouncementsEmail: Boolean(parsed.productAnnouncementsEmail)
        };
    } catch {
        return defaultSettings;
    }
}

export default function CarereceiverSettingsNotifications() {
    const [settings, setSettings] = useState(defaultSettings);
    const [savedAt, setSavedAt] = useState("");

    useEffect(() => {
        setSettings(loadInitialSettings());
    }, []);

    const saveSummary = useMemo(() => {
        if (!savedAt) {
            return "";
        }

        const date = new Date(savedAt);
        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    }, [savedAt]);

    function setToggle(key) {
        return (event) => {
            const checked = event.target.checked;
            setSettings((current) => ({ ...current, [key]: checked }));
        };
    }

    function handleSave(event) {
        event.preventDefault();

        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }

        setSavedAt(new Date().toISOString());
    }

    return (
        <div className="cr-page">
            <div className="cr-shell cr-shell--encapsulated">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb">
                    <Link to="/carereceiver/dashboard">Dashboard</Link>
                    <span>&rsaquo;</span>
                    <Link to="/carereceiver/settings">Settings</Link>
                    <span>&rsaquo;</span>
                    <strong>Notifications</strong>
                </nav>

                <header className="cr-header">
                    <h1>Notification Preferences</h1>
                    <p>Control which updates you get by email.</p>
                </header>

                <form className="cr-card" onSubmit={handleSave}>
                    <div className="cr-list">
                        <label className="cr-row" htmlFor="bookingUpdatesEmail">
                            <div>
                                <p className="cr-row-title">Booking status updates</p>
                                <p className="cr-row-sub">Requested, accepted, cancelled and completed updates.</p>
                            </div>
                            <input
                                checked={settings.bookingUpdatesEmail}
                                id="bookingUpdatesEmail"
                                onChange={setToggle("bookingUpdatesEmail")}
                                type="checkbox"
                            />
                        </label>

                        <label className="cr-row" htmlFor="bookingRemindersEmail">
                            <div>
                                <p className="cr-row-title">Booking reminders</p>
                                <p className="cr-row-sub">Reminders before upcoming bookings.</p>
                            </div>
                            <input
                                checked={settings.bookingRemindersEmail}
                                id="bookingRemindersEmail"
                                onChange={setToggle("bookingRemindersEmail")}
                                type="checkbox"
                            />
                        </label>

                        <label className="cr-row" htmlFor="newMessagesEmail">
                            <div>
                                <p className="cr-row-title">New message alerts</p>
                                <p className="cr-row-sub">Alerts when caregivers send a new message.</p>
                            </div>
                            <input
                                checked={settings.newMessagesEmail}
                                id="newMessagesEmail"
                                onChange={setToggle("newMessagesEmail")}
                                type="checkbox"
                            />
                        </label>

                        <label className="cr-row" htmlFor="productAnnouncementsEmail">
                            <div>
                                <p className="cr-row-title">Platform announcements</p>
                                <p className="cr-row-sub">Optional product updates and feature announcements.</p>
                            </div>
                            <input
                                checked={settings.productAnnouncementsEmail}
                                id="productAnnouncementsEmail"
                                onChange={setToggle("productAnnouncementsEmail")}
                                type="checkbox"
                            />
                        </label>
                    </div>

                    <div className="cr-inline" style={{ marginTop: "14px" }}>
                        <button className="cr-button cr-button--primary" type="submit">
                            Save Preferences
                        </button>
                        <Link className="cr-button cr-button--secondary" to="/carereceiver/settings">
                            Back to Settings
                        </Link>
                        {saveSummary ? <span className="cr-muted">Saved at {saveSummary}</span> : null}
                    </div>
                </form>
            </div>
        </div>
    );
}
