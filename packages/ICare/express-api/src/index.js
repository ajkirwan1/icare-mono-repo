import app from "./app.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { ensureAllSchemas } from "../db/ensure-schemas.js";
import { seedMessagingData } from "../db/seed-messaging.js";

// Only load env file if PORT isn't already set (e.g., by Docker)
if (!process.env.PORT) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Load .env.development for local dev
  dotenv.config({ path: resolve(__dirname, "../.env.development") });
}

const PORT = process.env.PORT || 4001;

try {
  await ensureAllSchemas();
  await seedMessagingData();
  console.log("[startup] Schema bootstrap complete.");
} catch (error) {
  console.warn("[startup] Schema bootstrap skipped (DB may be unavailable):", error?.message || error);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});
