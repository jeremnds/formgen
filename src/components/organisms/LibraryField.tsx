import { LibraryFieldType } from "@/src/models/libraryField.type";
import { Checkbox } from "../atoms/shadcn/checkbox";
import { Label } from "../atoms/shadcn/label";

export default function LibraryField({
  shadcn,
  toggleShadcn,
  rhf,
  toggleRhf,
  zod,
  toggleZod,
  tsx,
  toggleTsx,
}: LibraryFieldType) {
  return (
    <div className="mt-2 flex flex-col">
      <Label className="mb-2">Options for your form</Label>
      <div className="my-2 flex gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            name="shadcn"
            checked={shadcn}
            onCheckedChange={toggleShadcn}
          />

          <Label>Shadcn</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox name="rhf" checked={rhf} onCheckedChange={toggleRhf} />

          <Label>React Hook Form</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox name="zod" checked={zod} onCheckedChange={toggleZod} />

          <Label>Zod</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox name="tsx" checked={tsx} onCheckedChange={toggleTsx} />

          <Label>TypeScript</Label>
        </div>
      </div>
    </div>
  );
}
