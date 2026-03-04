import { z } from "zod";

export const systemSettingsUpdateSchema = z.object({
    platformFeePercent: z.number().min(0).max(100).optional(),
    bookingServiceFeePercent: z.number().min(0).max(100).optional(),
    identityRequired: z.boolean().optional(),
    rightToWorkRequired: z.boolean().optional(),
    dbsRequired: z.boolean().optional()
}).refine(
    (value) => Object.values(value).some((entry) => entry !== undefined),
    { message: "At least one system setting field must be provided." }
);
