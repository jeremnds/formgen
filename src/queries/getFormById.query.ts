import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFormById = async (id: string) => {
  return await prisma.form.findUnique({
    where: { id },
  });
};
