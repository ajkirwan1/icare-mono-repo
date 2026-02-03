import { z } from "zod";

export const ContactSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  subject: z.string().trim().min(1, "Subject is required"),
  topic: z.enum(["general", "care", "caregiver", "safety", "billing", "other"], {
    errorMap: () => ({ message: "Please choose a topic" })
  }),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  // honeypot
  company: z.string().optional(),
  // optional delay
  _delay: z.coerce.number().optional()
});
