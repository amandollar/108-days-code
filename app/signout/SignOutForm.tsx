"use client"

import { useEffect, useState } from "react"
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2, X } from "lucide-react"

export function SignOutForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token ?? null))
  }, [])

  if (!csrfToken) {
    return (
      <div className="mt-8 w-full">
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 py-3.5 font-medium text-zinc-500"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-3">
      <form action="/api/auth/signout" method="POST" className="w-full">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value="/" />
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </form>
      <button
        type="button"
        onClick={() => router.back()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-600 bg-transparent px-6 py-3.5 font-medium text-zinc-400 hover:bg-zinc-800/50 hover:border-zinc-500 hover:text-zinc-200 transition-all"
      >
        <X className="h-4 w-4" />
        Cancel
      </button>
    </div>
  )
}
