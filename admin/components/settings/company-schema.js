import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),

  tagline: z.string(),

  about: z.string(),
});
