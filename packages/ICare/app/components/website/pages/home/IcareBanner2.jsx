import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandHoldingHeart,
    faBroom,
    faPersonWalking,
    faPills,
    faMoon,
    faClock,
    faBed,
    faBrain,
} from "@fortawesome/free-solid-svg-icons";

export default function IcareBanner2() {
    return (
        <section
            aria-label="ICare Banner"
            style={{
                width: "100%",
                background: "#FFFFFF",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* ===== FULL-WIDTH HEADER ===== */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    position: "relative",
                    overflow: "hidden",
                    padding: "clamp(2.8rem, 4.4vw, 3.8rem) 0"
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "#61674db8",
                        pointerEvents: "none",
                    }}
                />

                <header
                    style={{
                        width: "min(1180px, 92vw)",
                        margin: "0 auto",
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 900,
                            fontSize: "clamp(1.85rem, 2.6vw, 2.35rem)",
                            color: "#fff",
                            letterSpacing: "-0.65px",
                            lineHeight: 1.08,
                        }}
                    >
                        A guided — human way to find trusted care
                    </h2>

                    <p
                        style={{
                            margin: "0.85rem auto 0",
                            maxWidth: "68ch",
                            color: "rgba(255,255,255,0.92)",
                            fontSize: "clamp(1.02rem, 1.25vw, 1.18rem)",
                            lineHeight: 1.75,
                            fontWeight: 450,
                        }}
                    >
                        Bla bla bla
                    </p>
                </header>
            </div>
        </section>
    );
}
