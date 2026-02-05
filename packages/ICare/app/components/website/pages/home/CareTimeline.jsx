import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faComments,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ICare — How it works (3 steps)
 * - fade-in całych boxów po scrollu
 * - wolniejsza animacja
 * - sekwencja 1 → 2 → 3
 */
export default function HowItWorksThreeSteps() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll(".hiwCard");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card) => card.classList.add("is-visible"));
                    observer.disconnect(); // animacja tylko raz
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const COLORS = {
        bg: "#ffffff",
        text: "#0F172A",
        muted: "rgba(15,23,42,0.72)",
        border: "rgba(15,23,42,0.30)",
        accent: "rgb(221, 139, 79)",
        accent2: "rgb(119, 141, 67)",
    };

    const wrap = {
        width: "100%",
        background: "#f2f2f2",
        fontFamily:
            "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: COLORS.text,
        padding: "clamp(3.2rem, 4.6vw, 4.2rem) 0",
    };

    const container = {
        width: "min(92vw, 1100px)",
        margin: "0 auto",
    };

    const header = {
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
    };

    const title = {
        margin: 0,
        fontSize: "2.4rem",
        letterSpacing: "-0.6px",
        lineHeight: 1.14,
        fontWeight: 600,
    };

    const sub = {
        margin: "0.9rem auto 0",
        maxWidth: "72ch",
        fontSize: "1.3rem",
        lineHeight: 1.66,
    };

    const grid = {
        marginTop: "clamp(1.8rem, 3vw, 2.4rem)",
        display: "grid",
        gap: "clamp(14px, 2vw, 22px)",
        justifyItems: "start",
    };

    const card = {
        borderRadius: 18,
        padding: "1.5rem 1.3rem",
        background: "rgba(255,255,255,0.86)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
    };

    const hiwCardTop = {
        display: "flex",
        gap: "15px",
        alignItems: "center",
    };

    const stepNumber = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background: "#ffa967",
        fontSize: "1.3rem",
        fontWeight: 500,
        borderRadius: "100%",
        height: "40px",
        width: "40px",
        flexShrink: 0,
    };

    const h3 = {
        margin: 0,
        fontWeight: 600,
        fontSize: "1.2rem",
        lineHeight: 1.25,
    };

    const p = {
        margin: 0,
        lineHeight: 1.65,
        fontSize: "1.1rem",
    };

    const ctaWrap = {
        marginTop: "clamp(3rem, 4.2vw, 3.8rem)",
        display: "grid",
        justifyItems: "center",
        gap: 14,
        textAlign: "center",
    };

    const ctaText = {
        margin: 0,
        fontWeight: 400,
        lineHeight: 1.6,
        fontSize: "1.4rem",
        maxWidth: "80ch",
    };

    const btn = {
        borderRadius: 36,
        color: "white",
        border: "3px solid rgb(221,139,79)",
        backgroundColor: "rgb(221,139,79)",
        fontWeight: 400,
        fontSize: "1.1rem",
        padding: "10px 12px",
        cursor: "pointer",
        width: "min(240px, 88vw)",
        transition: "filter .14s ease",
        marginTop: "1rem",
    };

    const steps = [
        {
            n: "1",
            t: "Browse and compare carers",
            d: "See clear profiles, availability and support — so you can shortlist with confidence.",
        },
        {
            n: "2",
            t: "Message and agree the details",
            d: "Talk directly and confirm tasks, hours, start date and expectations — in one place.",
        },
        {
            n: "3",
            t: "Start care with clarity",
            d: "Begin support knowing what’s agreed. No agency pressure — just a clear arrangement.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How ICare works"
            style={wrap}
            ref={sectionRef}
        >
            <div style={container}>
                <div style={header}>
                    <h2 style={title}>What makes ICare different from agencies</h2>
                    <p style={sub}>
                        A calmer path through a big decision with clear steps and no pressure.
                    </p>
                </div>

                <div className="hiwGrid" style={grid}>
                    {steps.map((x) => (
                        <div key={x.t} className="hiwCard" style={card}>
                            <div style={hiwCardTop}>
                                <span style={stepNumber}>{x.n}</span>
                                <h3 style={h3}>{x.t}</h3>
                            </div>
                            <p style={p}>{x.d}</p>
                        </div>
                    ))}
                </div>

                <div style={ctaWrap}>
                    <p style={ctaText}>
                        Want early access in your area?
                        <br />
                        Join the waiting list — we’ll notify you when ICare opens near you.
                    </p>

                    <a href="#waitlist" style={{ textDecoration: "none" }}>
                        <button style={btn}>Join the waiting list</button>
                    </a>
                </div>
            </div>

            <style>{`
        /* layout */
        .hiwGrid{ grid-template-columns: repeat(3, 1fr); }

        @media (max-width: 980px){
          .hiwGrid{ grid-template-columns: repeat(2, 1fr); }
          .hiwCard:last-child{ grid-column: 1 / -1; }
        }

        @media (max-width: 640px){
          .hiwGrid{ grid-template-columns: 1fr; }
          .hiwCard:last-child{ grid-column: auto; }
        }

        /* animation */
        .hiwCard{
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 1.1s ease,
            transform 1.1s cubic-bezier(.22,.61,.36,1);
          will-change: opacity, transform;
        }

        .hiwCard.is-visible{
          opacity: 1;
          transform: translateY(0);
        }

        .hiwCard:nth-child(1).is-visible{ transition-delay: 0ms; }
        .hiwCard:nth-child(2).is-visible{ transition-delay: 200ms; }
        .hiwCard:nth-child(3).is-visible{ transition-delay: 400ms; }

        @media (prefers-reduced-motion: reduce){
          .hiwCard{
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
        </section>
    );
}
