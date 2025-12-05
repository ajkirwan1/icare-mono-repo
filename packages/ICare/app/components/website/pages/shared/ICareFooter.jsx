import React from "react";
import { Link } from "react-router";

export default function ReceiversFooter() {
    return (
        <footer
            style={{
                borderTop: "1px solid #e2e8f0",
                padding: "2.5rem 2rem",
                fontSize: ".85rem",
                color: "#64748b",
                background: "#FFFFFF",
                marginTop: 0,
            }}
        >
            {/* FOOTER NAV */}
            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    gap: ".75rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <li>
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "#0F172A",
                            fontWeight: 800,
                        }}
                    >
                        Home
                    </Link>
                </li>

                <li>
                    <Link
                        to="/how-it-works"
                        style={{
                            textDecoration: "none",
                            color: "#0F172A",
                            fontWeight: 800,
                        }}
                    >
                        How it Works
                    </Link>
                </li>

                <li>
                    <Link
                        to="/icare-for-caregivers"
                        style={{
                            textDecoration: "none",
                            color: "#0F172A",
                            fontWeight: 800,
                        }}
                    >
                        Caregivers
                    </Link>
                </li>

                <li>
                    <Link
                        to="/icare-for-carereceivers"
                        style={{
                            textDecoration: "none",
                            color: "#0F172A",
                            fontWeight: 800,
                        }}
                    >
                        Care Receivers
                    </Link>
                </li>

                <li>
                    <Link
                        to="/privacy"
                        style={{
                            textDecoration: "none",
                            color: "#0F172A",
                            fontWeight: 800,
                        }}
                    >
                        Privacy
                    </Link>
                </li>
            </ul>

            {/* COPYRIGHT */}
            <div style={{ marginTop: ".75rem", textAlign: "center" }}>
                © {new Date().getFullYear()} ICare. All rights reserved.
            </div>
        </footer>
    );
}
