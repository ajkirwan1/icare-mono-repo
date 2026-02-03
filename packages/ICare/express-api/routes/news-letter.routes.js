// import { Router } from "express";
// import { pool } from "../db.js"; // your postgres client

// const router = Router();


// router.get("/news-letter-confirm", async (req, res) => {
//   const token = String(req.query.token || "");

//   const pending = await db.query(
//     "SELECT email FROM newsletter_pending WHERE token=$1",
//     [token]
//   );

//   if (!pending.rowCount) {
//     return res.redirect("/newsletter/invalid");
//   }

//   const email = pending.rows[0].email;

//   await pool.query("BEGIN");

//   await pool.query(
//     "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT DO NOTHING",
//     [email]
//   );

//   await pool.query(
//     "DELETE FROM newsletter_pending WHERE email=$1",
//     [email]
//   );

//   await pool.query("COMMIT");

//   return res.redirect("/newsletter/confirmed");
// });

// router.get("/unsubscribe", async (req, res) => {
//   const token = String(req.query.token || "");
//   if (!token) { return res.redirect("/newsletter/invalid"); }

//   const r = await db.query(
//     `UPDATE newsletter_subscribers
//      SET unsubscribed_at = now()
//      WHERE unsubscribe_token = $1
//      RETURNING email`,
//     [token]
//   );

//   if (!r.rowCount) { return res.redirect("/newsletter/invalid"); }

//   return res.redirect("/newsletter/unsubscribed");
// });

// export default router;
