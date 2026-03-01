import Link from "next/link"
import Image from "next/image"
import { connectDB } from "@/lib/db"
import Submission from "@/models/Submission"
import { Users, FileCode, ExternalLink, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

interface CommunitySubmission {
  _id: string
  date: string
  title: string
  description: string
  hours: number
  link?: string
  userId?: {
    name: string
    image?: string
    username: string
  } | null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function CommunityPage() {
  await connectDB()

  const submissions = await Submission.find({})
    .populate("userId", "name image username")
    .sort({ date: -1, createdAt: -1 })
    .limit(50)
    .lean() as unknown as CommunitySubmission[]

  return (
    <main className="px-4 py-8 sm:py-12 pb-safe">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-xl bg-emerald-500/10 p-2.5 border border-emerald-500/20 shrink-0">
            <Users className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">Community</h1>
            <p className="text-zinc-500 text-sm">See what everyone&apos;s building</p>
          </div>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub._id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 hover:border-zinc-700/80 transition-colors backdrop-blur-sm"
            >
              <Link
                href={sub.userId?.username ? `/u/${sub.userId.username}` : "/leaderboard"}
                className="flex items-center gap-3 mb-3 group"
              >
                <div className="relative w-9 h-9 shrink-0 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-zinc-800">
                  {sub.userId?.image ? (
                    <Image
                      src={sub.userId.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm font-medium">
                      {sub.userId?.name?.[0] ?? "?"}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-zinc-100 truncate group-hover:text-emerald-400 transition-colors">
                    {sub.userId?.name ?? "Unknown"}
                  </p>
                  <p className="text-zinc-500 text-xs truncate">@{sub.userId?.username}</p>
                </div>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-zinc-500 text-sm">{formatDate(sub.date)}</span>
                <span className="text-zinc-600">·</span>
                <span className="flex items-center gap-1 text-zinc-400 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  {sub.hours}h
                </span>
              </div>
              <h3 className="font-medium text-zinc-100 mb-1">{sub.title}</h3>
              <p className="text-zinc-400 text-sm mb-2 line-clamp-3">{sub.description}</p>
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
            <p className="text-zinc-500">No logs yet.</p>
            <p className="text-zinc-600 text-sm mt-1">Be the first to log your progress.</p>
          </div>
        )}
      </div>
    </main>
  )
}
