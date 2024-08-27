import Link from "next/link";
import Container from "../atoms/Container";

export default function Header() {
  return (
    <div className="flex h-16 items-center bg-purple-400">
      <Container>
        <Link href="/" className="text-xl text-white">
          Form<span className="font-bold text-purple-800">Gen</span>
        </Link>
      </Container>
    </div>
  );
}
