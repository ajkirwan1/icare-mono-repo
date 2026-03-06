import { Router } from "express";
import { chatHandler, contactHandler } from "./chat.controller.js";

const router = Router();

router.post("/chat", chatHandler);
router.post("/contact", contactHandler);

export default router;
