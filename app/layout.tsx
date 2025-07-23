import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/navigation'
import { PWAInstaller } from '@/components/pwa-installer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bridge - Connect & Learn',
  description: 'Bridge the generation gap. Connect for grandparent-style conversations and combat loneliness through meaningful video calls.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bridge',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Bridge',
    title: 'Bridge - Connect & Learn',
    description: 'Bridge the generation gap through meaningful video calls',
  },
  twitter: {
    card: 'summary',
    title: 'Bridge - Connect & Learn',
    description: 'Bridge the generation gap through meaningful video calls',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Bridge" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-tap-highlight" content="no" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SignedIn>
            <Navigation />
          </SignedIn>
          <SignedOut>
            <header className="flex justify-between items-center p-4 h-16">
              <div className="flex items-center gap-4">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </header>
          </SignedOut>
          <div>
            <SignedIn>
              <main className="pt-16">
                {children}
              </main>
            </SignedIn>
            <SignedOut>
              {children}
            </SignedOut>
          </div>
          <PWAInstaller />
        </body>
      </html>
    </ClerkProvider>
  )
}