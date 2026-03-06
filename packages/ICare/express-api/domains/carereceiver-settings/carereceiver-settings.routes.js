import { Router } from "express";
import {
    getNotifications,
    putNotifications,
    getPayments,
    putStripeCustomer
} from "./carereceiver-settings.controller.js";

const router = Router();

router.get("/carereceiver/settings/notifications", getNotifications);
router.put("/carereceiver/settings/notifications", putNotifications);
router.get("/carereceiver/settings/payments", getPayments);
router.put("/carereceiver/settings/payments/stripe-customer", putStripeCustomer);

export default router;
