import { z } from "zod";
import { FieldFormSchema } from "../schemas/fieldForm.zod";

export type FieldFormData = z.infer<typeof FieldFormSchema>;
