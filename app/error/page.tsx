"use client";

import Container from "@/src/components/atoms/Container";
import { buttonVariants } from "@/src/components/atoms/shadcn/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage;
  switch (error) {
    case "sign_in_error":
      errorMessage = "An error occurred during sign in. Please try again.";
      break;
    case "form_not_found":
      errorMessage = "The requested form could not be found.";
      break;
    case "access_denied":
      errorMessage = "Access denied. You do not have the required permissions.";
      break;
    case "cannot_generate_form":
      errorMessage =
        "There was an error generating the form. Please try again.";
      break;
    default:
      errorMessage = "An unknown error occurred.";
      break;
  }

  return (
    <Container className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="flex flex-row items-center justify-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
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
