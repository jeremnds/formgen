"use server";

import { redirect } from "next/navigation";
import OpenAI from "openai";
import { auth } from "../lib/auth";
import { createForm } from "../queries/createForm.query";
import { getFormsByUserId } from "../queries/getFormsById.query";

export async function generateForm(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenAI API Key");
  }

  const session = await auth();
  if (!session) {
    redirect("/error?error=access_denied");
  }

  const maxForms = Number(process.env.MAX_GENERATION);
  if (!maxForms) {
    throw new Error("Missing MAX_GENERATION in .env");
  }

  const forms = await getFormsByUserId(session.user.id);
  if (session.user.role === "user" && forms.length === maxForms) {
    redirect("/error?error=forms_limit_reached");
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

    const formData = await createForm(generatedCode, liveCode, session.user.id);

    return formData;
  } catch (error) {
    console.error("Error generating form:", error);
    redirect("/error?error=cannot_generate_form");
  }
}
