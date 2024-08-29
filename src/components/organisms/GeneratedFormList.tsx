import { Form } from "@prisma/client";
import GeneratedFormItem from "../molecules/GeneratedFormItem";

type GeneratedFormListProps = {
  forms: Form[];
};

export default function GeneratedFormList({ forms }: GeneratedFormListProps) {
  return (
    <div className="grid w-full grid-rows-1 gap-4 md:grid-cols-3">
      {forms.map((form, index) => (
        <GeneratedFormItem key={form.id} form={form} index={index + 1} />
      ))}
    </div>
  );
}
