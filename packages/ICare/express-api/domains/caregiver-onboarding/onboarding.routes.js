import { Router } from "express";
import {
    getSummary,
    submitIdentity,
    submitRightToWork,
    submitDbs,
    getPayoutSetup,
    connectPayoutAccount
} from "./onboarding.controller.js";
import {
    listVerifications,
    getVerificationDetail,
    updateVerificationStatus,
    getDashboardSummary,
    listUsers,
    listBookings,
    getUserDetail,
    getAnalytics,
    getReportedIssues,
    getAuditLog
} from "./admin-analytics.controller.js";

const router = Router();

router.get("/caregiver/onboarding/summary", getSummary);
router.put("/caregiver/onboarding/identity-verification", submitIdentity);
router.put("/caregiver/onboarding/right-to-work", submitRightToWork);
router.put("/caregiver/onboarding/dbs-submission", submitDbs);
router.get("/caregiver/payout-setup", getPayoutSetup);
router.put("/caregiver/payout-setup/connect-account", connectPayoutAccount);

router.get("/admin/verifications", listVerifications);
router.get("/admin/verifications/:verificationId", getVerificationDetail);
router.patch("/admin/verifications/:verificationId/status", updateVerificationStatus);
router.get("/admin/dashboard-summary", getDashboardSummary);
router.get("/admin/users", listUsers);
router.get("/admin/bookings", listBookings);
router.get("/admin/users/:userId", getUserDetail);
router.get("/admin/analytics", getAnalytics);
router.get("/admin/reported-issues", getReportedIssues);
router.get("/admin/audit-log", getAuditLog);

export default router;
