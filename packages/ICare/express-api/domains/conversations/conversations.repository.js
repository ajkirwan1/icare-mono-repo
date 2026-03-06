import { pool } from "../../db/db.js";

export async function ensureConversation(conversationId) {
  const result = await pool.query(
    `
      INSERT INTO conversations (id)
      VALUES ($1)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
    `,
    [conversationId]
  );

  if (result.rows[0]) {
    return result.rows[0];
  }

  const existing = await pool.query(
    `SELECT * FROM conversations WHERE id = $1`,
    [conversationId]
  );

  return existing.rows[0];
}
