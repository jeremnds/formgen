"use server";

import { encodingForModel } from "js-tiktoken";
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

  const encoder = encodingForModel("gpt-4o-2024-08-06");
  const promptTokens = encoder.encode(prompt).length;
  const maxCompletionTokens = 1000;

  const maxAllowedTokens = 1500;

  if (promptTokens + maxCompletionTokens > maxAllowedTokens) {
    redirect("/error?error=token_limit_exceeded");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxCompletionTokens,
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
  } catch (error: any) {
    console.error("Error generating form:", error);

    redirect("/error?error=cannot_generate_form");
  }
}
