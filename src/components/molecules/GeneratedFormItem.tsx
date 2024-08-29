import { Form } from "@prisma/client";
import Link from "next/link";

type GeneratedFormItemProps = {
  form: Form;
  index: number;
};

export default function GeneratedFormItem({
  form,
  index,
}: GeneratedFormItemProps) {
  return (
    <div className="bg-red-400 p-4">
      <Link href={`/form-generated/${form.id}`}>
        <h3>Form #{index}</h3>
      </Link>
    </div>
  );
}
