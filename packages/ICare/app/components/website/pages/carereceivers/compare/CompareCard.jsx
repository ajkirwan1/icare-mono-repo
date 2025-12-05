import React from "react";

export default function CompareCard({
    title,
    icon,
    iconBg,
    iconColor,
    borderColor,
    background,
    shadow,
    items,
}) {
    return (
        <article
            style={{
                borderRadius: 22,
                padding: "32px 28px",
                background,
                border: `1px solid ${borderColor}`,
                boxShadow: shadow,
            }}
        >
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 18,
                }}
            >
                <span
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: iconBg,
                        border: `1px solid ${borderColor}`,
                        display: "grid",
                        placeItems: "center",
                        color: iconColor,
                        fontWeight: 900,
                        fontSize: icon === "dash" ? 22 : 16,
                    }}
                >
                    {icon === "check" ? "✓" : "—"}
                </span>

                <strong
                    style={{
                        color: "#0F172A",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        letterSpacing: "-0.2px",
                    }}
                >
                    {title}
                </strong>
            </header>

            <ul
                style={{
                    paddingLeft: "1.1rem",
                    margin: 0,
                    lineHeight: 1.7,
                    color: "#374151",
                    fontWeight: 500,
                    fontSize: "1rem",
                }}
            >
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </article>
    );
}
