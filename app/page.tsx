import Link from "next/link"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Submission from "@/models/Submission"
import { CHALLENGE_START, CHALLENGE_DAYS } from "@/lib/config"
import { getCurrentDay } from "@/lib/challenge"
import { ProgressBar } from "@/components/ProgressBar"
import {
  Code2,
  Calendar,
  Trophy,
  ArrowRight,
  Github,
  Users,
  FileCode,
  Flame,
  Zap,
  Target,
} from "lucide-react"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function getStats() {
  try {
    await connectDB()
    const [participants, submissions] = await Promise.all([
      User.countDocuments(),
      Submission.countDocuments(),
    ])
    return { participants, submissions }
  } catch {
    return { participants: 0, submissions: 0 }
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>
}) {
  const [session, stats] = await Promise.all([auth(), getStats()])
  const params = await searchParams
  const { error, error_description } = params

  if (error) {
    console.log("[Auth Error] Full params:", JSON.stringify(params))
  }

  const startDate = new Date(CHALLENGE_START)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + CHALLENGE_DAYS - 1)
  const currentDay = getCurrentDay()
  const progressPercent = Math.round((currentDay / CHALLENGE_DAYS) * 100)

  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-20 sm:pt-28 sm:pb-32 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400 opacity-0 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live · Day {currentDay} of {CHALLENGE_DAYS}
            </div>

            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl opacity-0 animate-fade-in-up-delay-1">
              <span className="block text-zinc-100">108 Days</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                of Code
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-lg text-zinc-400 sm:text-xl leading-relaxed opacity-0 animate-fade-in-up-delay-2">
              Build the habit. Log daily. Compete on the leaderboard. Join developers
              who ship code every single day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in-up-delay-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-4 font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 transition-all"
                  >
                    <Users className="h-4 w-4" />
                    Community
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-4 font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 transition-all"
                  >
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin?callbackUrl=/dashboard"
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300"
                  >
                    <Github className="h-5 w-5" />
                    Join with GitHub
                  </Link>
                  <Link
                    href="/community"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-4 font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                  >
                    <Users className="h-4 w-4" />
                    Community
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-zinc-600 bg-zinc-800/50 px-8 py-4 font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                  >
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 font-display tabular-nums">
                {stats.participants}
              </p>
              <p className="text-sm text-zinc-500 mt-1">Participants</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 font-display tabular-nums">
                {stats.submissions}
              </p>
              <p className="text-sm text-zinc-500 mt-1">Submissions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 font-display tabular-nums">
                {progressPercent}%
              </p>
              <p className="text-sm text-zinc-500 mt-1">Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 font-display tabular-nums">
                {CHALLENGE_DAYS}
              </p>
              <p className="text-sm text-zinc-500 mt-1">Days total</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-16 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-zinc-100 text-center mb-12 sm:text-3xl">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-zinc-900/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Code2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">Code daily</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Ship something every day. One commit, one feature, one lesson—it all counts.
              </p>
            </div>
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-sm hover:border-teal-500/30 hover:bg-zinc-900/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 mb-4 group-hover:bg-teal-500/20 transition-colors">
                <Flame className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">Log & streak</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Log your activity. Build streaks. Consistency beats intensity.
              </p>
            </div>
            <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-zinc-900/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <Target className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">Compete & win</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Climb the leaderboard. Top 10 consistent coders get a surprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & CTA */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-32 pb-safe">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-zinc-500" />
                <h2 className="font-medium text-zinc-300">Challenge timeline</h2>
              </div>
              <span className="text-sm font-medium text-emerald-400">
                Day {currentDay} of {CHALLENGE_DAYS}
              </span>
            </div>
            <ProgressBar current={currentDay} total={CHALLENGE_DAYS} size="lg" showLabel={false} />
            <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <p className="text-zinc-500">Start</p>
                <p className="text-zinc-200 font-medium">{formatDate(CHALLENGE_START)}</p>
              </div>
              <div>
                <p className="text-zinc-500">End</p>
                <p className="text-zinc-200 font-medium">
                  {formatDate(endDate.toISOString().slice(0, 10))}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-xl border border-amber-800/50 bg-amber-900/20 p-5 text-left">
              <p className="font-medium mb-2 text-amber-200">Sign-in failed ({error})</p>
              {error_description && (
                <p className="mb-2 text-amber-400/90 text-xs font-mono break-all">
                  {error_description}
                </p>
              )}
              <ul className="list-disc list-inside space-y-1 text-amber-300/80 text-sm">
                <li>
                  Check MongoDB is running and{" "}
                  <code className="bg-amber-950/50 px-1 rounded">MONGODB_URI</code> in .env.local
                </li>
                <li>
                  GitHub OAuth callback:{" "}
                  <code className="bg-amber-950/50 px-1 rounded">
                    http://localhost:3000/api/auth/callback/github
                  </code>
                </li>
                <li>
                  <code className="bg-amber-950/50 px-1 rounded">NEXTAUTH_URL</code> ={" "}
                  <code className="bg-amber-950/50 px-1 rounded">http://localhost:3000</code>
                </li>
                <li>
                  <code className="bg-amber-950/50 px-1 rounded">NEXTAUTH_SECRET</code> — required,
                  32+ chars
                </li>
              </ul>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-amber-900/40 bg-amber-950/20 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="font-semibold text-amber-200">Top 10 reward</span>
            </div>
            <p className="text-zinc-500 text-sm">
              The 10 most consistent participants at the end receive a small surprise.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
