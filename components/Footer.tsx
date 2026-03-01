import Link from "next/link"
import { Code2, Trophy, Users } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm safe-area-inset-bottom pt-12 sm:pt-8">
      <div className="mx-auto max-w-4xl px-4 pb-6 sm:pb-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Code2 className="h-5 w-5 text-emerald-500" />
            <span className="font-medium">108 Days of Code</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/community"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Users className="h-4 w-4" />
              Community
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-zinc-600">
          Code daily. Log publicly. Build consistency. A community learning platform.
        </p>
        <p className="mt-2 text-center text-xs text-zinc-600">
          Top 10 consistent participants receive a small surprise at the end.
        </p>
      </div>
    </footer>
  )
}
