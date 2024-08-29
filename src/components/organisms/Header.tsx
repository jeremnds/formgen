import { signOutAction } from "@/src/actions/signOut.action";
import { auth } from "@/src/lib/auth";
import Link from "next/link";
import Container from "../atoms/Container";

export default async function Header() {
  const session = await auth();
  return (
    <div className="flex min-h-12 items-center bg-purple-400">
      <Container className="flex items-center justify-between">
        <Link href="/" className="text-xl text-white">
          Form<span className="font-bold text-purple-800">Gen</span>
        </Link>
        {!session ? (
          <Link
            href="/login"
            className="rounded-sm px-2 py-1 text-white transition-colors hover:bg-white hover:text-purple-500"
          >
            Sign in
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/account"
              className="rounded-sm px-2 py-1 text-white transition-colors hover:bg-white hover:text-purple-500"
            >
              Account
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-sm px-2 py-1 text-white transition-colors hover:bg-purple-600"
              >
                Sign out
              </button>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}
