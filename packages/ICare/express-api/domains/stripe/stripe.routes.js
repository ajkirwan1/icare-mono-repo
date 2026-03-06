import { Router } from "express";
import { asyncHandler } from "./stripe.service.js";
import {
    getConfig,
    createCheckoutSession,
    createSubscriptionSession,
    createConnectAccount,
    createDashboardLink,
    createPayout,
    handleStripeWebhook
} from "./stripe.controller.js";

const router = Router();

router.get("/config", getConfig);
router.post("/checkout-session", asyncHandler(createCheckoutSession));
router.post("/subscription-session", asyncHandler(createSubscriptionSession));
router.post("/connect/account", asyncHandler(createConnectAccount));
router.post("/connect/dashboard-link", asyncHandler(createDashboardLink));
router.post("/connect/payout", asyncHandler(createPayout));

export { handleStripeWebhook };
export default router;
