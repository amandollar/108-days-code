---

# 📄 PLAN.md – 108DaysOfCode

## 🎯 Project Goal

Build a minimal public web app called **108DaysOfCode** where users:

* Login with GitHub
* Log 1 coding activity per day
* Maintain a public streak
* Appear on leaderboard
* Compete for Top 10 consistency

This is a discipline platform, not a startup.

It must:

* Be built in one day
* Be minimal
* Avoid feature creep
* Focus on daily consistency

---

# 🧱 Tech Stack

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS (dark theme)
* MongoDB (Mongoose)
* NextAuth (GitHub only)
* Zod (validation)

No additional UI libraries.
No unnecessary abstractions.

---

# 📦 Folder Structure

```
/app
  /api
    /submit
    /leaderboard
    /profile/[username]
  /dashboard
  /leaderboard
  /u/[username]
/lib
  db.ts
  auth.ts
  config.ts
/models
  User.ts
  Submission.ts
```

Keep structure clean and simple.

---

# ⚙️ Global Config

Create:

```ts
// lib/config.ts
export const CHALLENGE_START = "2026-03-02";
export const CHALLENGE_DAYS = 108;
```

This is used only to:

* Display current challenge day
* Display days remaining

No pause logic.
No freeze logic.
No complex date math.

---

# 🗄 Database Models

## User

Fields:

* name
* email
* image
* githubId
* currentStreak (number)
* longestStreak (number)
* lastSubmissionDate (Date | null)
* createdAt

Initialize on first login:

* currentStreak = 0
* longestStreak = 0
* lastSubmissionDate = null

---

## Submission

Fields:

* userId (ref User)
* date (string, format: YYYY-MM-DD in UTC)
* title (string) → What they worked on
* description (string) → What they did
* hours (number)
* link (optional string)
* createdAt

Constraint:

* One submission per user per UTC day

---

# 🔐 Authentication

* GitHub provider only via NextAuth
* On first login:

  * Create user if not exists
* No email/password system
* No roles
* No admin panel

Keep authentication minimal.

---

# 🧠 Streak Logic (Critical – Keep Simple)

On POST `/api/submit`:

1. Get today in UTC (YYYY-MM-DD)
2. If user already submitted today → reject
3. If lastSubmissionDate is yesterday (UTC):

   * currentStreak += 1
4. Else:

   * currentStreak = 1
5. Update longestStreak if needed
6. Update lastSubmissionDate to today
7. Save submission

Do not implement timezone complexity.
Use UTC only.

---

# 🌐 Pages

## 1️⃣ Landing Page `/`

Display:

* Title: 108 Days of Code
* Description:
  “Code daily. Log publicly. Build consistency.”
* Start date
* End date
* Join with GitHub button
* Link to Leaderboard
* Mention:

  🎁 Top 10 consistent participants receive a small surprise.

Tone:

* Calm
* Mature
* No hype
* No dramatic language

Dark theme only.

---

## 2️⃣ Dashboard `/dashboard` (Protected)

Display:

* Current streak
* Longest streak
* Day X of 108
* Days remaining

Submission form:

* Title (required)
* Description (required)
* Hours spent (required, number)
* Optional link

If already submitted today:

* Show:
  “You’ve logged today. Come back tomorrow.”

No editing.
No deleting.

---

## 3️⃣ Leaderboard `/leaderboard`

Sort users by:

1. currentStreak DESC
2. longestStreak DESC
3. createdAt ASC

Display:

* Rank
* Avatar
* Name
* Current streak
* Longest streak

If rank ≤ 10:

* Show badge: 🏆 Top 10 Contender

No pagination.
No filters.

---

## 4️⃣ Public Profile `/u/[username]`

Display:

* Avatar
* Name
* Current streak
* Longest streak
* Last 10 submissions

No graphs.
No heatmaps.
No analytics.

Keep minimal.

---

# 🎁 Reward Rule

Top 10 users at the end of 108 days receive a small surprise reward.

No reward automation.
No backend logic for reward.
Manual announcement at end.

---

# 🛡 Validation

Use Zod to validate:

* title
* description
* hours
* optional link

Return clean error messages.

---

# 🎨 UI Requirements

* Dark theme
* Minimal design
* Tailwind only
* Clean cards
* Responsive
* No animations
* No component libraries

Developer-focused aesthetic.

---

# 🚨 Strict Constraints

Do NOT implement:

* Comments
* Editing logs
* Deleting logs
* Notifications
* Admin panel
* Gamification
* Rooms
* Social features
* Pagination
* Filters
* Complex statistics

Keep it lean.

---

# 🚀 Deployment Requirements

Must be deployable to Vercel.

Environment variables required:

* MONGODB_URI
* GITHUB_ID
* GITHUB_SECRET
* NEXTAUTH_SECRET
* NEXTAUTH_URL

Ensure production-ready structure.

---

