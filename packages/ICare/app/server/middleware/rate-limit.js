import rateLimit from "express-rate-limit";

export const newsletterSubscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,               // max 20 requests per IP per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { ok: false, error: "Too many attempts. Please try again later." }
});
