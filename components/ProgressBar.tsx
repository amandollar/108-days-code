interface ProgressBarProps {
  current: number
  total: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ProgressBar({ current, total, size = "md", showLabel = true }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100))
  const height = size === "sm" ? "h-1.5" : size === "lg" ? "h-2.5" : "h-2"

  return (
    <div className="w-full">
      <div className={`w-full ${height} rounded-full bg-zinc-800/80 overflow-hidden`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-xs text-zinc-500">
          Day {current} of {total} · {Math.round(percent)}% complete
        </p>
      )}
    </div>
  )
}
