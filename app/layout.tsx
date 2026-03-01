import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "108 Days of Code | Community Learning Platform",
  description: "Code daily. Log publicly. Build consistency. Join a community of developers building the habit of daily coding.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-40" />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
