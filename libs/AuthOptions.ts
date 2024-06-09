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



// import { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github"
// import prismadb from "../libs/prismadb"
// import bcrypt from 'bcryptjs'


// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string
//     }),
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid email or password')
//         }
//         const user = await prismadb.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         })
//         if (!user || !user.hashedPassword) {
//           throw new Error('Invalid email or password')
//         }

//         const currentHashedPassword = await bcrypt.hash(credentials.password, 12);

//         bcrypt.compare(currentHashedPassword, user.hashedPassword);


//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       return session;
//     },

//     async signIn(params) {
//       const user = await authorize(params);
//       console.log(user); // Optionally log the created user
//       return !!user; // Return true 
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt"
//   },


//   debug: process.env.NODE_ENV !== "production",

// }

// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import bcrypt from 'bcryptjs';
// import prisma from "../libs/prismadb";
// import { User, Account, Profile } from 'next-auth';

// const isOIDC = (account: Account | null): boolean => {
//   return account?.provider === 'google' || account?.provider === 'github';
// };

// const createOIDCUser = async (profile: Profile) => {
//   if (profile.email) {
//     const user = await prisma.user.findUnique({ where: { email: profile.email } });
//     if (!user) {
//       await prisma.user.create({
//         data: {
//           name: profile.name || profile.email.split('@')[0] as string,
//           email: profile.email,
//           hashedPassword: null,
//         },
//       });
//     }
//   }
// };

// const isAccountVerified = (account: Account | null, profile?: Profile): boolean => {
//   return account?.provider !== 'google' || !!profile?.email;
// };

// export const authorizeCredentials = async (email: string, password: string): Promise<User | null> => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user?.hashedPassword) return null;

//   const doesPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
//   return doesPasswordMatch ? user : null;
// };

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid email or password');
//         }
//         return authorizeCredentials(credentials.email, credentials.password);
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       let isSignInAllowed = true;
//       if (isOIDC(account)) {
//         if (!isAccountVerified(account, profile) || !profile?.email) {
//           isSignInAllowed = false;
//         } else {
//           await createOIDCUser(profile);
//         }
//       }
//       return isSignInAllowed;
//     },
//     async session({ session, token }: any) {
//       if (token && token.sub) {
//         const user = await prisma.user.findUnique({
//           where: { id: token.sub as string },
//           select: { id: true, name: true, email: true, image: true },
//         });
//         session.user = user || null;
//       } else {
//         session.user = null;
//       }
//       return session;
//     }
//     ,
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt'
//   },
//   debug: process.env.NODE_ENV !== 'production',
// };
