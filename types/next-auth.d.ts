// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
      jwtToken?: string;
      role?: string; // ✅ Add this
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
  }

  interface JWT {
    uid?: string;
    jwtToken?: string;
    role?: string;
  }
}
