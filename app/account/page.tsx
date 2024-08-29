import Container from "@/src/components/atoms/Container";
import ProgressCard from "@/src/components/molecules/ProgressCard";
import GeneratedFormList from "@/src/components/organisms/GeneratedFormList";
import { auth } from "@/src/lib/auth";
import { getFormsByUserId } from "@/src/queries/getFormsById.query";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/");
  const name = session.user.name.split(" ")[0];

  const forms = await getFormsByUserId(session.user.id);

  console.log("length", forms.length);
  return (
    <Container className="flex h-full flex-col gap-20">
      <div className="flex flex-col items-center gap-16 pt-10">
        <h1 className="text-zinc-800">
          Hello <span className="font-semibold text-purple-800"> {name}</span>
        </h1>
        <GeneratedFormList forms={forms} />
      </div>
      {session.user.role === "user" && (
        <div className="flex w-full flex-1 flex-grow items-start md:items-center">
          <ProgressCard forms={forms} />
        </div>
      )}
    </Container>
  );
}
