import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
  }),
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: {
        label: 'Email',
        type: 'text',
      },
      password: {
        label: 'Password',
        type: 'password',
      },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Invalid email or password');
      }
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });
      if (!user || !user?.hashedPassword) {
        throw new Error('Invalid email or password');
      }

      const isCorrectPassword = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
      );
      if (!isCorrectPassword) {
        throw new Error('Invalid email or password');
      }

      return user;
    },
  }),
];

const authOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
