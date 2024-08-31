import prisma from "../lib/db";

export const getFormById = async (id: string) => {
  return await prisma.form.findUnique({
    where: { id },
  });
};
