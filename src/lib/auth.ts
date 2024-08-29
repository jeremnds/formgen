import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createUser } from "../queries/createUser.query";
import { getUserByEmail } from "../queries/getUserByEmail.query";

const authConfig: NextAuthConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        if (user.email && user.name) {
          const existingUser = await getUserByEmail(user.email);

          if (!existingUser)
            await createUser({ email: user.email, name: user.name });

          return true;
        }
        return false;
      } catch (error) {
        console.error("Error during signIn:", error);
        return "/error?error=sign_in_error";
      }
    },
    async session({ session }: { session: Session }) {
      if (session.user?.email) {
        const user = await getUserByEmail(session.user.email);
        if (user && session.user) {
          session.user.id = user.id;
          session.user.role = user.role;
        }
      }
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
