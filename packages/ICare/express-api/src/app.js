import express from "express";
import cors from "cors";

// import todosRouter from "./routes/todos.routes.js";
// import careRolesRouter from "./routes/care-roles.routes.js";
// import documentsRouter from "./routes/documents.routes.js";
import newsletterRouter from "../routes/newsletter.routes.js";
import waitinglistRouter from "../routes/waitinglist.routes.js";
import contactUsRouter from "../routes/contact.routes.js";
import chatRouter from "../routes/chat.routes.js";
import stripeRouter, { handleStripeWebhook } from "../routes/stripe.routes.js";

const app = express();

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
app.use("/api/stripe", stripeRouter);
app.use("/api", chatRouter);

export default app;
