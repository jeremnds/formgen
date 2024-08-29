"use client";

import Container from "@/src/components/atoms/Container";
import { buttonVariants } from "@/src/components/atoms/shadcn/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage;

  if (error === "sign_in_error") {
    errorMessage = "An error occurred during sign in. Please try again.";
  } else {
    errorMessage = "An unknown error occurred.";
  }

  return (
    <Container className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-2 flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h1>
        <div className="mb-6 font-normal text-gray-700 dark:text-gray-400">
          {errorMessage}
        </div>
        <Link href="/" className={buttonVariants()}>
          Go home
        </Link>
      </div>
    </Container>
  );
}
