import type { NextAuthConfig } from "next-auth";

/**
 * Lightweight auth config for Edge middleware.
 * No database imports — this runs in the Edge Runtime.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Providers are added in auth.ts (server-only)
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.username;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Admin routes: require MODERATOR or ADMIN
      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        const role = auth?.user?.role;
        return role === "MODERATOR" || role === "ADMIN";
      }

      // Dashboard: require any authenticated user
      if (pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }

      // Public routes: always allowed
      return true;
    },
  },
} satisfies NextAuthConfig;
