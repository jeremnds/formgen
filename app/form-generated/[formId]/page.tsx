import Container from "@/src/components/atoms/Container";
import SkeletonCode from "@/src/components/atoms/SkeletonCode";
import SkeletonRender from "@/src/components/atoms/SkeletonRender";
import FormCode from "@/src/components/molecules/FormCode";
import FormRender from "@/src/components/molecules/FormRender";
import { auth } from "@/src/lib/auth";
import { getFormById } from "@/src/queries/getFormById.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type FormIdProps = {
  params: {
    formId: string;
  };
};

export const metadata: Metadata = {
  title: "Form Generated",
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
        <Suspense fallback={<SkeletonRender />}>
          <FormRender liveCode={data.liveCode} />
        </Suspense>
        <Suspense fallback={<SkeletonCode />}>
          <FormCode generatedCode={data.generatedCode} />
        </Suspense>
      </div>
    </Container>
  );
}
