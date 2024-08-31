import Header from "@/src/components/organisms/Header";
import { auth } from "@/src/lib/auth";
import { cn } from "@/src/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FormGen",
  description:
    "Generate custom React forms with ease using FormGen. Powered by AI, instantly create forms with React Hook Form, ShadCN, and Zod, complete with validation and generated JSX/TSX code for developers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn(inter.className, "font-sans antialiased")}>
        <main className="flex h-screen flex-col">
          <SessionProvider session={session}>
            <Header />
            <div className="flex-1 flex-grow bg-purple-50">{children}</div>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
