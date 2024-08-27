import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/atoms/shadcn/select";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "../atoms/shadcn/button";
import { Checkbox } from "../atoms/shadcn/checkbox";
import { Input } from "../atoms/shadcn/input";
import { Label } from "../atoms/shadcn/label";

export default function InputForm() {
  const [validation, setValidation] = useState(false);

  return (
    <div className="rounded-lg border px-8 py-6">
      <form className="flex flex-col gap-4">
        <div>
          <Label>Name of your input</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Type of your input</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="required"
            checked={validation}
            onCheckedChange={() => setValidation((state) => !state)}
          />{" "}
          <Label>Add validation</Label>
        </div>
        {validation && (
          <div className="mt-6 flex flex-col gap-4 rounded-lg border border-purple-300 p-6">
            <div className="flex items-center gap-2">
              <Checkbox /> <Label>Required</Label>
            </div>
            <div>
              <Label>Custom error message</Label>
              <Input type="text" />
            </div>
            <div>
              <Label>Max</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Min</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Regex pattern</Label>
              <Input type="text" />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Button>Add Field</Button>
          <Link href="/" className={cn(buttonVariants(), "mt-4 rounded-lg")}>
            Generate form
          </Link>
        </div>
      </form>
    </div>
  );
}
