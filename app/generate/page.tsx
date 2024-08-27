"use client";

import Container from "@/src/components/atoms/Container";
import AddFieldForm from "@/src/components/organisms/AddFieldForm";
import FieldList from "@/src/components/organisms/FieldList";
import { Field } from "@/src/models/field.type";
import { FieldFormData } from "@/src/models/form.type";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export default function Page() {
  const [fields, setFields] = useState<Field[]>([]);

  const handleAddField = (data: FieldFormData) => {
    const newField: Field = {
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
    setFields((prevFields) => [...prevFields, newField]);
  };

  const handleOnDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFields((prevFields) => {
        const oldIndex = prevFields.findIndex(
          (field) => field.name === active.id,
        );
        const newIndex = prevFields.findIndex(
          (field) => field.name === over.id,
        );

        return arrayMove(prevFields, oldIndex, newIndex);
      });
    }
  };

  return (
    <Container className="mt-16">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="order-2 md:order-1 md:basis-1/3">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleOnDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <SortableContext
              items={fields.map((field) => field.name)}
              strategy={verticalListSortingStrategy}
            >
              <FieldList fields={fields} />
            </SortableContext>
          </DndContext>
        </div>
        <div className="order-1 md:order-2 md:basis-2/3">
          <AddFieldForm onAddField={handleAddField} />
        </div>
      </div>
    </Container>
  );
}
