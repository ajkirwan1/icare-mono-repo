import { Outlet, NavLink } from "react-router";

export default function MyProfileLayout() {
    const styles = {
        layout: {
            fontFamily: "Nunito, sans-serif",
            color: "#375d4f",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e0ece7",
            borderRadius: "22px",
            boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
            backdropFilter: "blur(8px)",
            padding: "2.2rem 2.6rem",
            marginTop: "1rem",
            transition: "all 0.3s ease",
        },
        header: {
            fontSize: "1.6rem",
            fontWeight: 800,
            margin: "0 0 1.5rem 0",
            color: "#375d4f",
            letterSpacing: "0.4px",
        },
        nav: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #e0ece7",
            paddingBottom: "1rem",
        },
        link: {
            textDecoration: "none",
            color: "#4c7865",
            fontWeight: 600,
            fontSize: "0.95rem",
            background: "#e9f4f0",
            border: "1px solid #cfe3dc",
            borderRadius: "14px",
            padding: "0.55rem 1.1rem",
            transition: "all 0.25s ease",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
        },
        active: {
            background: "#4c7865",
            color: "#ffffff",
            border: "1px solid #3b6255",
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        },
        content: {
            marginTop: "1.4rem",
            color: "#334d41",
            fontSize: "1rem",
            lineHeight: 1.6,
        },
    };

    return (
        <div style={styles.layout}>
            <h1 style={styles.header}>My Account</h1>

            <nav style={styles.nav}>
                {[
                    { to: "/carerecipient/profile/personal-details", label: "My Profile" },
                    { to: "/carerecipient/profile/medical-information", label: "Medical Information" },
                    { to: "/carerecipient/profile/security-settings", label: "Security Settings" },
                    { to: "/carerecipient/profile/notification-settings", label: "Notification Preferences" },
                ].map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        style={(navData) => {
                            const isActive = navData.isActive;
                            return {
                                ...styles.link,
                                ...(isActive ? styles.active : {}),
                            };
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = hoverColor(e.currentTarget);
                        }}
                        onMouseLeave={(e) => {
                            resetColor(e.currentTarget);
                        }}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div style={styles.content}>
                <Outlet />
            </div>
        </div>
    );

    // Hover helpers for consistency
    function hoverColor(el) {
        return el.style.color === "rgb(255, 255, 255)" ? "#3b6255" : "#d6ebe4";
    }

    function resetColor(el) {
        if (el.style.color === "rgb(255, 255, 255)") {
            el.style.backgroundColor = "#4c7865";
        } else {
            el.style.backgroundColor = "#e9f4f0";
        }
    }
}
