"use client";

import Container from "@/src/components/atoms/Container";
import AddFieldForm from "@/src/components/organisms/AddFieldForm";
import FieldList from "@/src/components/organisms/FieldList";
import { createFormPrompt } from "@/src/lib/utils";
import { FieldType } from "@/src/models/field.type";
import { FieldFormData } from "@/src/models/form.type";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [fields, setFields] = useState<FieldType[]>([]);
  const [updateField, setUpdateField] = useState<FieldType | null>(null);
  const [shadcn, setShadcn] = useState(true);
  const [rhf, setRhf] = useState(true);
  const [zod, setZod] = useState(true);
  const [tsx, setTsx] = useState(true);

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

  const handleGenerateForm = async () => {
    const options = {
      shadcn,
      rhf,
      zod,
      tsx,
    };

    if (fields.length) {
      const prompt = createFormPrompt(fields, options);
      console.log(prompt);
      // const { generatedCode, liveCode } = await generateForm(prompt);
      // console.log("generated:", generatedCode);
      // console.log("live code:", liveCode);
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

  // To enable onClick events on buttons
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor,
  );

  return (
    <Container className="mt-16">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="order-2 md:order-1 md:basis-1/3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleOnDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <FieldList
                fields={fields}
                onDeleteField={handleDeleteField}
                onUpdateField={handleUpdateField}
              />
            </SortableContext>
          </DndContext>
        </div>
        <div className="order-1 md:order-2 md:basis-2/3">
          <AddFieldForm
            onAddField={handleAddField}
            updateField={updateField}
            onGenerateForm={handleGenerateForm}
            shadcn={shadcn}
            toggleShadcn={() => setShadcn((prev) => !prev)}
            rhf={rhf}
            toggleRhf={() => setRhf((prev) => !prev)}
            zod={zod}
            toggleZod={() => setZod((prev) => !prev)}
            tsx={tsx}
            toggleTsx={() => setTsx((prev) => !prev)}
          />
        </div>
      </div>
    </Container>
  );
}
