import { Field } from "@/src/models/field.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldItem from "../molecules/FieldItem";

type FieldListProps = {
  fields: Field[];
  onUpdateField: () => void;
  onDeleteField: (id: string) => void;
};

export default function FieldList({
  fields,
  onUpdateField,
  onDeleteField,
}: FieldListProps) {
  return (
    <div className="flex h-fit flex-col gap-2 rounded-lg border px-8 py-6">
      {fields.length ? (
        fields.map((field) => (
          <SortableField
            key={field.id}
            field={field}
            onDeleteField={onDeleteField}
            onUpdateField={onUpdateField}
          />
        ))
      ) : (
        <p className="text-center font-semibold text-purple-600">
          Start to add your fields!
        </p>
      )}
    </div>
  );
}

type SortableFieldProps = {
  field: Field;
  onUpdateField: () => void;
  onDeleteField: (id: string) => void;
};

function SortableField({
  field,
  onDeleteField,
  onUpdateField,
}: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FieldItem
        field={field}
        isDragging={isDragging}
        onDeleteField={onDeleteField}
        onUpdateField={onUpdateField}
      />
    </div>
  );
}
