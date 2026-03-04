import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { requestApiJson } from "../../services/api/http-client";
import "./carereceiver-pages.css";

const defaultSettings = {
    bookingUpdatesEmail: true,
    bookingRemindersEmail: true,
    newMessagesEmail: true,
    productAnnouncementsEmail: false
};

function normalizeSettings(input) {
    return {
        bookingUpdatesEmail: Boolean(input?.bookingUpdatesEmail),
        bookingRemindersEmail: Boolean(input?.bookingRemindersEmail),
        newMessagesEmail: Boolean(input?.newMessagesEmail),
        productAnnouncementsEmail: Boolean(input?.productAnnouncementsEmail)
    };
}

export default function CarereceiverSettingsNotifications() {
    const [settings, setSettings] = useState(defaultSettings);
    const [savedAt, setSavedAt] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadFromApi() {
            setLoading(true);
            setError("");
            try {
                const payload = await requestApiJson("/api/v1/carereceiver/settings/notifications", {
                    errorLabel: "Could not load notification settings.",
                    networkErrorHint: "Could not connect to settings API on http://localhost:4001."
                });

                if (cancelled) {
                    return;
                }

                setSettings(normalizeSettings(payload?.settings || defaultSettings));
                if (payload?.updatedAt) {
                    setSavedAt(String(payload.updatedAt));
                }
            } catch (loadError) {
                if (cancelled) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load notification settings.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadFromApi();
        return () => {
            cancelled = true;
        };
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

    async function handleSave(event) {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = await requestApiJson("/api/v1/carereceiver/settings/notifications", {
                method: "PUT",
                body: { settings },
                errorLabel: "Could not save notification settings.",
                networkErrorHint: "Could not connect to settings API on http://localhost:4001."
            });

            setSettings(normalizeSettings(payload?.settings || settings));
            setSavedAt(payload?.updatedAt ? String(payload.updatedAt) : new Date().toISOString());
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Could not save notification settings.");
        } finally {
            setSaving(false);
        }
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

                {error ? (
                    <section className="cr-alert" role="alert">
                        <p>{error}</p>
                    </section>
                ) : null}

                <form className="cr-card" onSubmit={handleSave}>
                    <div className="cr-list">
                        <label className="cr-row" htmlFor="bookingUpdatesEmail">
                            <div>
                                <p className="cr-row-title">Booking status updates</p>
                                <p className="cr-row-sub">Requested, accepted, cancelled and completed updates.</p>
                            </div>
                            <input
                                checked={settings.bookingUpdatesEmail}
                                disabled={loading || saving}
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
                                disabled={loading || saving}
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
                                disabled={loading || saving}
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
                                disabled={loading || saving}
                                id="productAnnouncementsEmail"
                                onChange={setToggle("productAnnouncementsEmail")}
                                type="checkbox"
                            />
                        </label>
                    </div>

                    <div className="cr-inline" style={{ marginTop: "14px" }}>
                        <button className="cr-button cr-button--primary" type="submit" disabled={loading || saving}>
                            {saving ? "Saving..." : "Save Preferences"}
                        </button>
                        <Link className="cr-button cr-button--secondary" to="/carereceiver/settings">
                            Back to Settings
                        </Link>
                        {loading ? <span className="cr-muted">Loading settings...</span> : null}
                        {saveSummary ? <span className="cr-muted">Saved at {saveSummary}</span> : null}
                    </div>
                </form>
            </div>
        </div>
    );
}
