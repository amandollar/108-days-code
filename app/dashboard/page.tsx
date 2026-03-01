import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Submission from "@/models/Submission"
import { CHALLENGE_DAYS } from "@/lib/config"
import { getCurrentDay, getTodayUTC } from "@/lib/challenge"
import { DashboardForm } from "./DashboardForm"
import { ProgressBar } from "@/components/ProgressBar"
import { Flame, Trophy, Calendar, Clock, CheckCircle } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  await connectDB()

  const user = await User.findById(session.user.id)
  if (!user) {
    redirect("/")
  }

  const today = getTodayUTC()
  const hasSubmittedToday = await Submission.exists({
    userId: session.user.id,
    date: today,
  })

  const currentDay = getCurrentDay()
  const daysRemaining = CHALLENGE_DAYS - currentDay

  return (
    <main className="px-4 py-8 sm:py-12 pb-safe">
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">Dashboard</h1>
          <p className="text-zinc-500 mt-1 text-sm sm:text-base">Track your progress and log daily activity</p>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-500">Challenge progress</span>
            <span className="text-sm font-medium text-zinc-300">Day {currentDay} of {CHALLENGE_DAYS}</span>
          </div>
          <ProgressBar current={currentDay} total={CHALLENGE_DAYS} size="lg" showLabel={false} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <p className="text-zinc-500 text-sm">Current streak</p>
            </div>
            <p className="text-2xl font-bold text-zinc-100">{user.currentStreak}</p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <p className="text-zinc-500 text-sm">Longest streak</p>
            </div>
            <p className="text-2xl font-bold text-zinc-100">{user.longestStreak}</p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-emerald-500" />
              <p className="text-zinc-500 text-sm">Day</p>
            </div>
            <p className="text-2xl font-bold text-zinc-100">
              {currentDay} <span className="text-zinc-500 font-normal">/ {CHALLENGE_DAYS}</span>
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <p className="text-zinc-500 text-sm">Days remaining</p>
            </div>
            <p className="text-2xl font-bold text-zinc-100">{daysRemaining}</p>
          </div>
        </div>

        {hasSubmittedToday ? (
          <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-6 text-center">
            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-zinc-300 font-medium">You&apos;ve logged today.</p>
            <p className="text-zinc-500 text-sm mt-1">Come back tomorrow to continue your streak.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
            <h2 className="font-medium text-zinc-200 mb-4">Log today&apos;s activity</h2>
            <DashboardForm />
          </div>
        )}
      </div>
    </main>
  )
}
