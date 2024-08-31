import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldType } from "../models/field.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

