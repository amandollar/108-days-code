import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getServerSession } from "next-auth/next"
import type { NextAuthOptions } from "next-auth"
import { connectDB } from "./db"
import User from "@/models/User"

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const ghProfile = profile as { login?: string; id?: string } | undefined
      if (!ghProfile?.login) return false

      try {
        await connectDB()
      } catch (err) {
        console.error("[NextAuth signIn] MongoDB connection failed:", err)
        return false
      }

      const username = ghProfile.login.toLowerCase()
      const githubId = String(ghProfile.id ?? "")
      // GitHub may not return email if user has "Keep my email addresses private"
      const email = user.email ?? `${githubId}+${username}@users.noreply.github.com`

      const existingUser = await User.findOne({ githubId })

      if (!existingUser) {
        try {
          await User.create({
            name: user.name,
            email,
            image: user.image,
            githubId,
            username,
            currentStreak: 0,
            longestStreak: 0,
            lastSubmissionDate: null,
          })
        } catch (err) {
          console.error("[NextAuth signIn] Failed to create user:", err)
          return false
        }
      }

      return true
    },
    async jwt({ token, account, profile }) {
      const ghProfile = profile as { id?: string } | undefined
      if (account && ghProfile) {
        await connectDB()
        const user = await User.findOne({ githubId: String(ghProfile.id) })
        if (user) {
          token.userId = user._id.toString()
          token.username = user.username
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? token.sub!
        session.user.username = token.username
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
    error: "/",
  },
}

export const auth = () => getServerSession(authOptions)

export default NextAuth(authOptions)
