import { Field } from "@/src/models/field.type";

type FieldListProps = {
  fields: Field[] | [];
};

export default function FieldList({ fields }: FieldListProps) {
  return <div>{fields.map((field) => field.name)}</div>;
}
