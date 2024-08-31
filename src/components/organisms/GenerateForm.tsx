"use client";

import { generateForm } from "@/src/actions/generateForm.action";
import useDndSensors from "@/src/hooks/useDndSensors";
import useField from "@/src/hooks/useField";
import useLibrary from "@/src/hooks/useLibrary";
import { createFormPrompt } from "@/src/lib/formHelper";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "../atoms/Container";
import Loader from "../atoms/Loader";
import AddFieldForm from "./AddFieldForm";
import FieldList from "./FieldList";

export default function GenerateForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    shadcn,
    rhf,
    zod,
    tsx,
    toggleShadcn,
    toggleRhf,
    toggleZod,
    toggleTsx,
  } = useLibrary();

  const {
    fields,
    updateField,
    handleAddField,
    handleDeleteField,
    handleUpdateField,
    handleOnDragEnd,
  } = useField();

  const sensors = useDndSensors();

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
        const formData = await generateForm(prompt);
        if (formData) {
          router.push(`/form-generated/${formData.id}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

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
              toggleShadcn={toggleShadcn}
              rhf={rhf}
              toggleRhf={toggleRhf}
              zod={zod}
              toggleZod={toggleZod}
              tsx={tsx}
              toggleTsx={toggleTsx}
              fields={fields}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
