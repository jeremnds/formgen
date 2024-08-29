import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }
}
