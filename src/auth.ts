import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const providers = [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsed = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
      if (!parsed.success) return null;
      const user = await db.user.findUnique({ where: { email: parsed.data.email } });
      if (!user || !user.password) return null;
      const valid = await bcrypt.compare(parsed.data.password, user.password);
      if (!valid) return null;
      return { id: user.id, email: user.email, name: user.name, image: user.image };
    },
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (token.email) {
        const dbUser = await db.user.upsert({
          where: { email: token.email },
          update: {
            name: token.name ?? user?.name,
            image: token.picture ?? user?.image,
          },
          create: {
            email: token.email,
            name: token.name ?? user?.name,
            image: token.picture ?? user?.image,
          },
        });
        token.id = dbUser.id;
      } else if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
