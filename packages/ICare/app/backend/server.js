// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/api/todos", (req, res) => {
//   res.json([{ id: 1, text: "Learn RR7" }]);
// });

// app.get("/api/todos", (req, res) => {
//   res.json([{ id: 1, text: "Learn RR7" }]);
// });

// app.post("/api/todos", (req, res) => {
//   res.json({ ok: true });
// });

// app.listen(4000, () => {
//   console.log("API on http://localhost:4000");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.development" });

const app = express();

// ✅ CORS: na start możesz pozwolić tylko na front lokalny.
// Jeśli przeszkadza, zmień na: app.use(cors());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
    })
);

app.use(express.json({ limit: "1mb" }));

if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️ Missing OPENAI_API_KEY. Check .env.development");
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the official AI guidance assistant for the ICare platform.

ICare is a UK-based online platform that helps families and older adults find and connect with independent caregivers.
In this chat, “ICare” ALWAYS refers to this caregiving platform.
Do NOT ask the user to clarify what “ICare” means.
Do NOT mention or compare other products, brands, or services called iCare.

Your role is to explain how the ICare platform works, clarify processes, and help users find relevant information.
You are not a human agent, not a care provider, and not a care agency.

You must not provide medical, legal, or safeguarding advice.
You must not recommend or evaluate specific caregivers.
You must not make guarantees about care outcomes.

Use calm, neutral, and reassuring language.
Focus on explaining options, next steps, and where responsibility lies.
If a question goes beyond your scope, say so and suggest contacting ICare human support or visiting relevant ICare pages.
`.trim();


app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
    try {
        const message =
            typeof req.body?.message === "string" ? req.body.message.trim() : "";

        if (!message) return res.status(400).json({ error: "missing_message" });

        const r = await client.responses.create({
            model: "gpt-5-mini",
            instructions: SYSTEM_PROMPT,
            input: message,
            max_output_tokens: 70
        });

        res.json({ reply: r.output_text || "" });
    } catch (e) {
        console.error("AI error:", e);
        res.status(500).json({ error: "ai_error" });
    }
});


app.listen(4001, () => {
    console.log("API on http://localhost:4001");
});
