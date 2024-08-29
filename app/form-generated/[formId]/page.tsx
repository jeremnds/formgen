import Container from "@/src/components/atoms/Container";
import FormCode from "@/src/components/molecules/FormCode";
import FormRender from "@/src/components/molecules/FormRender";
import { auth } from "@/src/lib/auth";
import { getFormById } from "@/src/queries/getFormById.query";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type FormIdProps = {
  params: {
    formId: string;
  };
};

export default async function Page({ params }: FormIdProps) {
  const formId = params.formId;
  const session = await auth();

  const data = await getFormById(formId);
  if (!data) redirect("/error?error=form_not_found");

  if (session?.user.id !== data?.userId) redirect("/error?error=access_denied");

  return (
    <Container>
      <div className="mt-6 flex h-full flex-col gap-6 md:flex-row">
        <Suspense fallback={<div>Loading form...</div>}>
          <FormRender liveCode={data.liveCode} />
        </Suspense>
        <Suspense fallback={<div>Loading code...</div>}>
          <FormCode generatedCode={data.generatedCode} />
        </Suspense>
      </div>
    </Container>
  );
}
