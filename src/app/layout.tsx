import "./globals.css"
import { Metadata, Viewport } from "next"
import { Toaster } from "sonner"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Navbar from "@/components/nav-bar"
import { SessionProvider } from "@/components/session-provider"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: "Shikha Labs Teacher",
    template: `%s - Shikha Labs Teacher`,
  },
  description: "Shikha Labs is a great education platform.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">{children}</div>
              </div>
              <Toaster richColors />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
