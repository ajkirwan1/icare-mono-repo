import { Router } from "express";
import {
    getUnreadCount,
    listConversations,
    getConversationMessages,
    sendMessage,
    markMessageRead,
    getCaregiverUnreadCount,
    listCaregiverConversations,
    getCaregiverConversationMessages,
    sendCaregiverMessage,
    markCaregiverMessageRead
} from "./messaging.controller.js";

const router = Router();

router.get("/conversations/unread-count", getUnreadCount);
router.get("/conversations", listConversations);
router.get("/conversations/:conversationId/messages", getConversationMessages);
router.post("/conversations/:conversationId/messages", sendMessage);
router.put("/messages/:messageId/read", markMessageRead);

router.get("/caregiver/conversations/unread-count", getCaregiverUnreadCount);
router.get("/caregiver/conversations", listCaregiverConversations);
router.get("/caregiver/conversations/:conversationId/messages", getCaregiverConversationMessages);
router.post("/caregiver/conversations/:conversationId/messages", sendCaregiverMessage);
router.put("/caregiver/messages/:messageId/read", markCaregiverMessageRead);

export default router;
