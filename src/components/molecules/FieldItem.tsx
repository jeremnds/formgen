import { Field } from "@/src/models/field.type";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../atoms/shadcn/button";

type FieldItemProps = {
  field: Field;
};

export default function FieldItem({ field }: FieldItemProps) {
  return (
    <div className="mb-2 flex items-center justify-between border bg-purple-200 pl-4">
      <p>{field.name}</p>
      <div>
        <Button variant="outline" className="px-2 py-0">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
