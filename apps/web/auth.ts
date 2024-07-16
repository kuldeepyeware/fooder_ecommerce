import NextAuth, { type NextAuthConfig } from "next-auth";
import prisma from "@repo/db/client";
import authConfig from "./auth.config";
import customPrismaAdapter from "./customPrismaAdapter";
import { getUserById } from "./data/user";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  firstName?: string;
  lastName?: string;
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/account/login",
    error: "/account/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      }
      return token;
    },
  },
  adapter: customPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
};

const nextAuthResult = NextAuth(authOptions);
export const auth: typeof nextAuthResult.auth = nextAuthResult.auth;
export const signIn: typeof nextAuthResult.signIn = nextAuthResult.signIn;
export const { handlers, signOut } = nextAuthResult;
