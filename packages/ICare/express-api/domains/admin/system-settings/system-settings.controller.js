/* global console */
import {
    getAdminSystemSettingsSnapshot,
    getPublicPlatformSettingsSnapshot,
    saveAdminSystemSettings
} from "./system-settings.service.js";
import { systemSettingsUpdateSchema } from "./system-settings.validation.js";

export async function getAdminSystemSettingsController(req, res) {
    try {
        const payload = await getAdminSystemSettingsSnapshot();
        return res.json({ data: payload });
    } catch (error) {
        console.error("[admin-system-settings] GET admin system settings failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_system_settings_fetch_failed",
                message: "Could not load system settings."
            }
        });
    }
}

export async function patchAdminSystemSettingsController(req, res) {
    try {
        const parsed = systemSettingsUpdateSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "invalid_payload",
                    message: "System settings payload is invalid.",
                    details: parsed.error.flatten()
                }
            });
        }

        const updatedBy = String(req.get("x-user-email") || req.get("x-user-id") || "admin").trim();
        const payload = await saveAdminSystemSettings(parsed.data, updatedBy);
        return res.json({ data: payload });
    } catch (error) {
        console.error("[admin-system-settings] PATCH admin system settings failed:", error);
        return res.status(500).json({
            error: {
                code: "admin_system_settings_update_failed",
                message: "Could not update system settings."
            }
        });
    }
}

export async function getPublicPlatformSettingsController(req, res) {
    try {
        const payload = await getPublicPlatformSettingsSnapshot();
        return res.json({ data: payload });
    } catch (error) {
        console.error("[admin-system-settings] GET platform settings failed:", error);
        return res.status(500).json({
            error: {
                code: "platform_settings_fetch_failed",
                message: "Could not load platform settings."
            }
        });
    }
}
