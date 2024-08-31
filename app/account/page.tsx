import Container from "@/src/components/atoms/Container";
import { buttonVariants } from "@/src/components/atoms/shadcn/button";
import ProgressCard from "@/src/components/molecules/ProgressCard";
import GeneratedFormList from "@/src/components/organisms/GeneratedFormList";
import { auth } from "@/src/lib/auth";
import { cn } from "@/src/lib/utils";
import { getFormsByUserId } from "@/src/queries/getFormsById.query";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");
  const name = session.user.name.split(" ")[0];
  const maxForms = Number(process.env.MAX_GENERATION);
  const forms = await getFormsByUserId(session.user.id);

  return (
    <Container className="flex h-full flex-col gap-24 md:gap-48">
      <div className="flex flex-col items-center gap-16 pt-10">
        <h1 className="text-xl text-zinc-800">
          Hello <span className="font-semibold text-purple-800"> {name}</span>
        </h1>
        {forms.length ? (
          <GeneratedFormList forms={forms} />
        ) : (
          <div className="flex min-h-96 flex-col justify-center gap-4">
            <p className="text-md">Ready to generate your first form?</p>
            <div className="text-center">
              <Link href="/generate" className={cn(buttonVariants(), "")}>
                Start Now!
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="grid max-h-56 w-full grid-rows-1 gap-8 md:grid-cols-3 md:flex-row md:items-center">
        {forms.length > 0 && session.user.role === "user" && (
          <div className="flex justify-center md:justify-normal">
            <ProgressCard forms={forms} />
          </div>
        )}
        {forms.length < maxForms && (
          <div className="flex justify-center">
            <Link
              href="/generate"
              className={cn(buttonVariants(), "rounded-full")}
            >
              Generate a new form
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
