import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    const filePath = path.resolve(
      "packages/ICare/app/server/db/migrations/001_newsletter.sql"
    );

    const sql = fs.readFileSync(filePath, "utf8");

    console.log("📄 Running migration:", filePath);

    await pool.query(sql);

    console.log("✅ Newsletter tables created successfully");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
