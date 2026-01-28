// waitinglist.schema.js
import { z } from "zod";

export const WaitinglistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email"),

  postcode: z
    .string()
    .trim()
    .min(1, "Postcode is required"),

  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  clientType: z
    .string()
    .trim()
    .min(1, "Client type is required"),

  typeOfCare: z
    .string()
    .trim()
    .min(1, "Type of care is required"),

  yearsOfExperience: z
    .coerce
    .number({
      invalid_type_error: "Years of experience must be a number"
    })
    .int("Years of experience must be a whole number")
    .min(0, "Years of experience must be 0 or more")
});
