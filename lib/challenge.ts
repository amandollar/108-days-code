import { CHALLENGE_START, CHALLENGE_DAYS } from "./config"

export function getCurrentDay(): number {
  const start = new Date(CHALLENGE_START)
  const today = new Date()
  const diff = today.getTime() - start.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(days + 1, 1), CHALLENGE_DAYS)
}

export function getTodayUTC(): string {
  return new Date().toISOString().slice(0, 10)
}
