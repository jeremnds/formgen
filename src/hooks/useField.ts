import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldType } from "../models/field.type";
import { FieldFormData } from "../models/form.type";

export default function useField() {
  const [fields, setFields] = useState<FieldType[]>([]);
  const [updateField, setUpdateField] = useState<FieldType | null>(null);

  const handleAddField = (data: FieldFormData) => {
    const newField: FieldType = {
      id: updateField?.id || uuidv4(),
      name: data.name,
      type: data.type,
      options: data.options || undefined,
      validation: data.validation
        ? {
            required: data.required || undefined,
            max: data.max || undefined,
            min: data.min || undefined,
            pattern: data.pattern || undefined,
            errorMessage: data.errorMessage || undefined,
          }
        : undefined,
    };

    if (updateField) {
      const updatedFields = fields.map((field) =>
        field.id === updateField.id ? newField : field,
      );
      setFields(updatedFields);
      setUpdateField(null);
    } else {
      setFields((prevFields) => [...prevFields, newField]);
    }
  };

  const handleDeleteField = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
  };

  const handleUpdateField = (id: string) => {
    const field = fields.find((field) => field.id === id);
    if (field) {
      setUpdateField(field);
    }
  };

  const handleOnDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFields((prevFields) => {
        const oldIndex = prevFields.findIndex(
          (field) => field.id === active.id,
        );
        const newIndex = prevFields.findIndex((field) => field.id === over.id);

        return arrayMove(prevFields, oldIndex, newIndex);
      });
    }
  };

  return {
    fields,
    updateField,
    handleAddField,
    handleDeleteField,
    handleUpdateField,
    handleOnDragEnd,
  };
}
