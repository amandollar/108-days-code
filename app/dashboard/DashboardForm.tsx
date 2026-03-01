"use client"

import { useState } from "react"
import { BookOpen, FileText, Clock, Link2, Send, Loader2, CheckCircle } from "lucide-react"

export function DashboardForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const hours = parseFloat(formData.get("hours") as string)
    const link = (formData.get("link") as string) || ""

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, hours, link }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? "Something went wrong")
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    form.reset()
    window.location.reload()
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-6 text-center">
        <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
        <p className="text-zinc-300 font-medium">Submission logged successfully.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-1">
          <BookOpen className="h-4 w-4" />
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 transition-colors"
          placeholder="What you worked on"
        />
      </div>

      <div>
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-1">
          <FileText className="h-4 w-4" />
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={2000}
          rows={4}
          className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 resize-none transition-colors"
          placeholder="What you did"
        />
      </div>

      <div>
        <label htmlFor="hours" className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-1">
          <Clock className="h-4 w-4" />
          Hours spent *
        </label>
        <input
          id="hours"
          name="hours"
          type="number"
          required
          min={0.1}
          max={24}
          step={0.1}
          className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 transition-colors"
          placeholder="e.g. 2.5"
        />
      </div>

      <div>
        <label htmlFor="link" className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-1">
          <Link2 className="h-4 w-4" />
          Link (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600/50 transition-colors"
          placeholder="https://..."
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm flex items-center gap-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Log activity
          </>
        )}
      </button>
    </form>
  )
}
