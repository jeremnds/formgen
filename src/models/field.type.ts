export type FieldType = {
  id: string;
  name: string;
  type: string;
  options?: string;
  validation:
    | {
        required?: boolean;
        max?: number;
        min?: number;
        pattern?: string;
        errorMessage?: string;
      }
    | undefined;
};
