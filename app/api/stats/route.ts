import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Submission from "@/models/Submission"

export const dynamic = "force-dynamic"

export async function GET() {
  await connectDB()

  const [participantCount, submissionCount] = await Promise.all([
    User.countDocuments(),
    Submission.countDocuments(),
  ])

  return NextResponse.json({
    participants: participantCount,
    submissions: submissionCount,
  })
}
