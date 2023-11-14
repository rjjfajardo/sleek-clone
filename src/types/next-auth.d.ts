import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  // interface User {
  //   id: string;
  //   fullName: string;
  //   role: string;
  // }

  interface Session {
    user: {
      id: string;
      role: string;
      fullName: string;
      dob: string;
      contactNumber: string;
    } & DefaultSession["user"];
  }
}
