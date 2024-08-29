import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/atoms/shadcn/card";
import { Form } from "@prisma/client";
import { Progress } from "../atoms/shadcn/progress";

type ProgressCardProps = {
  forms: Form[];
};

export default function ProgressCard({ forms }: ProgressCardProps) {
  const numForms = forms.length;
  const maxForms = Number(process.env.MAX_GENERATION);

  let progressValue = 0;

  if (maxForms > 0) {
    progressValue = (numForms / maxForms) * 100;
  }

  return (
    <Card className="w-full max-w-72 text-center">
      <CardHeader>Form Generation Quota</CardHeader>
      <CardContent className="pb-4">
        <Progress value={progressValue} />
      </CardContent>
      <CardFooter className="text-center text-sm">
        {numForms === maxForms
          ? "No more forms can be generated"
          : `${numForms} out of ${maxForms} forms available`}
      </CardFooter>
    </Card>
  );
}
