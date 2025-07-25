import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FeatureHeroProps {
  title: string
  subtitle: string
  description: string
  ctaText?: string
  ctaLink?: string
  showBackButton?: boolean
}

export function FeatureHero({ 
  title, 
  subtitle, 
  description, 
  ctaText = "Get Started",
  ctaLink = "/sign-up",
  showBackButton = true
}: FeatureHeroProps) {
  const router = useRouter()

  return (
    <>
      {/* Navigation */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-purple-600">Bridge</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link href="/features/share-your-story" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Share Your Story
              </Link>
              <Link href="/features/find-connection" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Find Connection
              </Link>
              <Link href="/features/real-people" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Real People
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="mb-6 inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          )}
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              {title}
            </h1>
            <p className="text-2xl text-gray-600 mb-4">
              {subtitle}
            </p>
            <p className="text-lg text-gray-500 mb-10">
              {description}
            </p>
            <Link href={ctaLink}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                {ctaText}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}