import GenerateForm from "@/src/components/organisms/GenerateForm";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return <GenerateForm />;
}
