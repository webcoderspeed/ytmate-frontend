import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YTMate.in - Download Any Video or Audio Instantly",
  description:
    "Download and convert videos from YouTube, Instagram, Facebook, X, and more in seconds. High-quality MP3, MP4, HD, and 4K downloads.",
  keywords:
    "video downloader, YouTube downloader, Instagram downloader, MP3 converter, MP4 converter, online video tools",
  openGraph: {
    title: "YTMate.in - Download Any Video or Audio Instantly",
    description:
      "Download and convert videos from YouTube, Instagram, Facebook, X, and more in seconds. High-quality MP3, MP4, HD, and 4K downloads.",
    url: "https://ytmate.in",
    siteName: "YTMate.in",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YTMate.in - Download Any Video or Audio Instantly",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YTMate.in - Download Any Video or Audio Instantly",
    description:
      "Download and convert videos from YouTube, Instagram, Facebook, X, and more in seconds. High-quality MP3, MP4, HD, and 4K downloads.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (typeof window !== 'undefined') {
              // Set scroll restoration to manual
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
              }
              
              // Scroll to top on page load
              window.addEventListener('load', function() {
                window.scrollTo(0, 0);
              });
              
              // Scroll to top on route change
              let lastPath = window.location.pathname;
              const observer = new MutationObserver(function() {
                if (lastPath !== window.location.pathname) {
                  lastPath = window.location.pathname;
                  window.scrollTo(0, 0);
                }
              });
              
              observer.observe(document.documentElement, {
                childList: true,
                subtree: true
              });
            }
          `,
          }}
        />
      </body>
    </html>
  )
}
