import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/atoms/shadcn/select";
import { cn } from "@/src/lib/utils";
import { FieldType } from "@/src/models/field.type";
import { FieldFormData } from "@/src/models/form.type";
import { LibraryFieldType } from "@/src/models/libraryField.type";
import { FieldFormSchema } from "@/src/schemas/fieldForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../atoms/shadcn/button";
import { Checkbox } from "../atoms/shadcn/checkbox";
import { Input } from "../atoms/shadcn/input";
import { Label } from "../atoms/shadcn/label";
import LibraryField from "./LibraryField";

type AddFieldFormProps = {
  onAddField: (data: FieldFormData) => void;
  updateField?: FieldType | null;
  onGenerateForm: () => void;
  fields: FieldType[];
} & LibraryFieldType;

export default function AddFieldForm({
  onAddField,
  updateField,
  onGenerateForm,
  shadcn,
  toggleShadcn,
  rhf,
  toggleRhf,
  zod,
  toggleZod,
  tsx,
  toggleTsx,
  fields,
}: AddFieldFormProps) {
  const [validation, setValidation] = useState(false);
  const [type, setType] = useState("text");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldFormData>({
    resolver: zodResolver(FieldFormSchema),
    defaultValues: {
      name: "",
      type: "text",
      options: "",
      validation: false,
      required: false,
      errorMessage: "",
      max: undefined,
      min: undefined,
      pattern: "",
    },
  });

  useEffect(() => {
    if (updateField) {
      reset({
        name: updateField.name,
        type: updateField.type,
        options: updateField.options || "",
        validation: !!updateField.validation,
        required: updateField.validation?.required || false,
        max: updateField.validation?.max || undefined,
        min: updateField.validation?.min || undefined,
        pattern: updateField.validation?.pattern || "",
        errorMessage: updateField.validation?.errorMessage || "",
      });
      setValidation(!!updateField.validation);
      setType(updateField.type);
    }
  }, [updateField, reset]);

  const onSubmit: SubmitHandler<FieldFormData> = (data) => {
    onAddField(data);
    reset({
      name: "",
      type: "text",
      options: "",
      validation: false,
      required: false,
      errorMessage: "",
      max: undefined,
      min: undefined,
      pattern: "",
    });
    setValidation(false);
    setType("text");
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setType(value);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {type === "radio" && (
          <div className="flex flex-col gap-2">
            <Label>Options (separate with ; )</Label>
            <Input
              type="text"
              {...register("options")}
              placeholder="Enter options separated by ;"
            />
            {errors.options && (
              <span className="text-sm text-red-700">
                {errors.options.message}
              </span>
            )}
          </div>
        )}

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
          <div
            className={cn(
              "flex flex-col gap-4 overflow-hidden rounded-lg border border-purple-300 p-6 transition-[max-height] duration-500 ease-in-out",
              validation ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
            )}
          >
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
              <Label>Min</Label>
              <Input type="number" {...register("min")} min={1} />
            </div>
            <div>
              <Label>Max</Label>
              <Input type="number" {...register("max")} min={1} />
            </div>

            <div>
              <Label>Regex pattern</Label>
              <Input type="text" {...register("pattern")} />
            </div>
          </div>
        )}
        <LibraryField
          shadcn={shadcn}
          toggleShadcn={toggleShadcn}
          rhf={rhf}
          toggleRhf={toggleRhf}
          zod={zod}
          toggleZod={toggleZod}
          tsx={tsx}
          toggleTsx={toggleTsx}
        />
        <div className="flex items-center justify-between">
          <Button type="submit" className={cn(updateField && "bg-purple-500")}>
            {updateField ? "Edit Field" : "Add Field"}
          </Button>
          <Button
            type="button"
            className="rounded-lg"
            onClick={onGenerateForm}
            disabled={!fields.length ? true : false}
          >
            Generate Form
          </Button>
        </div>
      </form>
    </div>
  );
}
