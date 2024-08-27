import Header from "@/src/components/organisms/Header";
import { cn } from "@/src/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FormGen",
  description:
    "Generate custom React forms with ease using FormGen. Powered by AI, instantly create forms with React Hook Form, ShadCN, and Zod, complete with validation and generated JSX/TSX code for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "font-sans antialiased")}>
        <main className="flex h-screen flex-col">
          <Header />
          <div className="flex-1 flex-grow bg-purple-50">{children}</div>
        </main>
      </body>
    </html>
  );
}
