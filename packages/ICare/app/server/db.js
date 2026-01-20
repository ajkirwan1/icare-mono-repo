import "dotenv/config";
import pg from "pg";

import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
