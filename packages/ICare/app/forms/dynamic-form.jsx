import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

/* =========================
   DESIGN TOKENS
========================= */
const TOKENS = {
    radius: 14,
    bgCard: "rgba(255,255,255,0.94)",
    bgSoft: "#f4f8f6",
    border: "#dce7e2",
    text: "#375d4f",
    textMuted: "#4c7865",
    primary: "#4c7865",
    primaryHover: "#3d6454",
    shadowSm: "0 2px 6px rgba(0,0,0,0.04)",
    shadowMd: "0 8px 22px rgba(0,0,0,0.06)"
};

/* =========================
   SCHEMAS
========================= */
const formSchemas = {
    personalInfo: {
        schema: {
            type: "object",
            title: "Personal Information",
            properties: {
                name: { type: "string", title: "Name" },
                age: { type: "number", title: "Age" },
                location: { type: "string", title: "Location" }
            },
            required: ["name", "age", "location"]
        },
        uiSchema: {
            type: "VerticalLayout",
            elements: [
                { type: "Control", scope: "#/properties/name" },
                { type: "Control", scope: "#/properties/age" },
                { type: "Control", scope: "#/properties/location" }
            ]
        }
    },

    /* =========================
       SKILLS FORM — rozszerzony
    ========================== */
    skillsForm: {
        schema: {
            type: "object",
            title: "Caregiving Skills",
            properties: {
                skills: {
                    type: "array",
                    title: "Select your caregiving skills",
                    items: {
                        type: "string",
                        enum: [
                            "Cooking & Meal Prep",
                            "Mobility Support",
                            "Medication Management",
                            "Companionship",
                            "Personal Hygiene",
                            "Housekeeping",
                            "Shopping Assistance",
                            "Physical Therapy Support",
                            "Dressing & Grooming",
                            "Elderly Exercise Guidance"
                        ]
                    },
                    uniqueItems: true
                },
                customSkill: {
                    type: "string",
                    title: "Add your own skill"
                }
            }
        },
        uiSchema: {
            type: "VerticalLayout",
            elements: [
                { type: "Control", scope: "#/properties/skills" },
                { type: "Control", scope: "#/properties/customSkill" }
            ]
        }
    },

    healthInfo: {
        schema: {
            type: "object",
            title: "Health Information",
            properties: {
                conditions: {
                    type: "array",
                    title: "Conditions",
                    items: { type: "string" }
                },
                medications: {
                    type: "array",
                    title: "Medications",
                    items: { type: "string" }
                },
                notes: { type: "string", title: "Additional Notes" }
            }
        },
        uiSchema: {
            type: "VerticalLayout",
            elements: [
                { type: "Control", scope: "#/properties/conditions" },
                { type: "Control", scope: "#/properties/medications" },
                { type: "Control", scope: "#/properties/notes" }
            ]
        }
    }
};

/* =========================
   COMPONENT
========================= */
export default function DynamicForm({ formKey = "personalInfo", onSubmit }) {
    const form = formSchemas[formKey];
    const [data, setData] = useState({ skills: [], customSkill: "" });
    const [addedSkills, setAddedSkills] = useState([]);

    if (!form) {
        return <p style={{ color: TOKENS.textMuted }}>No form found for: {formKey}</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...data,
            allSkills: [...(data.skills || []), ...addedSkills]
        };
        console.log("Submitting data:", finalData);
        if (onSubmit) onSubmit(finalData);
    };

    const handleAddCustomSkill = () => {
        if (data.customSkill && !addedSkills.includes(data.customSkill.trim())) {
            setAddedSkills([...addedSkills, data.customSkill.trim()]);
            setData({ ...data, customSkill: "" });
        }
    };

    const handleRemoveSkill = (skill) => {
        setAddedSkills(addedSkills.filter((s) => s !== skill));
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: TOKENS.bgCard,
                border: `1px solid ${TOKENS.border}`,
                borderRadius: TOKENS.radius,
                boxShadow: TOKENS.shadowMd,
                padding: "20px 24px",
                color: TOKENS.text,
                fontFamily: "Nunito, sans-serif",
                maxWidth: 600,
                margin: "0 auto"
            }}
        >
            <h2
                style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: TOKENS.text,
                    marginBottom: "1rem",
                    borderBottom: `1px solid ${TOKENS.border}`,
                    paddingBottom: "6px"
                }}
            >
                {form.schema.title}
            </h2>

            {/* =========================
          JSONForms Render
      ========================== */}
            <div style={{ marginBottom: "1rem" }}>
                <JsonForms
                    schema={form.schema}
                    uischema={form.uiSchema}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ data }) => setData(data)}
                    validationMode="ValidateAndHide"
                />
            </div>

            {/* =========================
          Custom Skill Input
      ========================== */}
            {formKey === "skillsForm" && (
                <>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.6rem",
                            alignItems: "center",
                            marginTop: "0.5rem"
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type your skill..."
                            value={data.customSkill || ""}
                            onChange={(e) => setData({ ...data, customSkill: e.target.value })}
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: 999,
                                border: `1px solid ${TOKENS.border}`,
                                background: TOKENS.bgSoft,
                                fontSize: "0.9rem",
                                color: TOKENS.text
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomSkill}
                            style={{
                                background: TOKENS.primary,
                                color: "#fff",
                                border: "none",
                                borderRadius: 999,
                                padding: "10px 16px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.primaryHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.primary)}
                        >
                            Add
                        </button>
                    </div>

                    {addedSkills.length > 0 && (
                        <ul
                            style={{
                                listStyle: "none",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                marginTop: "14px",
                                padding: 0
                            }}
                        >
                            {addedSkills.map((skill) => (
                                <li
                                    key={skill}
                                    style={{
                                        background: "#e9f4f0",
                                        color: TOKENS.text,
                                        borderRadius: 999,
                                        padding: "6px 12px",
                                        fontWeight: 600,
                                        border: `1px solid ${TOKENS.border}`,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8
                                    }}
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            color: TOKENS.primary,
                                            fontWeight: 800,
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            lineHeight: "1rem"
                                        }}
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {/* =========================
          Submit
      ========================== */}
            <button
                type="submit"
                style={{
                    marginTop: "1.6rem",
                    background: TOKENS.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "10px 20px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    boxShadow: TOKENS.shadowSm,
                    transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = TOKENS.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = TOKENS.primary)}
            >
                Save
            </button>
        </form>
    );
}
