import { Field } from "@/src/models/field.type";
import FieldItem from "../molecules/FieldItem";

type FieldListProps = {
  fields: Field[] | [];
};

export default function FieldList({ fields }: FieldListProps) {
  return (
    <div className="min-h-72 rounded-lg border px-8 py-6">
      {fields.map((field, index) => (
        <FieldItem key={index} field={field} />
      ))}
    </div>
  );
}
