import Link from "next/link"
import Image from "next/image"
import { connectDB } from "@/lib/db"

export const dynamic = "force-dynamic"
import User from "@/models/User"
import { Trophy, Flame, Medal, Home, Award } from "lucide-react"

interface LeaderboardUser {
  _id: string
  name: string
  image?: string
  username: string
  currentStreak: number
  longestStreak: number
}

export default async function LeaderboardPage() {
  await connectDB()

  const users = await User.find({})
    .sort({ currentStreak: -1, longestStreak: -1, createdAt: 1 })
    .select("name image username currentStreak longestStreak")
    .lean() as unknown as LeaderboardUser[]

  return (
    <main className="px-4 py-8 sm:py-12 pb-safe">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/20 shrink-0">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">Leaderboard</h1>
              <p className="text-zinc-500 text-sm">Top coders by consistency</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors self-start sm:self-auto"
          >
            <Home className="h-4 w-4 shrink-0" />
            Home
          </Link>
        </div>

        <div className="space-y-2">
          {users.map((user, index) => (
            <Link
              key={user._id}
              href={`/u/${user.username}`}
              className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 sm:p-4 hover:bg-zinc-800/50 hover:border-zinc-700/80 transition-all backdrop-blur-sm"
            >
              <span className="flex w-7 h-9 sm:w-8 sm:h-11 shrink-0 items-center justify-center order-1">
                {index < 3 ? (
                  <Medal className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    index === 0 ? "text-amber-400" :
                    index === 1 ? "text-zinc-300" :
                    "text-amber-700"
                  }`} />
                ) : (
                  <span className="text-zinc-500 font-medium text-sm">{index + 1}</span>
                )}
              </span>
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-zinc-800 order-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm font-medium">
                    {user.name?.[0] ?? "?"}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 order-3">
                <p className="font-medium text-zinc-100 truncate">{user.name}</p>
                <p className="text-zinc-500 text-sm truncate">@{user.username}</p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 shrink-0 order-4 w-full sm:w-auto justify-end sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 shrink-0 text-orange-500" />
                  <span className="font-semibold text-zinc-100 tabular-nums text-sm sm:text-base">{user.currentStreak}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="font-semibold text-zinc-100 tabular-nums text-sm sm:text-base">{user.longestStreak}</span>
                </div>
                {index < 10 && (
                  <span className="flex items-center gap-1.5 shrink-0 text-amber-400 text-xs font-medium px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md bg-amber-500/10">
                    <Trophy className="h-3.5 w-3.5 shrink-0" />
                    Top 10
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {users.length === 0 && (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center">
            <Trophy className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500">No participants yet.</p>
            <p className="text-zinc-600 text-sm mt-1">Be the first to join the challenge.</p>
          </div>
        )}
      </div>
    </main>
  )
}
