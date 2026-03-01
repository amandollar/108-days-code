"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Trophy, LayoutDashboard, User, LogOut, Users } from "lucide-react"

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
}

interface MobileNavProps {
  session: {
    user?: {
      name?: string | null
      image?: string | null
      username?: string
    }
  } | null
}

export function MobileNav({ session }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const navLinks: NavLink[] = [
    { href: "/community", label: "Community", icon: <Users className="h-4 w-4" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-4 w-4" /> },
  ]

  if (session) {
    navLinks.push(
      { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      {
        href: session.user?.username ? `/u/${session.user.username}` : "/dashboard",
        label: "Profile",
        icon: <User className="h-4 w-4" />,
      },
      { href: "/signout", label: "Sign out", icon: <LogOut className="h-4 w-4" /> }
    )
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed left-0 right-0 top-16 z-50 flex flex-col gap-1 border-b border-zinc-800/80 bg-zinc-950/95 p-4 backdrop-blur-xl"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {!session && (
              <Link
                href="/signin?callbackUrl=/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-500 transition-colors mt-2"
              >
                Join
              </Link>
            )}
          </nav>
        </>
      )}
    </div>
  )
}
