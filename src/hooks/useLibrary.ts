"use client";
import { useState } from "react";

export default function useLibrary() {
  const [shadcn, setShadcn] = useState(true);
  const [rhf, setRhf] = useState(true);
  const [zod, setZod] = useState(true);
  const [tsx, setTsx] = useState(true);

  const toggleShadcn = () => setShadcn((prev) => !prev);
  const toggleRhf = () => setRhf((prev) => !prev);
  const toggleZod = () => setZod((prev) => !prev);
  const toggleTsx = () => setTsx((prev) => !prev);

  return {
    shadcn,
    rhf,
    zod,
    tsx,
    toggleShadcn,
    toggleRhf,
    toggleZod,
    toggleTsx,
  };
}
