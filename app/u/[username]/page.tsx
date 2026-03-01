import Link from "next/link"
import Image from "next/image"

export const dynamic = "force-dynamic"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Submission from "@/models/Submission"
import { ArrowLeft, Flame, Trophy, FileCode, ExternalLink } from "lucide-react"

interface ProfileUser {
  _id: unknown
  name: string
  image?: string
  username: string
  currentStreak: number
  longestStreak: number
}

interface ProfileSubmission {
  date: string
  title: string
  description: string
  hours: number
  link?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  await connectDB()

  const user = await User.findOne({ username: username.toLowerCase() })
    .select("name image username currentStreak longestStreak")
    .lean() as ProfileUser | null

  if (!user) {
    notFound()
  }

  const submissions = await Submission.find({ userId: user._id })
    .sort({ date: -1 })
    .limit(10)
    .select("date title description hours link")
    .lean() as unknown as ProfileSubmission[]

  return (
    <main className="px-4 py-12">
      <div className="max-w-xl mx-auto">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leaderboard
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0 ring-2 ring-zinc-700/80 shadow-lg">
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-2xl font-medium">
                {user.name?.[0] ?? "?"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{user.name}</h1>
            <p className="text-zinc-500">@{user.username}</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3">
              <span className="flex items-center gap-2 text-zinc-400">
                <Flame className="h-4 w-4 text-orange-500" />
                <strong className="text-zinc-100">{user.currentStreak}</strong> current
              </span>
              <span className="flex items-center gap-2 text-zinc-400">
                <Trophy className="h-4 w-4 text-amber-500" />
                <strong className="text-zinc-100">{user.longestStreak}</strong> best
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <FileCode className="h-5 w-5 text-zinc-500" />
          <h2 className="font-medium text-zinc-300">Last 10 submissions</h2>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.date + sub.title}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 hover:border-zinc-700/80 transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-500 text-sm">{formatDate(sub.date)}</p>
                <span className="text-zinc-400 text-sm font-medium">{sub.hours}h</span>
              </div>
              <h3 className="font-medium text-zinc-100 mb-1">{sub.title}</h3>
              <p className="text-zinc-400 text-sm mb-2">{sub.description}</p>
              {sub.link && (
                <a
                  href={sub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-emerald-400 truncate transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{sub.link}</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {submissions.length === 0 && (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center">
            <FileCode className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500">No submissions yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
