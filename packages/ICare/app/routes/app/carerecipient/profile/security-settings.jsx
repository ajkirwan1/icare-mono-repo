import { useState } from "react";
import { IcareSection } from "react-library";

export function meta() {
    return [
        { title: "ICare | Security Settings" },
        { name: "description", content: "Manage your ICare account safety, privacy, and data preferences." },
    ];
}

export default function SecuritySettings() {
    const [privacy, setPrivacy] = useState({
        showName: true,
        allowHealth: false,
        sharePhoto: true,
    });
    const [alerts, setAlerts] = useState({
        newLogin: true,
        failedLogin: false,
        dataDownload: true,
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleToggle = (obj, setObj, key) =>
        setObj((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleSave = () => alert("✅ Your preferences have been saved.");
    const handleDelete = () => {
        alert("Your account has been permanently deleted.");
        setShowDeleteModal(false);
    };

    return (
        <>
            <IcareSection>
                <div style={styles.wrapper}>
                    {/* === HEADER === */}
                    <h1 style={styles.title}>Security Settings</h1>
                    <p style={styles.subtitle}>
                        Manage your password, privacy preferences, and account data.
                    </p>

                    {/* === 1️⃣ ACCOUNT SECURITY === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Account Security</h2>
                        <p style={styles.text}>
                            Protect your account with strong authentication options.
                        </p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.btnPrimary}>Change password</button>
                            <button style={styles.btnGhost}>Enable two-factor authentication</button>
                            <button style={styles.btnGhost}>View active sessions</button>
                        </div>
                    </section>

                    {/* === 2️⃣ LOGIN & VERIFICATION === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Login & Verification</h2>
                        <p style={styles.text}>Manage your login methods and connected devices.</p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.btnGhost}>Change email</button>
                            <button style={styles.btnGhost}>View active devices</button>
                            <button style={styles.btnPrimary}>Log out from all devices</button>
                        </div>
                    </section>

                    {/* === 3️⃣ PRIVACY & DATA === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Privacy & Data</h2>
                        <p style={styles.text}>
                            Control what information caregivers can see.
                        </p>
                        <ul style={styles.list}>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={privacy.showName}
                                        onChange={() => handleToggle(privacy, setPrivacy, "showName")}
                                        style={styles.checkbox}
                                    />
                                    Show my first name to caregivers
                                </label>
                            </li>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={privacy.allowHealth}
                                        onChange={() => handleToggle(privacy, setPrivacy, "allowHealth")}
                                        style={styles.checkbox}
                                    />
                                    Allow caregivers to view health information
                                </label>
                            </li>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={privacy.sharePhoto}
                                        onChange={() => handleToggle(privacy, setPrivacy, "sharePhoto")}
                                        style={styles.checkbox}
                                    />
                                    Share my profile photo only with verified users
                                </label>
                            </li>
                        </ul>
                        <div style={{ marginTop: "1rem" }}>
                            <button style={styles.btnPrimary} onClick={handleSave}>
                                Save changes
                            </button>
                        </div>
                    </section>

                    {/* === 4️⃣ SECURITY ALERTS === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Security Alerts</h2>
                        <p style={styles.text}>Choose when to receive security notifications.</p>
                        <ul style={styles.list}>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={alerts.newLogin}
                                        onChange={() => handleToggle(alerts, setAlerts, "newLogin")}
                                        style={styles.checkbox}
                                    />
                                    Notify me on new login
                                </label>
                            </li>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={alerts.failedLogin}
                                        onChange={() => handleToggle(alerts, setAlerts, "failedLogin")}
                                        style={styles.checkbox}
                                    />
                                    Failed login attempt alerts
                                </label>
                            </li>
                            <li>
                                <label style={styles.label}>
                                    <input
                                        type="checkbox"
                                        checked={alerts.dataDownload}
                                        onChange={() => handleToggle(alerts, setAlerts, "dataDownload")}
                                        style={styles.checkbox}
                                    />
                                    Notify me when my data is downloaded
                                </label>
                            </li>
                        </ul>
                        <div style={{ marginTop: "1rem" }}>
                            <button style={styles.btnPrimary} onClick={handleSave}>
                                Save alert preferences
                            </button>
                        </div>
                    </section>

                    {/* === 5️⃣ TRUSTED CONTACTS === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Trusted Contacts</h2>
                        <p style={styles.text}>
                            Add a family member or caregiver who can assist if you lose access to your account.
                        </p>
                        <button style={styles.btnGhost}>Add trusted contact</button>
                    </section>

                    {/* === 6️⃣ DATA CONTROL === */}
                    <section style={styles.section}>
                        <h2 style={styles.h2}>Data Control</h2>
                        <p style={styles.text}>
                            Download or permanently delete your ICare account data.
                        </p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.btnGhost}>Download my data</button>
                            <button
                                style={{ ...styles.btnPrimary, background: "#b91c1c" }}
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete my account
                            </button>
                        </div>
                        <p style={styles.metaText}>Last security review: 9 Nov 2025</p>
                    </section>
                </div>
            </IcareSection>

            {/* === MODAL CONFIRM DELETE === */}
            {showDeleteModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalBox}>
                        <h3 style={styles.modalTitle}>Confirm Account Deletion</h3>
                        <p style={styles.modalText}>
                            Are you sure you want to delete your ICare account? This action cannot be undone.
                        </p>
                        <div style={styles.modalButtons}>
                            <button style={styles.btnGhost} onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button
                                style={{ ...styles.btnPrimary, background: "#b91c1c" }}
                                onClick={handleDelete}
                            >
                                Delete permanently
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* =========================
   INLINE STYLES (ICare look)
========================= */
const styles = {
    wrapper: {
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #dce7e2",
        borderRadius: 22,
        padding: "30px 34px",
        boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
        color: "#375d4f",
        fontFamily: "Nunito, sans-serif",
        maxWidth: 840,
        margin: "0 auto",
    },
    title: {
        fontSize: "1.6rem",
        fontWeight: 900,
        marginBottom: "0.4rem",
        color: "#375d4f",
    },
    subtitle: {
        color: "#4c7865",
        fontSize: "1rem",
        marginBottom: "2rem",
    },
    section: {
        borderTop: "1px solid #dce7e2",
        paddingTop: "1.3rem",
        marginTop: "1.8rem",
    },
    h2: {
        fontSize: "1.1rem",
        fontWeight: 800,
        marginBottom: "0.4rem",
        color: "#375d4f",
    },
    text: {
        fontSize: "0.95rem",
        color: "#4c7865",
        marginBottom: "1rem",
        lineHeight: 1.6,
    },
    metaText: {
        fontSize: "0.8rem",
        color: "#7a9289",
        marginTop: "1rem",
        textAlign: "right",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
    },
    label: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: "0.95rem",
        color: "#375d4f",
        cursor: "pointer",
    },
    checkbox: {
        width: 18,
        height: 18,
        accentColor: "#4c7865",
        cursor: "pointer",
    },
    buttonGroup: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.8rem",
        marginTop: "0.8rem",
    },
    btnPrimary: {
        background: "#4c7865",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: "10px 18px",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    btnGhost: {
        background: "#f4f8f6",
        color: "#375d4f",
        border: "1px solid #dce7e2",
        borderRadius: 999,
        padding: "10px 18px",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    /* === MODAL === */
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    },
    modalBox: {
        background: "#fff",
        borderRadius: 18,
        padding: "24px 28px",
        maxWidth: 420,
        width: "90%",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    },
    modalTitle: {
        fontSize: "1.2rem",
        fontWeight: 800,
        color: "#375d4f",
        marginBottom: "0.6rem",
    },
    modalText: {
        color: "#4c7865",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        marginBottom: "1.4rem",
    },
    modalButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.8rem",
    },
};
