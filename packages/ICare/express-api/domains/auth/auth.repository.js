import { pool } from "../../db/db.js";

async function verifyPassword(plainPassword, passwordHash) {
    const result = await pool.query("SELECT crypt($1, $2) = $2 AS ok", [plainPassword, passwordHash]);
    return Boolean(result.rows?.[0]?.ok);
}

export { verifyPassword };
