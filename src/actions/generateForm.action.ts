"use server";

import OpenAI from "openai";
import { auth } from "../lib/auth";
import { createForm } from "../queries/createForm.query";

export async function generateForm(prompt: string, userId: number) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenAI API Key");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    let generatedCode = response.choices[0].message?.content || "";

    generatedCode = generatedCode
      .replace(/```(?:tsx|jsx)?\n?/g, "")
      .replace(/```/g, "");

    let liveCode = generatedCode
      .replace(/import\s+.*?;/g, "")
      .replace(/export\s+default\s+Form\s*;/g, "render(<Form />);");

    return {
      generatedCode,
      liveCode,
    };
  } catch (error) {
    console.error("Error generating form:", error);
    throw new Error("Cannot generate form");
  }
}

export async function generateStaticForm() {
  try {
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

    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const formData = await createForm(generatedCode, liveCode, session.user.id);
    console.log(formData);
    return formData;
  } catch (error) {
    console.error("Error generating form:", error);
    throw new Error("Cannot generate form");
  }
}
