/* global console, process */
import {
  wantsHuman,
  looksLikeCompetitorMention,
  competitorRefusal,
  fastFaq,
  faqAnswer,
  feesSavingsExampleReply,
  isOfficialQuoteQuestion,
  fallbackByIntent,
  client,
  buildMessages,
  SYSTEM_PROMPT,
  extractText,
  hitRateLimit,
  sanitize,
  isValidEmail,
  resend,
  HOW_IT_WORKS_URL
} from "./chat.service.js";

export async function chatHandler(req, res) {
  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    if (!message) return res.status(400).json({ error: "missing_message" });

    if (wantsHuman(message)) {
      return res.json({
        reply:
          "Sure - I can pass this to our team. Please share:\n" +
          "• your name\n" +
          "• email or phone\n" +
          "• postcode (optional)\n" +
          "• one sentence on what you need\n\n" +
          "You can also use the contact form below.",
        flags: { human_handoff: true },
      });
    }

    if (looksLikeCompetitorMention(message)) {
      return res.json({ reply: competitorRefusal(), flags: { competitor_mentioned: true } });
    }

    const canned = fastFaq(message);
    if (canned) return res.json({ reply: canned, flags: { canned: true } });

    const fromFaq = faqAnswer(message);
    if (fromFaq) return res.json({ reply: fromFaq, flags: { faq: true } });

    const feesExample = feesSavingsExampleReply(message);
    if (feesExample && !isOfficialQuoteQuestion(message)) {
      return res.json({ reply: feesExample, flags: { fees_example: true } });
    }

    if (!client) {
      return res.json({ reply: fallbackByIntent(message), flags: { no_openai: true } });
    }

    const history = Array.isArray(req.body?.history) ? req.body.history : [];
    const input = buildMessages(message, history);

    const r = await client.responses.create({
      model: "gpt-5-mini",
      instructions: SYSTEM_PROMPT,
      input,
      max_output_tokens: 240,
    });

    const reply = extractText(r);

    return res.json({
      reply: reply || fallbackByIntent(message),
      flags: { model: true, empty_extract: !reply },
    });
  } catch (e) {
    console.error("AI error:", e);
    return res.status(500).json({ error: "ai_error" });
  }
}

export async function contactHandler(req, res) {
  try {
    const clientIp = String(req.ip || req.headers["x-forwarded-for"] || "unknown");
    if (hitRateLimit(clientIp)) {
      return res.status(429).json({ error: "rate_limited" });
    }

    const website = sanitize(req.body?.website, 200);
    if (website) return res.json({ ok: true });

    const name = sanitize(req.body?.name, 120);
    const email = sanitize(req.body?.email, 160);
    const phone = sanitize(req.body?.phone, 80);
    const postcode = sanitize(req.body?.postcode, 24);
    const message = sanitize(req.body?.message, 4000);

    if (!message) return res.status(400).json({ error: "missing_message" });
    if (!email && !phone) return res.status(400).json({ error: "missing_contact_method" });
    if (email && !isValidEmail(email)) return res.status(400).json({ error: "invalid_email" });

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.EMAIL_FROM || "ICare <no-reply@icare.com>";
    if (!to) return res.status(500).json({ error: "missing_contact_to_email" });
    if (!resend) return res.status(500).json({ error: "missing_resend_api_key" });

    const subject = `ICare chat -> human request${postcode ? ` (${postcode})` : ""}`;
    const text =
      "New human-help request from chat\n\n" +
      `Name: ${name || "-"}\n` +
      `Email: ${email || "-"}\n` +
      `Phone: ${phone || "-"}\n` +
      `Postcode: ${postcode || "-"}\n\n` +
      `Message:\n${message}\n`;

    await resend.emails.send({ from, to: [to], subject, text, replyTo: email ? [email] : undefined });

    if (email) {
      await resend.emails.send({
        from,
        to: [email],
        subject: "We received your message",
        text:
          "Thanks for contacting ICare. Our team will get back to you shortly.\n\n" +
          `You can also read how ICare works here: ${HOW_IT_WORKS_URL}`,
      });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("contact error:", e);
    return res.status(500).json({ error: "contact_error" });
  }
}
