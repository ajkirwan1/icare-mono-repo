import express from "express";
import cors from "cors";

// import todosRouter from "./routes/todos.routes.js";
// import careRolesRouter from "./routes/care-roles.routes.js";
// import documentsRouter from "./routes/documents.routes.js";
import newsletterRouter from "../routes/newsletter.routes.js";
import waitinglistRouter from "../routes/waitinglist.routes.js";
import contactUsRouter from "../routes/contact.routes.js";
import authRouter from "../routes/auth.routes.js";
import chatRouter from "../routes/chat.routes.js";

const app = express();
let stripeRouter = express.Router();
let handleStripeWebhook = (_req, res) => {
    return res.status(503).json({
        ok: false,
        error: "Stripe routes are unavailable in this local environment."
    });
};

try {
    const stripeModule = await import("../routes/stripe.routes.js");
    stripeRouter = stripeModule.default;
    handleStripeWebhook = stripeModule.handleStripeWebhook;
} catch (error) {
    console.warn("Stripe routes disabled:", error?.message || error);
}

app.use(cors());
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
app.use(express.json());

// Mount routers
// app.use("/api/todos", todosRouter);
// app.use("/api/available-care-roles", careRolesRouter);
// app.use("/api/documents", documentsRouter);
// app.use("/api/newsletter/subscribe", documentsRouter);

app.use((req, res, next) => {
    console.log("🔥 [API HIT]", req.method, req.originalUrl);
    next();
});

app.use("/api/newsletter", newsletterRouter);
app.use("/api/waitinglist", waitinglistRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api", chatRouter);

export default app;
