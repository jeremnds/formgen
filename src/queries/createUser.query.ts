import { User } from "@prisma/client";
import prisma from "../lib/db";

export const createUser = async (
  userData: Omit<User, "createdAt" | "updatedAt" | "id" | "role">,
) => {
  try {
    await prisma.user.create({
      data: userData,
    });
  } catch (error: any) {
    console.error("Detailed error:", error);
    throw new Error("Error creating user");
  }
};
