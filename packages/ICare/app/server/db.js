import "dotenv/config";
import pg from "pg";

import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
