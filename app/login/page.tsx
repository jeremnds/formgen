import { signInAction } from "@/src/actions/signIn.action";
import Container from "@/src/components/atoms/Container";
import { auth } from "@/src/lib/auth";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();
  if (session) redirect("/account");

  return (
    <Container className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 rounded-lg bg-white px-10 py-20">
        <h3 className="text-3xl text-neutral-500">
          <Link href="/" className="text-xl text-zinc-600">
            Form<span className="font-bold text-purple-800">Gen</span>
          </Link>
        </h3>
        <form action={signInAction}>
          <button className="border-primary-300 flex items-center gap-6 border px-10 py-4 text-lg font-medium">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              height="24"
              width="24"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </Container>
  );
}
