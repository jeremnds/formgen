"use client";

import Container from "@/src/components/atoms/Container";
import FieldList from "@/src/components/molecules/FieldList";
import AddFieldForm from "@/src/components/organisms/AddFieldForm";
import { Field } from "@/src/models/field.type";
import { FieldFormData } from "@/src/models/form.type";
import { useState } from "react";

export default function Page() {
  const [fields, setFields] = useState<Field[]>([]);

  const handleAddField = (data: FieldFormData) => {
    const newField: Field = {
      name: data.name,
      type: data.type,
      validation: data.validation
        ? {
            required: data.required || undefined,
            max: data.max ?? undefined,
            min: data.min ?? undefined,
            pattern: data.pattern ?? undefined,
            errorMessage: data.errorMessage ?? undefined,
          }
        : null,
    };

    setFields((prevFields) => [...prevFields, newField]);
  };

  return (
    <Container className="mt-16">
      <div className="flex flex-col md:flex-row">
        <div className="order-2 md:order-1 md:basis-1/3">
          <FieldList fields={fields} />
        </div>
        <div className="order-1 md:order-2 md:basis-2/3">
          <AddFieldForm onAddField={handleAddField} />
        </div>
      </div>
    </Container>
  );
}
