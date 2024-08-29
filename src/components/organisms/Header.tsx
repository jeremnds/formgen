import Link from "next/link";
import Container from "../atoms/Container";

export default function Header() {
  return (
    <div className="flex min-h-12 items-center bg-purple-400">
      <Container className="flex items-center justify-between">
        <Link href="/" className="text-xl text-white">
          Form<span className="font-bold text-purple-800">Gen</span>
        </Link>
        <Link
          href="/login"
          className="rounded-sm px-2 py-1 text-white transition-colors hover:bg-white hover:text-purple-500"
        >
          Sign in
        </Link>
      </Container>
    </div>
  );
}
