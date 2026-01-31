import { Router } from "express";
// import crypto from "crypto";
import { newsletterSubscribeLimiter } from "../middleware/rate-limit.js";
// import { sendConfirmationEmail } from "../services/send-emails.js";
import { pool } from "../db.js";
import { WaitinglistSchema } from "../../utils/validation/schemas/waitinglist.schema.js";

const router = Router();

/**
 * Helpers
 */
function getPublicApiBaseUrl(req) {
  const envBase = process.env.PUBLIC_API_URL;
  if (envBase) { return envBase.replace(/\/$/, ""); }
  return `${req.protocol}://${req.get("host")}`;
}

function zodErrorsToFieldErrors(zodError) {
  const errors = {};
  for (const issue of zodError.issues || []) {
    const key = issue.path?.[0];
    if (!key) { continue; }
    if (!errors[key]) { errors[key] = issue.message; }
  }
  return errors;
}

/**
 * POST /api/waitinglist
 */
router.post("/", newsletterSubscribeLimiter, async (req, res) => {
  try {
    const raw = req.body || {};

    // Honeypot
    if (raw.company) {
      return res.json({ ok: true });
    }

    const parsed = WaitinglistSchema.safeParse(raw);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: "Please check the highlighted fields.",
        errors: zodErrorsToFieldErrors(parsed.error)
      });
    }

    const data = parsed.data;

    await pool.query(
      `
      INSERT INTO waitinglist (
        user_type,
        first_name,
        last_name,
        email,
        postcode,
        care_for,
        need_when,
        type_of_care,
        years_of_experience,
        caregiver_role,
        hours_per_week,
        subscribe_newsletter
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,
        $9,$10,$11,
        $12
      )
      ON CONFLICT (email_ci, user_type) DO UPDATE
      SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        postcode = EXCLUDED.postcode,
        care_for = EXCLUDED.care_for,
        need_when = EXCLUDED.need_when,
        type_of_care = EXCLUDED.type_of_care,
        years_of_experience = EXCLUDED.years_of_experience,
        caregiver_role = EXCLUDED.caregiver_role,
        hours_per_week = EXCLUDED.hours_per_week,
        subscribe_newsletter = EXCLUDED.subscribe_newsletter,
        updated_at = now()
      `,
      [
        data.userType,
        data.firstName,
        data.lastName,
        data.email,
        data.postcode,

        data.userType === "receiver" ? data.careFor : null,
        data.userType === "receiver" ? data.needWhen : null,
        data.userType === "receiver" ? data.typeOfCare : null,

        data.userType === "caregiver" ? data.yearsOfExperience : null,
        data.userType === "caregiver" ? data.caregiverRole : null,
        data.userType === "caregiver" ? data.hoursPerWeek : null,

        data.subscribeNewsletter === "on"
      ]
    );

    // Newsletter opt-in (reuse existing flow)
    // if (data.subscribeNewsletter === "on") {
    //   const token = crypto.randomBytes(32).toString("hex");

    //   await pool.query(
    //     `
    //     INSERT INTO newsletter_pending (email, token, source)
    //     VALUES ($1, $2, $3)
    //     ON CONFLICT (email) DO UPDATE
    //     SET token=$2, source=$3, created_at=now()
    //     `,
    //     [data.email, token, "waitinglist"]
    //   );

    //   const apiBase = getPublicApiBaseUrl(req);
    //   const confirmUrl = `${apiBase}/api/newsletter/confirm?token=${token}`;
    //   await sendConfirmationEmail(data.email, confirmUrl);
    // }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Waitinglist signup error:", err);
    return res.status(500).json({ ok: false, error: "Server error." });
  }
});

export default router;
