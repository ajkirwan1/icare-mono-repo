import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query(`
    SELECT
      id,
      title,
      description,
      location,
      hourly_rate,
      created_at
    FROM care_giving_roles
    ORDER BY created_at DESC
  `);
  res.json(rows);
});

export default router;
