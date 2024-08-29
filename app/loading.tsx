import Container from "@/src/components/atoms/Container";
import Loader from "@/src/components/atoms/Loader";

export default function Loading() {
  return (
    <Container className="flex h-full items-center justify-center">
      <Loader />
    </Container>
  );
}
