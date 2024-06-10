import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prismadb from "../libs/prismadb";
import bcrypt from 'bcryptjs';

const isOIDC = (account: any): boolean => {
  return account?.provider === 'google' || account?.provider === 'github';
}

const createOIDCUser = async (profile: any, account: any) => {
  let user = await prismadb.user.findUnique({
    where: {
      email: profile.email,
    },
  });

  if (!user) {
    user = await prismadb.user.create({
      data: {
        name: profile.name || profile.email.split('@')[0],
        email: profile.email,
        hashedPassword: null,
      },
    });
  }

  // Create or update the account
  await prismadb.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      },
    },
    update: {
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      expires_at: account.expires_at,
      id_token: account.id_token,
    },
    create: {
      userId: user.id,
      type: account.type,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      expires_at: account.expires_at,
      id_token: account.id_token,
    },
  });
}

const authorizeCredentials = async (email: string, password: string) => {
  const user = await prismadb.user.findUnique({
    where: { email },
  });

  if (user?.hashedPassword) {
    const doesPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (doesPasswordMatch) {
      return user;
    }
  }
  return null;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password');
        }

        const user = await authorizeCredentials(credentials.email, credentials.password);
        if (!user) {
          throw new Error('Invalid email or password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user, account, profile }) {
      let isSignInAllowed = true;

      if (isOIDC(account)) {
        if (profile?.email) {
          await createOIDCUser(profile, account);
        } else {
          isSignInAllowed = false;
        }
      }

      return isSignInAllowed;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};



