import prisma from "../lib/db";

export const getFormsByUserId = async (userId: number) => {
  return await prisma.form.findMany({
    where: { userId },
  });
};
