import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const dynamic = "force-dynamic"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Submission from "@/models/Submission"
import { submissionSchema } from "@/lib/validations"

function getTodayUTC(): string {
  const now = new Date()
  return now.toISOString().slice(0, 10)
}

function getYesterdayUTC(): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const parsed = submissionSchema.safeParse({
    ...body,
    hours: typeof body.hours === "string" ? parseFloat(body.hours) : body.hours,
    link: body.link || "",
  })

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]
    return NextResponse.json(
      { error: firstError?.message ?? "Validation failed" },
      { status: 400 }
    )
  }

  const { title, description, hours, link } = parsed.data
  const today = getTodayUTC()

  await connectDB()

  const existingSubmission = await Submission.findOne({
    userId: session.user.id,
    date: today,
  })

  if (existingSubmission) {
    return NextResponse.json(
      { error: "You have already submitted today. Come back tomorrow." },
      { status: 400 }
    )
  }

  const user = await User.findById(session.user.id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const yesterday = getYesterdayUTC()
  let currentStreak = user.currentStreak
  let longestStreak = user.longestStreak

  if (user.lastSubmissionDate) {
    const lastDate = user.lastSubmissionDate.toISOString().slice(0, 10)
    if (lastDate === yesterday) {
      currentStreak += 1
    } else {
      currentStreak = 1
    }
  } else {
    currentStreak = 1
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak
  }

  await User.findByIdAndUpdate(session.user.id, {
    currentStreak,
    longestStreak,
    lastSubmissionDate: new Date(today),
  })

  await Submission.create({
    userId: session.user.id,
    date: today,
    title,
    description,
    hours,
    link: link || undefined,
  })

  return NextResponse.json({
    success: true,
    currentStreak,
    longestStreak,
  })
}
