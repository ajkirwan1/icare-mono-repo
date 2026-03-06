import { Router } from "express";
import { getConversation, postMessage } from "./conversations.controller.js";

const router = Router();

router.get("/conversations/:id", getConversation);
router.post("/conversations/:id/messages", postMessage);

export default router;
