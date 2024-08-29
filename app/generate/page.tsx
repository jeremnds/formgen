"use client";

import { generateForm } from "@/src/actions/generateForm.action";
import Container from "@/src/components/atoms/Container";
import Loader from "@/src/components/atoms/Loader";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) router.push("/login");

  const [fields, setFields] = useState<FieldType[]>([]);
  const [updateField, setUpdateField] = useState<FieldType | null>(null);
  const [shadcn, setShadcn] = useState(true);
  const [rhf, setRhf] = useState(true);
  const [zod, setZod] = useState(true);
  const [tsx, setTsx] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const prompt = createFormPrompt(fields, options);
      try {
        const { id: formId } = await generateForm(prompt);
        router.push(`/form-generated/${formId}`);
      } finally {
        setIsLoading(false);
      }
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
    <>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <Container className="relative mt-16">
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
    </>
  );
}
