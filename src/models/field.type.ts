export type Field = {
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
  // lib: {
  //   shadcn: boolean;
  //   rhf: boolean;
  //   tsx: boolean;
  // };
};
