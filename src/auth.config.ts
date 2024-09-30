import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schema";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
