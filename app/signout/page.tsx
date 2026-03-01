import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { SignOutForm } from "./SignOutForm"
import { Code2, LogOut } from "lucide-react"
import Link from "next/link"

export default async function SignOutPage() {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-800/80">
              <LogOut className="h-7 w-7 text-zinc-400" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-zinc-100">
              Sign out
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Are you sure you want to sign out? You&apos;ll need to sign in again to log your
              progress.
            </p>
            <SignOutForm />
          </div>
        </div>
        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Code2 className="h-4 w-4 text-emerald-500/80" />
          Back to 108 Days of Code
        </Link>
      </div>
    </main>
  )
}
