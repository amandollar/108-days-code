import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { Code2, LayoutDashboard, Trophy, LogOut, User, Users } from "lucide-react"
import { MobileNav } from "./MobileNav"

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl safe-area-inset-top">
      <div className="mx-auto flex h-14 sm:h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-zinc-100 hover:text-white transition-colors min-w-0"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Code2 className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="tracking-tight truncate">108 Days of Code</span>
        </Link>

        <div className="flex items-center gap-1">
          <MobileNav session={session} />
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/community"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
          >
            <Users className="h-4 w-4" />
            Community
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href={session.user?.username ? `/u/${session.user.username}` : "/dashboard"}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full ring-1 ring-zinc-700"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {session.user?.name ?? "Profile"}
                </span>
              </Link>
              <Link
                href="/signout"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Link>
            </>
          ) : (
            <Link
              href="/signin?callbackUrl=/dashboard"
              className="ml-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
            >
              Join
            </Link>
          )}
        </nav>
        </div>
      </div>
    </header>
  )
}
