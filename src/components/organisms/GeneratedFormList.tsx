import { Form } from "@prisma/client";
import GeneratedFormItem from "../molecules/GeneratedFormItem";

type GeneratedFormListProps = {
  forms: Form[];
};

export default function GeneratedFormList({ forms }: GeneratedFormListProps) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
      {forms.map((form, index) => (
        <GeneratedFormItem key={form.id} form={form} index={index + 1} />
      ))}
    </div>
  );
}
