import { Checkbox } from "../atoms/shadcn/checkbox";
import { Label } from "../atoms/shadcn/label";

type LibraryFieldProps = {
  shadcn: boolean;
  setShadcn: () => void;
  rhf: boolean;
  setRhf: () => void;
  tsx: boolean;
  setTsx: () => void;
};

export default function LibraryField({
  shadcn,
  setShadcn,
  rhf,
  setRhf,
  tsx,
  setTsx,
}: LibraryFieldProps) {
  return (
    <div className="mt-2 flex flex-col">
      <Label className="mb-2">Options for your form</Label>
      <div className="my-2 flex gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            name="shadcn"
            checked={shadcn}
            onCheckedChange={setShadcn}
          />

          <Label>Use Shadcn</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox name="rhf" checked={rhf} onCheckedChange={setRhf} />

          <Label>Use React Hook Form</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox name="tsx" checked={tsx} onCheckedChange={setTsx} />

          <Label>Render in TypeScript</Label>
        </div>
      </div>
    </div>
  );
}
