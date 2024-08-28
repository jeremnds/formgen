import { Checkbox } from "../atoms/shadcn/checkbox";
import { Label } from "../atoms/shadcn/label";

export default function LibraryField() {
  return (
    <div className="mb-2 mt-4 flex gap-4">
      <div className="flex items-center gap-2">
        <Checkbox name="shadcn" />

        <Label>Use shadcn</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox name="rhf" />

        <Label>Use React Hook Form</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox name="tsx" />

        <Label>Render in TypeScript</Label>
      </div>
    </div>
  );
}
