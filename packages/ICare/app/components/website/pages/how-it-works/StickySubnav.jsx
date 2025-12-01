import React from "react";

export default function StickySubnav() {
    const BRAND = "#1FAB1F";

    const linkStyle = {
        textDecoration: "none",
        color: "#0F172A",
        fontWeight: 800,
        letterSpacing: ".02em",
        fontSize: "clamp(.9rem, 1.2vw, 1rem)",
        padding: ".55rem .9rem",
        borderRadius: 999,
        border: "1px solid rgba(31,171,31,.25)",
        background: "rgba(31,171,31,.08)",
        transition: "background .2s ease, transform .15s ease, border-color .2s ease",
    };

    const links = [
        // Fill these with your actual anchors
        // { href: "#steps", label: "Steps" },
        // { href: "#compare", label: "Agency vs ICare" },
        // { href: "#estimator", label: "Estimator" },
        // { href: "#contact", label: "Contact" },
    ];

    return (
        <nav
            aria-label="Page quick nav"
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "saturate(1.1) blur(6px)",
                borderBottom: "1px solid rgba(15,23,42,.06)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "10px clamp(16px,4vw,32px)",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {links.map((l) => (
                    <a
                        key={l.href}
                        href={l.href}
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(31,171,31,.14)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.borderColor = BRAND;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(31,171,31,.08)";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(31,171,31,.25)";
                        }}
                    >
                        {l.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
