import React from "react";
import { Link } from "react-router";

export default function ReceiversStepsCTA() {
    return (
        <div
            className="sr"
            style={{
                opacity: 0,
                transform: "translateY(25px)",
                transition: "all .9s .45s cubic-bezier(0.25,0.1,0.25,1)",
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
            }}
        >
            <Link
                to="/register"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 40px",
                    borderRadius: 999,
                    background: "rgba(18, 96, 18, 0.784)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textDecoration: "none",
                    letterSpacing: ".3px",
                    boxShadow: "0 10px 26px rgba(166,122,99,0.22)",
                    transition: "all .25s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                        "0 14px 34px rgba(166,122,99,0.26)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        "0 10px 26px rgba(166,122,99,0.22)";
                }}
            >
                Continue
            </Link>
        </div>
    );
}
