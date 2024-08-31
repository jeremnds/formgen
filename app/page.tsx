import Container from "@/src/components/atoms/Container";
import { buttonVariants } from "@/src/components/atoms/shadcn/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold text-purple-950">
        Generate Custom React Forms Instantly with AI
      </h1>
      <p className="text-zinc-700">
        Effortlessly create fully validated React forms using AI with code
        generated in JSX or TSX.
      </p>
      <Link href="/generate" className={cn(buttonVariants(), "rounded-2xl")}>
        Start Generating
      </Link>
    </Container>
  );
}
