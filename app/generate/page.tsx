import GenerateForm from "@/src/components/organisms/GenerateForm";
import { auth } from "@/src/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Generate a form",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return <GenerateForm />;
}
