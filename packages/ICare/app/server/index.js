import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
