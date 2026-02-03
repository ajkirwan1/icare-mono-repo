import { Router } from "express";
import { newsletterSubscribeLimiter } from "../middleware/rate-limit.js";
import { sendWaitinglistConfirmationEmail } from "../services/send-emails.js";
import { pool } from "../db/db.js";
import { WaitinglistSchema } from "../schemas/waitinglist.schema.js";

const router = Router();

/**
 * Helpers
 */
// function getPublicApiBaseUrl(req) {
//   const envBase = process.env.PUBLIC_API_URL;
//   if (envBase) { return envBase.replace(/\/$/, ""); }
//   return `${req.protocol}://${req.get("host")}`;
// }

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

        const exists = await pool.query(
            "SELECT 1 FROM waitinglist WHERE lower(email)=lower($1) AND user_type=$2",
            [data.email, data.userType]
        );

        if (exists.rowCount > 0) {
            return res.json({
                ok: true,
                alreadyRegistered: true,
                message: "You're already on the waiting list."
            });
        }


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
        hours_per_week
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,
        $9,$10,$11
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
                data.userType === "caregiver" ? data.hoursPerWeek : null
            ]
        );

        try {
            await sendWaitinglistConfirmationEmail(data.email, {
                firstName: data.firstName,
                userType: data.userType,
                postcode: data.postcode
            });
        } catch (e) {
            // Don’t fail the signup if email sending fails
            console.error("Waitinglist confirmation email failed:", e);
        }
        return res.json({
            ok: true,
            alreadyRegistered: false,
            message: "You're now on the waiting list."
        });
    } catch (err) {
        console.error("Waitinglist signup error:", err);
        return res.status(500).json({ ok: false, error: "Server error." });
    }
});

export default router;
