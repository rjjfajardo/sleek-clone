import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { prisma } from "@/prisma/prisma";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            userId: true,
            fullName: true,
            email: true,
            password: true,
            dob: true,
            contactNumber: true,
            role: true,
            verificationStatus: true,
            createdAt: true,
            account: true,
            session: true,
            projectAssignee: true,
          },
        });

        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return { ...user, id: user.userId };
      },
    }),
  ],
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
