import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "./carereceiver-pages.css";

const STORAGE_KEY = "icare.carereceiver.security-settings.v1";
const defaultSecuritySettings = {
    signOutAfterPasswordReset: true,
    notifyOnNewDevice: true,
    sessionTimeout: "30"
};

function loadInitialSecuritySettings() {
    if (typeof window === "undefined") {
        return defaultSecuritySettings;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaultSecuritySettings;
        }

        const parsed = JSON.parse(raw);
        const timeout = String(parsed.sessionTimeout || "30");

        return {
            signOutAfterPasswordReset: Boolean(parsed.signOutAfterPasswordReset),
            notifyOnNewDevice: Boolean(parsed.notifyOnNewDevice),
            sessionTimeout: timeout === "15" || timeout === "30" || timeout === "60" ? timeout : "30"
        };
    } catch {
        return defaultSecuritySettings;
    }
}

export default function CarereceiverSettingsSecurity() {
    const [settings, setSettings] = useState(defaultSecuritySettings);
    const [savedAt, setSavedAt] = useState("");

    useEffect(() => {
        setSettings(loadInitialSecuritySettings());
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

    function handleSessionTimeoutChange(event) {
        const timeout = String(event.target.value || "30");
        setSettings((current) => ({ ...current, sessionTimeout: timeout }));
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
                    <strong>Security</strong>
                </nav>

                <header className="cr-header">
                    <h1>Security Settings</h1>
                    <p>Strengthen account safety and session controls.</p>
                </header>

                <section className="cr-alert">
                    <p>
                        If you think your account has been accessed by someone else, reset your password immediately.
                    </p>
                </section>

                <form className="cr-card" onSubmit={handleSave}>
                    <div className="cr-list">
                        <label className="cr-row" htmlFor="signOutAfterPasswordReset">
                            <div>
                                <p className="cr-row-title">Sign out all devices after password reset</p>
                                <p className="cr-row-sub">Ends active sessions after changing your password.</p>
                            </div>
                            <input
                                checked={settings.signOutAfterPasswordReset}
                                id="signOutAfterPasswordReset"
                                onChange={setToggle("signOutAfterPasswordReset")}
                                type="checkbox"
                            />
                        </label>

                        <label className="cr-row" htmlFor="notifyOnNewDevice">
                            <div>
                                <p className="cr-row-title">Email alert on new device login</p>
                                <p className="cr-row-sub">Get notified when a new browser or device signs in.</p>
                            </div>
                            <input
                                checked={settings.notifyOnNewDevice}
                                id="notifyOnNewDevice"
                                onChange={setToggle("notifyOnNewDevice")}
                                type="checkbox"
                            />
                        </label>
                    </div>

                    <div style={{ marginTop: "14px" }}>
                        <label className="cr-row-title" htmlFor="sessionTimeout">
                            Session timeout
                        </label>
                        <p className="cr-row-sub" style={{ marginBottom: "8px" }}>
                            Automatically sign out after inactivity.
                        </p>
                        <select
                            className="cr-select"
                            id="sessionTimeout"
                            onChange={handleSessionTimeoutChange}
                            value={settings.sessionTimeout}
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>

                    <div className="cr-inline" style={{ marginTop: "14px" }}>
                        <button className="cr-button cr-button--primary" type="submit">
                            Save Security Settings
                        </button>
                        <Link className="cr-button cr-button--secondary" to="/forgot-password">
                            Reset Password
                        </Link>
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
