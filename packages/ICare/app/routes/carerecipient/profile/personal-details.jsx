import { useState } from "react";
import { IcareSection, IcareCard } from "react-library";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import PillComponent from "../../../components/pill/pill-component.jsx";
import ModalComponent from "../../../components/modals/modal-component.jsx";
import { NavLink } from "react-router";
import DynamicForm from "../../../forms/dyanamic-form.jsx";

/* =========================
   META
========================= */
export function meta() {
    return [
        { title: "ICare | Home" },
        { name: "description", content: "ICare – Supporting better care through intuitive tools." }
    ];
}

/* =========================
   DESIGN TOKENS (inline)
========================= */
const TOKENS = {
    radiusLg: 16,
    radiusXl: 20,
    gap: 16,
    gapLg: 20,
    text: "#374151",               // ~slate-700
    textMuted: "#4B5563",          // slate-600
    textSubtle: "#6B7280",         // slate-500
    bgCard: "#FFFFFF",
    bgSoft: "#F8FAFC",
    border: "rgba(15,23,42,.10)",
    shadowSm: "0 1px 0 rgba(2,8,23,.03)",
    shadowMd: "0 8px 22px rgba(2,8,23,.06)",
    shadowLg: "0 12px 28px rgba(2,8,23,.08)",
    primary: "#16A34A",            // green-600
    primaryHover: "#15803D",       // green-700
    primaryActive: "#166534",      // green-800
    accent: "#0EA5E9",             // sky-500
};

/* =========================
   UI Helpers
========================= */
function SectionShell({ title, subtitle, right, children, ariaLabel }) {
    return (
        <section aria-label={ariaLabel ?? title} style={styles.section}>
            <header style={styles.sectionHeader}>
                <div>
                    <h2 style={styles.h2}>{title}</h2>
                    {subtitle ? <p style={styles.subtitle}>{subtitle}</p> : null}
                </div>
                {right || null}
            </header>
            <div style={{ paddingTop: 4 }}>{children}</div>
        </section>
    );
}

function PrimaryButton({ children, onClick, ariaLabel }) {
    return (
        <button
            type="button"
            aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
            onClick={onClick}
            style={styles.btnPrimary}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "saturate(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "saturate(1)")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = `${TOKENS.shadowSm}, 0 0 0 3px rgba(22,163,74,.25)`)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = TOKENS.shadowSm)}
        >
            {children}
        </button>
    );
}

function GhostButton({ children, onClick, ariaLabel }) {
    return (
        <button
            type="button"
            aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
            onClick={onClick}
            style={styles.btnGhost}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F1F5F9";
                e.currentTarget.style.borderColor = "rgba(15,23,42,.18)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = TOKENS.bgSoft;
                e.currentTarget.style.borderColor = TOKENS.border;
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            onFocus={(e) => (e.currentTarget.style.boxShadow = `${TOKENS.shadowSm}, 0 0 0 3px rgba(2,132,199,.25)`)}
            onBlur={(e) => (e.currentTarget.style.boxShadow = TOKENS.shadowSm)}
        >
            {children}
        </button>
    );
}

/* =========================
   PAGE
========================= */
export default function CaregiverRecipientHome() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const openModal = (title) => {
        setModalTitle(title);
        setModalOpen(true);
    };

    const currentFormKey =
        modalTitle.includes("Health") ? "healthInfo" :
            modalTitle.includes("Personal") ? "personalInfo" :
                "personalInfo";

    return (
        <>
            {/* === MAIN WRAP === */}
            <IcareSection>
                <div style={styles.grid}>
                    {/* LEFT: Profile & Health */}
                    <div style={{ display: "grid", gap: TOKENS.gap }}>
                        {/* Profile header card */}
                        <SectionShell
                            title="My profile"
                            subtitle="Basic details & account status"
                            ariaLabel="My profile"
                            right={
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    <GhostButton onClick={() => openModal("Edit Personal Information")}>Edit info</GhostButton>
                                    <PrimaryButton onClick={() => openModal("Edit Profile Picture")}>Change photo</PrimaryButton>
                                </div>
                            }
                        >
                            <div style={styles.profileWrap}>
                                <figure style={styles.figure}>
                                    <img
                                        src={imgSrc}
                                        alt="Care Receiver Portrait"
                                        style={styles.profileImg}
                                    />
                                </figure>
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <dl style={styles.dl}>
                                        <div style={styles.dtdd}>
                                            <dt style={styles.dt}>Name</dt>
                                            <dd style={styles.dd}>Jane Doe</dd>
                                        </div>
                                        <div style={styles.dtdd}>
                                            <dt style={styles.dt}>Age</dt>
                                            <dd style={styles.dd}>68</dd>
                                        </div>
                                        <div style={styles.dtdd}>
                                            <dt style={styles.dt}>Location</dt>
                                            <dd style={styles.dd}>Springfield, IL</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </SectionShell>

                        {/* Health conditions */}
                        <SectionShell
                            title="Conditions"
                            subtitle="Provide important context for caregivers"
                            ariaLabel="Health conditions"
                            right={<GhostButton onClick={() => openModal("Edit Health Information")}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "8px 6px" }}>
                                        <p style={styles.pMuted}>Please list your conditions</p>

                                        <ul role="list" aria-label="Conditions list" style={styles.pills}>
                                            {[
                                                "Parkinsons",
                                                "Hypertension",
                                                "Arthritis",
                                                "Diabetes",
                                                "High cholesterol",
                                                "Vision impairment",
                                                "Hearing loss",
                                                "Medication: L-dopa",
                                                "Allergy: Penicillin",
                                                "Mobility aid: Walker",
                                                "Falls risk",
                                                "Sleep disturbances",
                                            ].map((tag) => (
                                                <li key={tag}><PillComponent>{tag}</PillComponent></li>
                                            ))}
                                        </ul>

                                        <div style={{ marginTop: 10 }}>
                                            <p style={styles.pText}>
                                                <strong>Additional notes:</strong>{" "}
                                                Jane experiences occasional tremors and stiffness, particularly in the mornings.
                                                Hypertension managed with medication; follows a diabetic-friendly diet.
                                                Uses glasses and a mild hearing aid.
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                                            <PrimaryButton onClick={() => openModal("Edit Health Information")}>
                                                Update health info
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>

                        {/* Medications */}
                        <SectionShell
                            title="Medications"
                            subtitle="Keep this up to date"
                            ariaLabel="Medications"
                            right={<GhostButton onClick={() => openModal("Edit Health Information")}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "8px 6px" }}>
                                        <p style={styles.pMuted}>Please list your medications</p>

                                        <ul role="list" aria-label="Medications list" style={styles.pills}>
                                            {[
                                                "Amantadine",
                                                "L-dopa",
                                                "Metformin",
                                                "Atorvastatin",
                                                "Losartan",
                                                "Vitamin D",
                                            ].map((tag) => (
                                                <li key={tag}><PillComponent>{tag}</PillComponent></li>
                                            ))}
                                        </ul>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                                            <PrimaryButton onClick={() => openModal("Edit Health Information")}>
                                                Update medications
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>
                    </div>

                    {/* RIGHT: Account & Preferences */}
                    <div style={{ display: "grid", gap: TOKENS.gap, alignSelf: "start" }}>
                        <SectionShell
                            title="Account summary"
                            subtitle="Payments & protection"
                            ariaLabel="Account summary"
                            right={
                                <NavLink to="/carerecipient/my-account" aria-label="Open account settings" style={{ textDecoration: "none" }}>
                                    <GhostButton>Manage</GhostButton>
                                </NavLink>
                            }
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "8px 6px" }}>
                                        <p style={styles.row}><strong>Balance (protected):</strong> £2,300</p>
                                        <p style={styles.row}><strong>Upcoming payment:</strong> £450 on 15 Jul 2024</p>
                                        <p style={styles.row}><strong>Last payment:</strong> £400 on 15 Jun 2024</p>

                                        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                                            <PrimaryButton onClick={() => { }}>Add funds</PrimaryButton>
                                            <GhostButton onClick={() => { }}>View history</GhostButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>

                        <SectionShell
                            title="Caregiver preferences"
                            subtitle="Skills, languages & availability"
                            ariaLabel="Caregiver preferences"
                            right={<GhostButton onClick={() => { }}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "8px 6px" }}>
                                        <p style={styles.pText}>Add preferences to improve your matches.</p>
                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                            <GhostButton onClick={() => { }}>Add skills</GhostButton>
                                            <GhostButton onClick={() => { }}>Add languages</GhostButton>
                                            <GhostButton onClick={() => { }}>Set schedule</GhostButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>
                    </div>
                </div>
            </IcareSection>

            {/* OPTIONAL: Additional summary row */}
            <IcareSection>
                <div style={{ display: "grid", gap: TOKENS.gap, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
                    <IcareCard variant="elevated">
                        <span slot="contents">
                            <div style={{ padding: 12 }}>
                                <h3 style={styles.h3}>Security & privacy</h3>
                                <p style={styles.pText}>
                                    Your data is encrypted. Only verified caregivers can see contact details after mutual agreement.
                                </p>
                            </div>
                        </span>
                    </IcareCard>
                    <IcareCard variant="elevated">
                        <span slot="contents">
                            <div style={{ padding: 12 }}>
                                <h3 style={styles.h3}>Tips</h3>
                                <p style={styles.pText}>
                                    Keep health info current and add languages to match with the best caregivers faster.
                                </p>
                            </div>
                        </span>
                    </IcareCard>
                </div>
            </IcareSection>

            {/* Modal */}
            <ModalComponent isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
                <DynamicForm
                    formKey={currentFormKey}
                    onSubmit={(formData) => {
                        console.log("Form submitted:", formData);
                        setModalOpen(false);
                    }}
                />
            </ModalComponent>

            {/* Inline styles for focus-visible on Safari */}
            <style>{`
        *:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(14,165,233,.35) !important; border-radius: ${TOKENS.radiusLg}px; }
        @media (max-width: 1024px) {
          /* Stack columns on tablets */
          .pageGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </>
    );
}

/* =========================
   STYLES
========================= */
const styles = {
    section: {
        background: TOKENS.bgCard,
        border: `1px solid ${TOKENS.border}`,
        borderRadius: TOKENS.radiusXl,
        boxShadow: TOKENS.shadowMd,
        padding: 14,
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "6px 4px 10px",
        marginBottom: 6,
        borderBottom: `1px solid ${TOKENS.border}`,
    },
    h2: {
        margin: 0,
        color: TOKENS.text,
        fontWeight: 900,
        fontSize: "1.1rem",
        letterSpacing: ".2px",
    },
    h3: {
        margin: "0 0 6px",
        color: TOKENS.text,
        fontWeight: 800,
        fontSize: "1rem",
        letterSpacing: ".2px",
    },
    subtitle: {
        margin: "4px 0 0",
        color: TOKENS.textSubtle,
        fontSize: 13.5,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
        gap: TOKENS.gapLg,
        alignItems: "start",
    },
    profileWrap: {
        display: "flex",
        gap: TOKENS.gap,
        alignItems: "center",
        flexWrap: "wrap",
    },
    figure: {
        margin: 0,
        width: 160,
        height: 160,
        borderRadius: TOKENS.radiusXl,
        overflow: "hidden",
        border: `1px solid ${TOKENS.border}`,
        boxShadow: TOKENS.shadowSm,
        background: TOKENS.bgSoft,
        flexShrink: 0,
    },
    profileImg: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "50% 35%",
    },
    dl: {
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 10,
    },
    dtdd: {
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        alignItems: "center",
        gap: 8,
    },
    dt: {
        margin: 0,
        color: TOKENS.textSubtle,
        fontSize: 13.5,
        fontWeight: 600,
    },
    dd: {
        margin: 0,
        color: TOKENS.text,
        fontSize: 14.5,
        fontWeight: 700,
        letterSpacing: ".02em",
    },
    pMuted: {
        margin: 0,
        color: TOKENS.textSubtle,
        fontSize: 14,
        lineHeight: 1.6,
    },
    pText: {
        margin: 0,
        color: TOKENS.textMuted,
        fontSize: 14.5,
        lineHeight: 1.65,
    },
    row: {
        margin: "0 0 6px",
        color: TOKENS.textMuted,
        fontSize: 14.5,
    },
    pills: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        listStyle: "none",
        padding: 0,
        margin: "10px 0 0",
    },
    btnPrimary: {
        appearance: "none",
        border: "1px solid transparent",
        background: TOKENS.primary,
        color: "#fff",
        padding: "10px 14px",
        borderRadius: 999,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: ".02em",
        cursor: "pointer",
        boxShadow: TOKENS.shadowSm,
        transition: "transform .12s ease, box-shadow .15s ease, background .15s ease, filter .15s ease",
    },
    btnGhost: {
        appearance: "none",
        border: `1px solid ${TOKENS.border}`,
        background: TOKENS.bgSoft,
        color: TOKENS.text,
        padding: "10px 14px",
        borderRadius: 999,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: ".02em",
        cursor: "pointer",
        boxShadow: TOKENS.shadowSm,
        transition: "transform .12s ease, box-shadow .15s ease, background .15s ease, border-color .15s ease",
    },
};
