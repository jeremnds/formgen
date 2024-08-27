import { Field } from "@/src/models/field.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldItem from "../molecules/FieldItem";

type FieldListProps = {
  fields: Field[];
};

export default function FieldList({ fields }: FieldListProps) {
  return (
    <div className="flex min-h-72 flex-col gap-2 rounded-lg border px-8 py-6">
      {fields.map((field) => (
        <SortableField key={field.name} field={field} />
      ))}
    </div>
  );
}

function SortableField({ field }: { field: Field }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FieldItem field={field} isDragging={isDragging} />
    </div>
  );
}
