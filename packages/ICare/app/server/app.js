import express from "express";
import cors from "cors";

// import todosRouter from "./routes/todos.routes.js";
// import careRolesRouter from "./routes/care-roles.routes.js";
// import documentsRouter from "./routes/documents.routes.js";
import newsletterRouter from "./routes/newsletter.routes.js";
import waitinglistRouter from "./routes/waitinglist.routes.js";

const app = express();

app.use(cors());
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

export default app;
