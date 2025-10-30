import React, { useState } from "react";
import { IcareHeroNew, IcareCard, IcareButton } from "react-library";
import { Link, Form } from "react-router";
import navLinks from "./nav-links";
import styles from "./hero-register.module.scss";
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
    password: { type: "string", title: "Password", minLength: 4 }
  },
  required: ["username", "password"]
};

// ---------- UI Schema ----------
export const uiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/username",
      options: { placeholder: "Enter your username", classNames: "mb-4" }
    },
    {
      type: "Control",
      scope: "#/properties/password",
      options: {
        inputType: "password",
        placeholder: "Enter your password",
        classNames: "mb-4"
      }
    }
  ]
};

// ---------- Helper: dynamically generate hidden inputs ----------
function HiddenInputs({ data, prefix = "" }) {
  if (!data || typeof data !== "object") { return null; }

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
      e.target.submit(); // ✅ Hand off to React Router <Form>
    }
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
        <div className={styles.root}>
          <IcareCard variant="elevated">
            <div slot="contents" className={styles.registerCard}>
              <h1 className={styles.title}>Register</h1>

              <Form
                id="registerForm"
                method="post"
                action="/register"
                onSubmit={handleSubmit}
                className={styles.form}
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

                {/* 👇 Dynamic hidden fields (sync JSON Forms data to FormData) */}
                <HiddenInputs data={data} />

                <div className={styles.actions}>
                  <IcareButton type="submit">Submit</IcareButton>
                </div>
              </Form>

              <p className={styles.helper}>
                Sign up now to access our comprehensive care management tools and resources.
              </p>
            </div>
          </IcareCard>
        </div>
      </span>
    </IcareHeroNew>
  );
}
