import React from "react";

const BRAND = "#1FAB1F";

export default function PrivacyTOC() {
    return (
        <section
            style={{
                margin: "2.75rem auto 1rem",
                maxWidth: 1100,
                padding: "0 clamp(16px,4vw,32px)",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <nav
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px 14px",
                }}
            >
                {[
                    { href: "#data-we-collect", label: "1. Data we collect" },
                    { href: "#how-we-use", label: "2. How we use data" },
                    { href: "#legal-basis", label: "3. Legal basis (GDPR)" },
                    { href: "#sharing", label: "4. Sharing" },
                    { href: "#retention", label: "5. Storage & retention" },
                    { href: "#rights", label: "6. Your rights" },
                    { href: "#cookies", label: "7. Cookies" },
                    { href: "#security", label: "8. Security" },
                    { href: "#transfers", label: "9. International transfers" },
                    { href: "#contact-dpo", label: "10. Contact" },
                ].map((i) => (
                    <a
                        key={i.href}
                        href={i.href}
                        style={{
                            color: "#0F172A",
                            textDecoration: "none",
                            fontWeight: 800,
                            border: "1px solid rgba(15,23,42,.12)",
                            background: "#FFFFFF",
                            padding: ".6rem .85rem",
                            borderRadius: 999,
                            transition:
                                "transform .15s ease, border-color .15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.borderColor = BRAND;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor =
                                "rgba(15,23,42,.12)";
                        }}
                    >
                        {i.label}
                    </a>
                ))}
            </nav>
        </section>
    );
}

