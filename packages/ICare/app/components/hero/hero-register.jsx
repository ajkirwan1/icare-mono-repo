import React, { useState } from "react";
import { IcareHeroNew, IcareCard, IcareButton } from "react-library";
import { Link, Form } from "react-router";
import navLinks from "./nav-links";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

// ---------- JSON Schema ----------
export const schema = {
    type: "object",
    title: "Register",
    properties: {
        username: { type: "string", title: "Username", minLength: 4 },
        password: { type: "string", title: "Password", minLength: 4 },
    },
    required: ["username", "password"],
};

// ---------- UI Schema ----------
export const uiSchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/username",
            options: { placeholder: "Enter your username" },
        },
        {
            type: "Control",
            scope: "#/properties/password",
            options: {
                inputType: "password",
                placeholder: "Enter your password",
            },
        },
    ],
};

// ---------- Hidden Inputs ----------
function HiddenInputs({ data, prefix = "" }) {
    if (!data || typeof data !== "object") return null;

    return Object.entries(data).map(([key, value]) => {
        const name = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && !Array.isArray(value)) {
            return <HiddenInputs key={name} data={value} prefix={name} />;
        }

        return (
            <input
                key={name}
                type="hidden"
                name={name}
                value={value != null ? value : ""}
            />
        );
    });
}

// ---------- Main Component ----------
export default function HeroRegisterComponent({ imgSrc }) {
    const [data, setData] = useState({ username: "", password: "" });
    const [showErrors, setShowErrors] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = ajv.validate(schema, data);
        if (!valid) {
            setShowErrors(true);
            console.warn("Validation errors:", ajv.errors);
        } else {
            console.log("Submitting:", data);
            e.target.submit();
        }
    };

    // ---------- Inline Styles ----------
    const styles = {

        registerCard: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.75rem 1.5rem",
            width: "100%",
            maxWidth: "400px",
            background: "rgba(255, 255, 255, 0.55)",
            borderRadius: "22px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
        },
        title: {
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            color: "#375d4f",
            fontSize: "1.7rem",
            marginBottom: "1.1rem",
            textAlign: "center",
        },
        form: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
        },
        actions: {
            display: "flex",
            justifyContent: "center",
            marginTop: "0.8rem",
        },
        button: {
            backgroundColor: "rgba(123, 184, 159, 0.9)",
            color: "white",
            fontWeight: 600,
            padding: "0.8rem 1.6rem",
            borderRadius: "26px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",

            transition: "all 0.25s ease",
        },
        helper: {
            textAlign: "center",
            color: "#4c7865",
            fontSize: "0.9rem",
            marginTop: "1rem",
            lineHeight: 1.4,
            maxWidth: "320px",
        },
    };

    return (
        <IcareHeroNew imageSrc={imgSrc} slot="hero-content">
            {/* Navigation links */}
            {navLinks.map((link) => (
                <li slot="nav-links" key={link.to}>
                    <Link to={link.to}>{link.text}</Link>
                </li>
            ))}

            {/* Main content */}
            <span slot="header-content">
                <div style={styles.root}>
                    <IcareCard variant="elevated">
                        <div slot="contents" style={styles.registerCard}>
                            <h1 style={styles.title}>Register</h1>

                            <Form
                                id="registerForm"
                                method="post"
                                action="/register"
                                onSubmit={handleSubmit}
                                style={styles.form}
                            >
                                <JsonForms
                                    schema={schema}
                                    uischema={uiSchema}
                                    data={data}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    onChange={({ data }) => setData(data)}
                                    validationMode={showErrors ? "ValidateAndShow" : "ValidateAndHide"}
                                />

                                <HiddenInputs data={data} />

                                <div style={styles.actions}>
                                    <IcareButton
                                        type="submit"
                                        style={styles.button}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor = "rgba(110, 170, 145, 0.95)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "rgba(123, 184, 159, 0.9)")
                                        }
                                    >
                                        Submit
                                    </IcareButton>
                                </div>
                            </Form>

                            <p style={styles.helper}>
                                Sign up now to access our comprehensive care management tools and resources.
                            </p>
                        </div>
                    </IcareCard>
                </div>
            </span>
        </IcareHeroNew>
    );
}
