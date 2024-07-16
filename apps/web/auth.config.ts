/* eslint-disable turbo/no-undeclared-env-vars */
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import credentials from "next-auth/providers/credentials";
import { loginFormSchema } from "./schemas/FormSchemas";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await compare(password, user.password);

          if (!passwordMatch) return null;

          return user;
        }

        return null;
      },
    }),
  ],
};

export default authConfig satisfies NextAuthConfig;
