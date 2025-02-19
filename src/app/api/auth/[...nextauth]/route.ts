import NextAuth, { DefaultSession, AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../../../prisma/prisma-client"
import bcrypt from "bcryptjs"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) return null

          const passwordCompare = await bcrypt.compare(credentials.password, user.password)
          if (!passwordCompare) return null


          return {
            id: String(user.id),
            email: user.email,
            name: user.fullName,
            image: user.image
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async signIn({ profile }) {
      if (!profile?.email)
        return false

      await prisma.user.upsert({
        where: { email: profile.email },
        update: {
          email: profile.email,
          fullName: profile.name || "Unknown",
          image: profile.image
        },
        create: {
          email: profile.email,
          fullName: profile.name || "Unknown",
          image: profile.image || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
          password: "defaultPassword"
        }
      });

      return true
    }
  },
  session: {
    strategy: "jwt" as const
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }