import { z } from "zod";

const emptyToUndefined = (v) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const requiredSelect = (schema, message) =>
  z.preprocess(
    emptyToUndefined,
    schema.optional().refine((v) => v !== undefined, { message })
  );

export const WaitinglistSchema = z.discriminatedUnion("userType", [
  // RECEIVER
  z.object({
    userType: z.literal("receiver"),

    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    postcode: z.string().trim().min(1, "Postcode is required"),

    agreeTerms: z.literal("on", {
      errorMap: () => ({ message: "You must agree to the terms and conditions" })
    }),
    subscribeNewsletter: z.enum(["on"]).optional(),

    careFor: requiredSelect(
      z.enum(["self", "family", "friend"]),
      "Please select who the care is for"
    ),

    needWhen: requiredSelect(
      z.enum(["soon", "1_3m", "3m_plus", "not_sure"]),
      "Please select when care is needed"
    ),

    typeOfCare: requiredSelect(
      z.enum(["hourly", "live_in", "night", "dementia", "companion", "not_sure"]),
      "Please select a type of care"
    )
  }),

  // CAREGIVER
  z.object({
    userType: z.literal("caregiver"),

    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    postcode: z.string().trim().min(1, "Postcode is required"),

    agreeTerms: z.literal("on", {
      errorMap: () => ({ message: "You must agree to the terms and conditions" })
    }),
    // subscribeNewsletter: z.enum(["on"]).optional(),

    yearsOfExperience: requiredSelect(
      z.enum(["0_1", "1_3", "3_5", "5_plus"]),
      "Please select years of experience"
    ),

    caregiverRole: requiredSelect(
      z.enum([
        "care_assistant",
        "support_worker",
        "live_in_carer",
        "home_carer",
        "nurse",
        "companion",
        "other"
      ]),
      "Please select your role"
    ),

    hoursPerWeek: requiredSelect(
      z.enum(["lt_10", "10_20", "20_35", "35_plus"]),
      "Please select hours per week"
    )
  })
]);
