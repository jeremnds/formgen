import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldType } from "../models/field.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFormPrompt(
  fields: FieldType[],
  options: {
    rhf: boolean;
    shadcn: boolean;
    zod: boolean;
    tsx: boolean;
  },
) {
  const { rhf, shadcn, zod, tsx } = options;

  let prompt = `${tsx ? "Generate a TSX form" : "Generate a JSX form"}`;

  prompt += rhf
    ? " using React Hook Form,"
    : " without using React Hook Form or any other form management libraries,";

  if (shadcn) {
    prompt +=
      " with shadCN components, using <Label>, <Input>, <Checkbox>, <Textarea>, <Button>, ensuring radio labels are aligned with inputs.";
  }

  if (zod) {
    prompt += " with Zod for validation,";
  }

  prompt += " with the following fields:\n\n";

  prompt += fields
    .map((field) => {
      let validationRules = "";

      if (field.validation) {
        if (field.validation.required) {
          validationRules += `required: "${field.validation.errorMessage || `${field.name} is required`}"`;
        }
        if (field.validation.min !== undefined) {
          validationRules += `, min: ${field.validation.min}`;
        }
        if (field.validation.max !== undefined) {
          validationRules += `, max: ${field.validation.max}`;
        }
        if (field.validation.pattern) {
          validationRules += `, pattern: "${field.validation.pattern}"`;
        }
      }

      let fieldCode = "";
      const labelCode = shadcn ? `use <Label>` : "";

      if (shadcn) {
        if (field.type === "radio" && field.options) {
          const radioOptions = field.options
            .split(";")
            .map((option) => `"${option.trim()}"`)
            .join(", ");

          fieldCode = `${field.name}: radio buttons with options ${radioOptions}, ${validationRules}, and ${labelCode}. Use <RadioGroup> and <RadioGroupItem> with <Controller>.`;
        } else if (field.type === "checkbox") {
          fieldCode = `${field.name}: checkbox input, ${validationRules}, use <Checkbox> ${
            rhf ? "with <Controller>" : ""
          } and ${labelCode}`;
        } else if (field.type === "textarea") {
          fieldCode = `${field.name}: textarea input, ${validationRules}, use <Textarea> and ${labelCode}`;
        } else {
          fieldCode = `${field.name}: ${field.type} input, ${validationRules}, use <Input> and ${labelCode}`;
        }
      } else {
        if (field.type === "radio" && field.options) {
          const radioOptions = field.options
            .split(";")
            .map((option) => `"${option.trim()}"`)
            .join(", ");

          fieldCode = `${field.name}: radio buttons with options ${radioOptions}, ${validationRules}, ${
            rhf ? "use <Controller>" : "without Controller"
          }`;
        } else if (field.type === "checkbox") {
          fieldCode = `${field.name}: checkbox input, ${validationRules}, ${
            rhf ? "use <Controller>" : "without Controller"
          }`;
        } else if (field.type === "textarea") {
          fieldCode = `${field.name}: textarea input, ${validationRules}, use standard <textarea>`;
        } else {
          fieldCode = `${field.name}: ${field.type} input, ${validationRules}, use standard <input>`;
        }
      }

      return fieldCode;
    })
    .join("\n");

  prompt +=
    "\n\nEnsure there is spacing (using margin, gap, or padding) between labels, inputs and button. Use TailwindCSS to space out the form elements, and ensure the form has no max-width and spans the full width of its container.";
  prompt +=
    "\nCreate a component <Form> and export default <Form> at the end. Respond with the code only, without explanations.";

  return prompt;
}
