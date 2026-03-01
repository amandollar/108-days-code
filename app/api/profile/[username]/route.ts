import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"

export const dynamic = "force-dynamic"
import User from "@/models/User"
import Submission from "@/models/Submission"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 })
  }

  await connectDB()

  const user = await User.findOne({ username: username.toLowerCase() })
    .select("name image username currentStreak longestStreak")
    .lean()

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const userId = (user as unknown as { _id: import("mongoose").Types.ObjectId })._id
  const submissions = await Submission.find({ userId })
    .sort({ date: -1 })
    .limit(10)
    .select("date title description hours link createdAt")
    .lean()

  return NextResponse.json({
    ...user,
    submissions,
  })
}
