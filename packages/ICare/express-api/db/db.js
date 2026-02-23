import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Only load env file if DATABASE_URL isn't already set (e.g., by Docker)
if (!process.env.DATABASE_URL) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // Load .env.development for local dev
  dotenv.config({ path: resolve(__dirname, "../.env.development") });
}

const connectionString = process.env.DATABASE_URL;
const useSSL = connectionString?.includes('sslmode=require');
export const pool = new pg.Pool({
  connectionString: useSSL ? connectionString.replace(/[?&]sslmode=require/, '') : connectionString,
  ssl: useSSL ? { rejectUnauthorized: false } : undefined
});
