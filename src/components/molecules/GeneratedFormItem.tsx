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
    <Link href={`/form-generated/${form.id}`}>
      <div className="rounded-xl bg-purple-300 p-4 text-zinc-800 transition-colors duration-300 hover:bg-purple-400">
        <h3 className="text-purple-950">Form #{index}</h3>
      </div>
    </Link>
  );
}
