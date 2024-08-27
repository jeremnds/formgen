import { z } from "zod";

export const FieldFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must not exceed 100 chars.")
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\- ]+$/, "Name can only contain letters."),
  type: z.string(),
  validation: z.boolean().optional(),
  required: z.boolean().optional(),
  errorMessage: z.string().optional(),
  max: z.coerce.number().optional(),
  min: z.coerce.number().optional(),
  pattern: z.string().optional(),
});
