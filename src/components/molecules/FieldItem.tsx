import { cn } from "@/src/lib/utils";
import { Field } from "@/src/models/field.type";
import { Grip, Pencil, Trash2 } from "lucide-react";
import { Button } from "../atoms/shadcn/button";

type FieldItemProps = {
  field: Field;
  isDragging: boolean;
  onUpdateField: (id: string) => void;
  onDeleteField: (id: string) => void;
};

export default function FieldItem({
  field,
  isDragging,
  onUpdateField,
  onDeleteField,
}: FieldItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2",
        isDragging ? "bg-purple-300" : "bg-zinc-200",
      )}
    >
      <Grip className="mr-4 h-5 w-5" />
      <div className="mr-auto flex flex-col">
        <p className="text-sm">{field.name}</p>
        <span className="text-xs capitalize text-zinc-500">{field.type}</span>
      </div>
      <div className="space-x-1">
        <Button
          variant="outline"
          className="h-8 p-2"
          onClick={() => onUpdateField(field.id)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          className="h-8 p-2"
          onClick={() => onDeleteField(field.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
