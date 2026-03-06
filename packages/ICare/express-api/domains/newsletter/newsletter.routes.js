import { Router } from "express";
import { newsletterSubscribeLimiter } from "../../middleware/rate-limit.js";
import {
    subscribe,
    confirm,
    unsubscribe,
    resendConfirmation
} from "./newsletter.controller.js";

const router = Router();

router.post("/subscribe", newsletterSubscribeLimiter, subscribe);
router.get("/confirm", confirm);
router.get("/unsubscribe", unsubscribe);
router.post("/resend", newsletterSubscribeLimiter, resendConfirmation);

export default router;
