import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only load env file if DATABASE_URL isn't already set (e.g., by Docker)
if (!process.env.DATABASE_URL) {
  // Use docker/.env.local as single source of truth for local dev
  dotenv.config({ path: path.resolve(__dirname, "../../../../../docker/.env.local") });
}

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// ✅ Adjust this relative path to wherever migrations live now.
// If you moved the script into packages/ICare/express-api/db/scripts/run-sql.js
// and migrations are in packages/ICare/express-api/db/migrations/tables:
const MIGRATIONS_DIR = path.resolve(__dirname, "..", "migrations", "tables");

async function run() {
  const client = await pool.connect();

  try {
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith(".sql"))
      .sort(); // 001_, 002_, 003_ ...

    console.log("Found migrations:", files);

    await client.query("BEGIN");

    for (const file of files) {
      const filePath = path.join(MIGRATIONS_DIR, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log("📄 Running:", file);
      await client.query(sql);
    }

    await client.query("COMMIT");
    console.log("✅ All migrations ran successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Migration failed, rolled back:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
