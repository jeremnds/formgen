"use client";

import Container from "@/src/components/atoms/Container";
import InputForm from "@/src/components/organisms/InputForm";

export default function Page() {
  return (
    <Container className="mt-16">
      <div className="flex flex-col md:flex-row">
        <p className="order-2 md:order-1 md:basis-1/3">input generation</p>
        <div className="order-1 md:order-2 md:basis-2/3">
          <InputForm />
        </div>
      </div>
    </Container>
  );
}
