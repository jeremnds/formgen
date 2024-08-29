import Container from "@/src/components/atoms/Container";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  return <Container>account</Container>;
}
