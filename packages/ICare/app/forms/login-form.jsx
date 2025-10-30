import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { CssBaseline, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const userSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First name" },
    age: { type: "number", title: "Age" }
  },
  required: ["firstName"]
};

const userUiSchema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName" },
    { type: "Control", scope: "#/properties/age" }
  ]
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleChange = ({ data }) => setData(data);

  const handleSubmit = (event) => {
    event.preventDefault();

    // ✅ Example: save to backend or global state
    console.log("Submitting data:", data);

    // ✅ Navigate with data in route state
    // navigate("/submitted", { state: { formData: data } });
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <JsonForms
        schema={userSchema}
        uischema={userUiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={handleChange}
      />
      <Button
        type="submit" variant="contained" sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </form>
  </div>;
}
