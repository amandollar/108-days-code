# 108 Days of Code

Code daily. Log publicly. Build consistency.

A minimal discipline platform where users log 1 coding activity per day, maintain a public streak, and compete for Top 10 consistency.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (dark theme)
- MongoDB (Mongoose)
- NextAuth (GitHub only)
- Zod (validation)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   - `MONGODB_URI` – MongoDB connection string. If you don't have MongoDB locally, use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free): create a cluster → Database Access → Add user → Network Access → Add IP (or 0.0.0.0/0 for dev) → Connect → copy the connection string
   - `GITHUB_ID` – GitHub OAuth App Client ID
   - `GITHUB_SECRET` – GitHub OAuth App Client Secret
   - `NEXTAUTH_SECRET` – Random 32+ character secret
   - `NEXTAUTH_URL` – App URL (e.g. `http://localhost:3000`)

3. **Create a GitHub OAuth App**

   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
   - Use the Client ID and Client Secret in `.env.local`

4. **Run the app**

   ```bash
   npm run dev
   ```

## Deployment (Vercel)

1. Push to GitHub and import the project in Vercel
2. Add all environment variables in Vercel project settings
3. Set `NEXTAUTH_URL` to your production URL (e.g. `https://your-app.vercel.app`)
4. Update your GitHub OAuth App callback URL to: `https://your-app.vercel.app/api/auth/callback/github`
5. **Analytics**: Enable Web Analytics in Vercel Dashboard → Project → Analytics tab → Enable. The app uses `@vercel/analytics` for privacy-friendly page views.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
