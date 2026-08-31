import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role,
        };
      },
    }),
    Credentials({
      id: "applicant",
      credentials: {
        username: { label: "Minecraft Username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username) return null;
        const username = credentials.username as string;

        let user = await db.user.findUnique({
          where: { username },
        });

        if (!user) {
          // Create dummy user for applicant
          user = await db.user.create({
            data: {
              username,
              email: `${username.toLowerCase()}@applicant.klaatzoo.net`,
              passwordHash: await bcrypt.hash(Math.random().toString(36), 10),
              role: "APPLICANT",
            },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
});
