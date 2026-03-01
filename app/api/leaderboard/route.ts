import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"

export const dynamic = "force-dynamic"
import User from "@/models/User"

export async function GET() {
  await connectDB()

  const users = await User.find({})
    .sort({ currentStreak: -1, longestStreak: -1, createdAt: 1 })
    .select("name image username currentStreak longestStreak")
    .lean()

  return NextResponse.json(users)
}
