"use server";

import OpenAI from "openai";

export async function generateForm(prompt: string) {
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

    generatedCode = generatedCode.replace(/```(?:tsx|jsx)?\n?/g, "");
    generatedCode = generatedCode.replace(/```/g, "");

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
