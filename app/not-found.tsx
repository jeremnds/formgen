import Container from "@/src/components/atoms/Container";
import { buttonVariants } from "@/src/components/atoms/shadcn/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="flex flex-row items-center justify-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          404: Not Found
        </h1>
        <div className="mb-6 font-normal text-gray-700 dark:text-gray-400">
          Could not find requested resource
        </div>
        <Link href="/" className={buttonVariants()}>
          Go home
        </Link>
      </div>
    </Container>
  );
}
