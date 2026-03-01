import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { SignInButton } from "./SignInButton"
import { Code2, ArrowLeft } from "lucide-react"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const session = await auth()
  const { callbackUrl = "/dashboard" } = await searchParams
  if (session) redirect(callbackUrl)

  return (
    <main className="flex flex-col items-center justify-center px-4 py-12 sm:py-16 min-h-[calc(100vh-8rem)]">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
            <Code2 className="h-7 w-7 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
            Sign in to 108 Days of Code
          </h1>
          <p className="text-zinc-500 text-sm">
            Join the community and start your streak
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6">
          <SignInButton callbackUrl={callbackUrl} />
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
