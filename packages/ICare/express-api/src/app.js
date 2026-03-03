/* global console */
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// import todosRouter from "./routes/todos.routes.js";
// import careRolesRouter from "./routes/care-roles.routes.js";
// import documentsRouter from "./routes/documents.routes.js";
import newsletterRouter from "../routes/newsletter.routes.js";
import waitinglistRouter from "../routes/waitinglist.routes.js";
import contactUsRouter from "../routes/contact.routes.js";
import authRouter from "../routes/auth.routes.js";
import chatRouter from "../routes/chat.routes.js";
import carereceiverDashboardRouter from "../routes/carereceiver-dashboard.routes.js";
import carereceiverMessagesRouter from "../routes/carereceiver-messages.routes.js";
import conversationsRouter from "../routes/conversations.routes.js";
import caregiverProfileRouter from "../routes/caregiver-profile.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let stripeRouter = null;
let handleStripeWebhook = null;
let caregiverOnboardingRouter = null;

try {
    const stripeModule = await import("../routes/stripe.routes.js");
    stripeRouter = stripeModule.default;
    handleStripeWebhook = stripeModule.handleStripeWebhook;
} catch (error) {
    console.warn("Stripe routes disabled:", error?.message || error);
}

try {
    const caregiverOnboardingModule = await import("../routes/caregiver-onboarding.routes.js");
    caregiverOnboardingRouter = caregiverOnboardingModule.default;
} catch (error) {
    console.warn("Caregiver onboarding routes disabled:", error?.message || error);
}

app.use(cors({
    origin: true,
    credentials: true
}));
if (handleStripeWebhook) {
    app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
}
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

app.use("/uploads", express.static(resolve(__dirname, "../../public/uploads")));
app.use("/api/newsletter", newsletterRouter);
app.use("/api/waitinglist", waitinglistRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", carereceiverDashboardRouter);
app.use("/api/v1", carereceiverMessagesRouter);
if (caregiverOnboardingRouter) {
    app.use("/api/v1", caregiverOnboardingRouter);
}
if (stripeRouter) {
    app.use("/api/stripe", stripeRouter);
}
app.use("/api", conversationsRouter);
app.use("/api", caregiverProfileRouter);
app.use("/api", chatRouter);

export default app;
