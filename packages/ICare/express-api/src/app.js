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
import authRouter from "../domains/auth/auth.routes.js";
import chatRouter from "../domains/chat/chat.routes.js";
import carereceiverDashboardRouter from "../domains/bookings/bookings.routes.js";
import carereceiverMessagesRouter from "../domains/messaging/messaging.routes.js";
import carereceiverSettingsRouter from "../routes/carereceiver-settings.routes.js";
import conversationsRouter from "../routes/conversations.routes.js";
import caregiverProfileRouter from "../domains/caregiver-profile/caregiver-profile.routes.js";
import adminSystemSettingsRouter from "../domains/admin/system-settings/system-settings.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let stripeRouter = null;
let handleStripeWebhook = null;
let caregiverOnboardingRouter = null;

try {
    const stripeModule = await import("../domains/stripe/stripe.routes.js");
    stripeRouter = stripeModule.default;
    handleStripeWebhook = stripeModule.handleStripeWebhook;
} catch (error) {
    console.warn("Stripe routes disabled:", error?.message || error);
}

try {
    const caregiverOnboardingModule = await import("../domains/caregiver-onboarding/onboarding.routes.js");
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
app.use("/api/v1", carereceiverSettingsRouter);
app.use("/api/v1", adminSystemSettingsRouter);
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
