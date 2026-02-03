import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "../../.env.development" });

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: message,
        });

        res.json({
            reply: response.output_text,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI error" });
    }
});
