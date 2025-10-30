// src/forms/dynamic-form.jsx
import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

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

export default function DynamicForm({ formKey = "personalInfo", onSubmit }) {
  const form = formSchemas[formKey];
  const [data, setData] = useState({});

  if (!form) { return <p>No form found for: {formKey}</p>; }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);
    if (onSubmit) { onSubmit(data); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <JsonForms
        schema={form.schema}
        uischema={form.uiSchema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
        validationMode="ValidateAndHide"
      />
      <button type="submit" style={{ marginTop: "1rem" }}>
        Save
      </button>
    </form>
  );
}
