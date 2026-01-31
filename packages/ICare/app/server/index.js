import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
