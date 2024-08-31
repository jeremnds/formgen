import prisma from "../lib/db";

export const createForm = async (
  generatedCode: string,
  liveCode: string,
  userId: number,
) => {
  try {
    const data = await prisma.form.create({
      data: {
        generatedCode,
        liveCode,
        userId: userId,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Detailed error:", error);
    throw new Error("Error creating user");
  }
};
