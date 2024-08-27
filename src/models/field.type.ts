export type Field = {
  name: string;
  type: string;
  validation: {
    required?: boolean;
    max?: number;
    min?: number;
    pattern?: string;
    errorMessage?: string;
  } | null;
};
