import { useState } from "react";
import { IcareSection, IcareCard } from "react-library";
import imgSrc from "/images/care-receiver-profile-image/care-receiver-profile-image.png";
import PillComponent from "../../../components/pill/pill-component.jsx";
import ModalComponent from "../../../components/modals/modal-component.jsx";
import { NavLink } from "react-router";
import DynamicForm from "../../../forms/dynamic-form.jsx";

/* =========================
   META
========================= */
export function meta() {
    return [
        { title: "ICare | Home" },
        { name: "description", content: "ICare – Supporting better care through intuitive tools." },
    ];
}

/* =========================
   DESIGN TOKENS (SPÓJNE)
========================= */
const TOKENS = {
    radiusLg: 18,
    radiusXl: 22,
    gap: 18,
    gapLg: 24,
    text: "#375d4f",
    textMuted: "#4c7865",
    textSubtle: "#7a9289",
    bgCard: "rgba(255,255,255,0.94)",
    bgSoft: "#f4f8f6",
    border: "#dce7e2",
    shadowSm: "0 2px 6px rgba(0,0,0,0.03)",
    shadowMd: "0 8px 22px rgba(0,0,0,0.05)",
    primary: "#4c7865",
    accent: "#22c55e",
};

/* =========================
   UI HELPERS
========================= */
function SectionShell({ title, subtitle, right, children }) {
    return (
        <section aria-label={title} style={styles.section}>
            <header style={styles.sectionHeader}>
                <div>
                    <h2 style={styles.h2}>{title}</h2>
                    {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
                </div>
                {right || null}
            </header>
            <div>{children}</div>
        </section>
    );
}

function PrimaryButton({ children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={styles.btnPrimary}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3d6454")}
            onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.primary)}
        >
            {children}
        </button>
    );
}

function GhostButton({ children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={styles.btnGhost}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#edf3f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.bgSoft)}
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
                modalTitle.includes("Skills") ? "skillsForm" :
                    modalTitle.includes("Languages") ? "languagesForm" :
                        modalTitle.includes("Schedule") ? "scheduleForm" :
                            "personalInfo";


    return (
        <>
            <IcareSection>
                <div style={styles.grid}>
                    {/* LEFT: Profile & Health */}
                    <div style={{ display: "grid", gap: TOKENS.gap }}>
                        {/* PROFILE */}
                        <SectionShell
                            title="My profile"
                            subtitle="Basic details & account status"
                            right={
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    <GhostButton onClick={() => openModal("Edit Personal Information")}>Edit info</GhostButton>
                                    <PrimaryButton onClick={() => openModal("Edit Profile Picture")}>Change photo</PrimaryButton>
                                </div>
                            }
                        >
                            <div style={styles.profileWrap}>
                                <figure style={styles.figure}>
                                    <img src={imgSrc} alt="Profile" style={styles.profileImg} />
                                </figure>
                                <div style={{ flex: 1 }}>
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

                        {/* CONDITIONS */}
                        <SectionShell
                            title="Conditions"
                            subtitle="Provide important context for caregivers"
                            right={<GhostButton onClick={() => openModal("Edit Health Information")}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "12px 10px" }}>
                                        <p style={styles.pMuted}>Jane’s current medical conditions:</p>

                                        <ul style={styles.pills}>
                                            {[
                                                "Parkinson’s disease",
                                                "Hypertension",
                                                "Arthritis",
                                                "Diabetes type II",
                                                "High cholesterol",
                                                "Vision impairment",
                                                "Hearing loss",
                                                "Allergy: Penicillin",
                                                "Mobility aid: Walker",
                                                "Sleep disturbances",
                                            ].map((tag) => (
                                                <li key={tag} style={styles.pillItem}>{tag}</li>
                                            ))}
                                        </ul>

                                        <div style={{ marginTop: 14 }}>
                                            <p style={styles.pText}>
                                                <strong>Notes:</strong> Jane experiences mild tremors and stiffness, particularly in the mornings.
                                                Hypertension managed with medication; follows a diabetic-friendly diet.
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                                            <PrimaryButton onClick={() => openModal("Edit Health Information")}>
                                                Update health info
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>

                        {/* MEDICATIONS */}
                        <SectionShell
                            title="Medications"
                            subtitle="Keep this list up to date"
                            right={<GhostButton onClick={() => openModal("Edit Medications")}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "12px 10px" }}>
                                        <p style={styles.pMuted}>Current prescribed medications:</p>
                                        <ul style={styles.pills}>
                                            {[
                                                "Amantadine",
                                                "L-dopa",
                                                "Metformin",
                                                "Atorvastatin",
                                                "Losartan",
                                                "Vitamin D",
                                            ].map((tag) => (
                                                <li key={tag} style={styles.pillItem}>{tag}</li>
                                            ))}
                                        </ul>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                                            <PrimaryButton onClick={() => openModal("Edit Medications")}>
                                                Update medications
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>
                    </div>

                    {/* RIGHT: ACCOUNT */}
                    <div style={{ display: "grid", gap: TOKENS.gap, alignSelf: "start" }}>
                        <SectionShell
                            title="Account summary"
                            subtitle="Payments & protection"
                            right={
                                <NavLink to="/carerecipient/my-account" style={{ textDecoration: "none" }}>
                                    <GhostButton>Manage</GhostButton>
                                </NavLink>
                            }
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "12px 10px" }}>
                                        <p style={styles.row}><strong>Balance:</strong> £2,300</p>
                                        <p style={styles.row}><strong>Upcoming payment:</strong> £450 on 15 Jul 2024</p>
                                        <p style={styles.row}><strong>Last payment:</strong> £400 on 15 Jun 2024</p>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>
                        <SectionShell
                            title="Caregiver preferences"
                            subtitle="Skills, languages & availability"
                            right={<GhostButton onClick={() => openModal("Edit Caregiver Preferences")}>Edit</GhostButton>}
                        >
                            <IcareCard variant="elevated">
                                <span slot="contents">
                                    <div style={{ padding: "12px 10px" }}>
                                        <p style={styles.pText}>Add preferences to improve your matches.</p>

                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                                            <GhostButton onClick={() => openModal("Add Skills")}>Add skills</GhostButton>
                                            <GhostButton onClick={() => openModal("Add Languages")}>Add languages</GhostButton>
                                            <GhostButton onClick={() => openModal("Set Schedule")}>Set schedule</GhostButton>
                                        </div>
                                    </div>
                                </span>
                            </IcareCard>
                        </SectionShell>

                    </div>
                </div>
            </IcareSection>
            <ModalComponent
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
            >
                <DynamicForm
                    formKey={currentFormKey}
                    onSubmit={(formData) => {
                        console.log("Form submitted:", formData);
                        setModalOpen(false);
                    }}
                />
            </ModalComponent>
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
        padding: 18,
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        borderBottom: `1px solid ${TOKENS.border}`,
        marginBottom: 10,
        paddingBottom: 6,
    },
    h2: {
        margin: 0,
        color: TOKENS.text,
        fontWeight: 800,
        fontSize: "1.1rem",
    },
    subtitle: {
        margin: "4px 0 0",
        color: TOKENS.textSubtle,
        fontSize: "0.9rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(340px, 1fr)",
        gap: TOKENS.gapLg,
    },
    profileWrap: {
        display: "flex",
        alignItems: "center",
        gap: TOKENS.gap,
        flexWrap: "wrap",
    },
    figure: {
        margin: 0,
        width: 170,
        height: 170,
        borderRadius: "50%",
        overflow: "hidden",
        border: `2px solid ${TOKENS.border}`,
        background: "#fff",
        boxShadow: TOKENS.shadowSm,
    },
    profileImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    dl: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 10,
        margin: 0,
        padding: 0,
    },
    dtdd: {
        display: "grid",
        gridTemplateColumns: "100px 1fr",
    },
    dt: { color: TOKENS.textSubtle, fontSize: "0.9rem" },
    dd: { color: TOKENS.text, fontWeight: 700, fontSize: "0.95rem" },
    pMuted: { color: TOKENS.textSubtle, margin: 0, fontSize: "0.9rem" },
    pText: { color: TOKENS.textMuted, fontSize: "0.95rem", lineHeight: 1.6 },
    row: { color: TOKENS.textMuted, margin: "0 0 6px" },
    pills: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 12,
        listStyle: "none",
        padding: 0,
    },
    pillItem: {
        background: "#e9f4f0",
        color: "#375d4f",
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: "0.9rem",
        fontWeight: 600,
        border: "1px solid #cfe3dc",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
    },
    btnPrimary: {
        background: TOKENS.primary,
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: "10px 18px",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    btnGhost: {
        background: TOKENS.bgSoft,
        color: TOKENS.text,
        border: `1px solid ${TOKENS.border}`,
        borderRadius: 999,
        padding: "10px 18px",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
};
