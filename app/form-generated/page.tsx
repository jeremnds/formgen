"use client";

import Container from "@/src/components/atoms/Container";
import { Button } from "@/src/components/atoms/shadcn/button";
import { Checkbox } from "@/src/components/atoms/shadcn/checkbox";
import { Input } from "@/src/components/atoms/shadcn/input";
import { Label } from "@/src/components/atoms/shadcn/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/src/components/atoms/shadcn/radio-group";
import { Textarea } from "@/src/components/atoms/shadcn/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { themes } from "prism-react-renderer";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { z } from "zod";

export default function Page() {
  const [copied, setCopied] = useState(false);

  const generatedCode = `
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div>
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          {...register('name')}
          className="w-full border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block mb-2">Phone Number:</label>
        <input
          type="text"
          {...register('phoneNumber', { required: "Phone Number is required" })}
          className="w-full border border-gray-300 p-2"
        />
        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
      </div>

      <div>
        <label className="block mb-2">Email:</label>
        <input
          type="text"
          {...register('email')}
          className="w-full border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block mb-2">Hobbies:</label>
        <Controller
          name="hobbies"
          control={control}
          rules={{ required: "Hobbies is required" }}
          render={({ field }) => (
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="eat"
                  {...field}
                />
                Eat
              </label>
              <label>
                <input
                  type="radio"
                  value="sleep"
                  {...field}
                />
                Sleep
              </label>
              <label>
                <input
                  type="radio"
                  value="repeat"
                  {...field}
                />
                Repeat
              </label>
            </div>
          )}
        />
        {errors.hobbies && <span className="text-red-500">{errors.hobbies.message}</span>}
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default Form;
  `;

  const liveCode = `


  const Form = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
  
    const onSubmit = (data: any) => {
      console.log(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border border-gray-300 p-2"
          />
        </div>
  
        <div>
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            {...register('phoneNumber', { required: "Phone Number is required" })}
            className="w-full border border-gray-300 p-2"
          />
          {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
        </div>
  
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="text"
            {...register('email')}
            className="w-full border border-gray-300 p-2"
          />
        </div>
  
        <div>
          <label className="block mb-2">Hobbies:</label>
          <Controller
            name="hobbies"
            control={control}
            rules={{ required: "Hobbies is required" }}
            render={({ field }) => (
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    value="eat"
                    {...field}
                  />
                  Eat
                </label>
                <label>
                  <input
                    type="radio"
                    value="sleep"
                    {...field}
                  />
                  Sleep
                </label>
                <label>
                  <input
                    type="radio"
                    value="repeat"
                    {...field}
                  />
                  Repeat
                </label>
              </div>
            )}
          />
          {errors.hobbies && <span className="text-red-500">{errors.hobbies.message}</span>}
        </div>
  
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    );
  };
  
  render(<Form />);
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <Container>
      <div className="mt-6 flex h-full flex-col gap-6 md:flex-row">
        <div className="basis-1/2">
          <h2 className="mb-4 text-lg font-bold">Form Render</h2>
          <div className="rounded-lg bg-white px-6 py-4">
            <LiveProvider code={liveCode} scope={scope} noInline>
              <LivePreview />
              <LiveError className="mt-2 bg-red-100 text-red-800" />
            </LiveProvider>
          </div>
        </div>

        <div className="basis-1/2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Form Code</h2>
            <Button onClick={handleCopy} className="rounded-full" type="button">
              {copied ? "Copied!" : "Copy Code"}
            </Button>
          </div>
          <div className="max-h-96 overflow-y-auto overflow-x-hidden">
            <LiveProvider code={generatedCode} theme={themes.duotoneDark}>
              <LiveEditor disabled />
            </LiveProvider>
          </div>
        </div>
      </div>
    </Container>
  );
}
