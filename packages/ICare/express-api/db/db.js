import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Only load env file if DATABASE_URL isn't already set (e.g., by Docker)
if (!process.env.DATABASE_URL) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Use docker/.env.local as single source of truth for local dev
  dotenv.config({ path: resolve(__dirname, "../../../../docker/.env.local") });
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
