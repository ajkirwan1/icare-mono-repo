import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const MIGRATIONS_DIR = "app/server/migrations/tables";

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
