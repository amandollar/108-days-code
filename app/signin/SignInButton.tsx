"use client"

import { useEffect, useState } from "react"
import { getCsrfToken } from "next-auth/react"
import { Github, Loader2 } from "lucide-react"

export function SignInButton({ callbackUrl }: { callbackUrl: string }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token ?? null))
  }, [])

  if (!csrfToken) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-zinc-800 px-6 py-3 font-medium text-zinc-500 cursor-not-allowed"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading...
      </button>
    )
  }

  return (
    <form action="/api/auth/signin/github" method="POST">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
      >
        <Github className="h-5 w-5" />
        Continue with GitHub
      </button>
    </form>
  )
}
