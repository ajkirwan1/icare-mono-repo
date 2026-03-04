import { Router } from "express";
import {
    getAdminSystemSettingsController,
    getPublicPlatformSettingsController,
    patchAdminSystemSettingsController
} from "./system-settings.controller.js";

const router = Router();

router.get("/admin/system-settings", getAdminSystemSettingsController);
router.patch("/admin/system-settings", patchAdminSystemSettingsController);
router.get("/platform/settings", getPublicPlatformSettingsController);

export default router;
