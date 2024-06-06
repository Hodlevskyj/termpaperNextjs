import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"
import prismadb from "../libs/prismadb"
import bcrypt from 'bcryptjs'


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password')
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || !user.hashedPassword) {
          throw new Error('Invalid email or password')
        }

        const currentHashedPassword = await bcrypt.hash(credentials.password, 12);
        
        bcrypt.compare(currentHashedPassword, user.hashedPassword);


        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn(params) {
      console.log(params.profile); 

      return true; 
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  
  
  debug: process.env.NODE_ENV !== "production",

}