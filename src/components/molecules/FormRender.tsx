"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { z } from "zod";
import { Button } from "../atoms/shadcn/button";
import { Checkbox } from "../atoms/shadcn/checkbox";
import { Input } from "../atoms/shadcn/input";
import { Label } from "../atoms/shadcn/label";
import { RadioGroup, RadioGroupItem } from "../atoms/shadcn/radio-group";
import { Textarea } from "../atoms/shadcn/textarea";

type FormRenderProps = {
  liveCode: string;
};

export default function FormRender({ liveCode }: FormRenderProps) {
  const scope = {
    React,
    useForm,
    Controller,
    zodResolver,
    z,
    Label,
    Input,
    Button,
    Textarea,
    Checkbox,
    RadioGroup,
    RadioGroupItem,
  };

  return (
    <div className="basis-1/2">
      <h2 className="mb-4 text-lg font-bold">Form Render</h2>
      <div className="rounded-lg bg-white px-6 py-4">
        <LiveProvider code={liveCode} scope={scope} noInline>
          <LivePreview />
          <LiveError className="mt-2 bg-red-100 text-red-800" />
        </LiveProvider>
      </div>
    </div>
  );
}
