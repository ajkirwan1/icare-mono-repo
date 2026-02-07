import app from "./app.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Only load env file if PORT isn't already set (e.g., by Docker)
if (!process.env.PORT) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Load .env.development for local dev
  dotenv.config({ path: resolve(__dirname, "../.env.development") });
}

const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});
