import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/atoms/shadcn/select";
import { cn } from "@/src/lib/utils";
import { FieldFormData } from "@/src/models/form.type";
import { FieldFormSchema } from "@/src/schemas/fieldForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, buttonVariants } from "../atoms/shadcn/button";
import { Checkbox } from "../atoms/shadcn/checkbox";
import { Input } from "../atoms/shadcn/input";
import { Label } from "../atoms/shadcn/label";

type AddFieldFormProps = {
  onAddField: (data: FieldFormData) => void;
};

export default function AddFieldForm({ onAddField }: AddFieldFormProps) {
  const [validation, setValidation] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldFormData>({
    resolver: zodResolver(FieldFormSchema),
    defaultValues: {
      type: "text",
    },
  });

  const onSubmit: SubmitHandler<FieldFormData> = (data) => {
    onAddField(data);
    reset();
    setValidation(false);
  };

  return (
    <div className="rounded-lg border px-8 py-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name of your input</Label>
          <Input type="text" {...register("name")} />
          {errors.name && (
            <span className="text-sm text-red-700">{errors.name.message}</span>
          )}
        </div>
        <div>
          <Label>Type of your input</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <Controller
            name="validation"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="validation"
                checked={validation}
                onCheckedChange={(value) => {
                  setValidation((state) => !state);
                  field.onChange(value);
                }}
              />
            )}
          />
          <Label>Add validation</Label>
        </div>
        {validation && (
          <div className="mt-6 flex flex-col gap-4 rounded-lg border border-purple-300 p-6">
            <div className="flex items-center gap-2">
              <Controller
                name="required"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    onCheckedChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <Label>Required</Label>
            </div>
            <div>
              <Label>Custom error message</Label>
              <Input type="text" {...register("errorMessage")} />
            </div>
            <div>
              <Label>Max</Label>
              <Input type="number" {...register("max")} />
            </div>
            <div>
              <Label>Min</Label>
              <Input type="number" {...register("min")} />
            </div>
            <div>
              <Label>Regex pattern</Label>
              <Input type="text" {...register("pattern")} />
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
