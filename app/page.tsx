import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Heart, Users, Video, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react'
import { FeatureCard, UseCaseCard, TrustIndicator } from '@/components/home'

// Data configuration
const features = [
  {
    href: '/features/share-your-story',
    icon: Heart,
    title: 'Share Your Story',
    description: "Whether you're 25 or 85, your experiences matter. Share your stories with someone who genuinely wants to listen and learn.",
    colorScheme: 'rose' as const
  },
  {
    href: '/features/find-connection',
    icon: Users,
    title: 'Find Connection',
    description: 'Missing those grandparent-style conversations? Connect with someone who has time to share and stories to tell.',
    colorScheme: 'blue' as const
  },
  {
    href: '/features/real-people',
    icon: Video,
    title: 'Real People',
    description: 'Video calls with real people who want to connect. No age limits, no requirements - just genuine human conversation.',
    colorScheme: 'green' as const
  }
]

const useCases = [
  {
    title: 'Journalists & Witnesses',
    description: 'Working on a WWII story? Connect with veterans or their families who lived through history.'
  },
  {
    title: 'Detectives & Investigators',
    description: 'Retired law enforcement sharing expertise with citizen investigators and true crime researchers.'
  },
  {
    title: 'Students & Experts',
    description: 'Thesis research? Find someone who worked in your field of study for decades.'
  },
  {
    title: 'Families & Elders',
    description: 'Missing grandparent chats? Connect with someone who has stories to share and time to talk.'
  },
  {
    title: 'Hobbyists & Masters',
    description: "Learning woodworking? Talk to someone who's been crafting for 40 years."
  },
  {
    title: 'Anyone & Everyone',
    description: 'Sometimes you just need someone to talk to. We all have stories worth sharing.'
  }
]

const trustIndicators = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All conversations are private. Your data is protected with enterprise-grade security.',
    colorScheme: 'blue' as const
  },
  {
    icon: Users,
    title: 'Combat Loneliness',
    description: 'Many people have stories to share but no one to share them with. Be that person for someone.',
    colorScheme: 'green' as const
  },
  {
    icon: Clock,
    title: 'No Barriers',
    description: 'No age requirements, no location limits. Connect from anywhere, anytime, with anyone.',
    colorScheme: 'purple' as const
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">Connecting people across generations</span>
          </div>
          <h1 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Every Story<br />Finds Its Listener
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're a retired detective with cases to discuss, a student researching history,
            or simply missing grandparent-style conversations - Bridge connects you with the right person.
          </p>
        </div>

        <SignedOut>
          <div className="max-w-5xl mx-auto">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature) => (
                <FeatureCard key={feature.href} {...feature} />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500">No credit card required • Free forever</p>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription className="text-base mt-2">
                  Your next conversation awaits. Continue making meaningful connections.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full group">
                    Enter Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </SignedIn>

        {/* Use Cases */}
        <div className="mt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-center text-2xl font-semibold text-slate-800 mb-4">
              Real Connections, Real Impact
            </h3>
            <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
              From personal stories to professional expertise, Bridge connects people who need each other
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {useCases.map((useCase, index) => (
                <UseCaseCard key={index} {...useCase} />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-slate-200 pt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-2xl font-semibold text-slate-800 mb-12">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {trustIndicators.map((indicator, index) => (
                <TrustIndicator key={index} {...indicator} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}