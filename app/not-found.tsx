import Link from "next/link"
import { Code2, Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-24 min-h-[60vh]">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/80">
          <Code2 className="h-8 w-8 text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Page not found</h1>
        <p className="text-zinc-500 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
