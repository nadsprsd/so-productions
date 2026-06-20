import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  message: z.string().min(20, "Please provide a bit more detail (min 20 characters)").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
