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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
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
        </body>
      </html>
    </ClerkProvider>
  )
}