'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { UserRole, Connection } from '@/lib/types'
import { 
  Users, Heart, Sparkles, BookOpen, TrendingUp,
  ChevronRight, Zap, Target
} from 'lucide-react'
import Link from 'next/link'
import { RecentConnections } from '@/components/recent-connections'
import { mockConnections } from '@/lib/mock-data'

// Constants
const DAYS_IN_WEEK = 7

// Helper function to get time-based greeting
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

// Helper function to get role-specific tips
function getTipForRole(role: UserRole): string {
  const tips = {
    giver: "Share specific examples from your experience. People connect better with stories than advice.",
    receiver: "Come prepared with specific questions. The more focused you are, the better guidance you'll receive.",
    both: "Switch between mentoring and learning to get the full experience."
  }
  return tips[role] || tips.both
}

// Role configuration for consistent styling
const ROLE_CONFIG = {
  giver: {
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    label: 'Mentor'
  },
  receiver: {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'Learner'
  },
  both: {
    icon: Sparkles,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: 'Both'
  }
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [connections, setConnections] = useState<Connection[]>([])
  const greeting = getTimeBasedGreeting()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
    
    if (user && !user.publicMetadata.role) {
      router.push('/onboarding')
    }

    // TODO: Replace with actual database query when backend is implemented
    // For now, using mock data for development
    setConnections(mockConnections)
  }, [user, isLoaded, router])

  if (!isLoaded || !user) {
    return <LoadingSpinner />
  }

  const userRole = user.publicMetadata.role as UserRole
  const roleConfig = ROLE_CONFIG[userRole] || ROLE_CONFIG.both
  const { icon: RoleIcon, color: roleColor, bgColor: roleBgColor, label: roleLabel } = roleConfig

  // Stats
  const totalConnections = connections.length
  const thisWeekConnections = connections.filter(c => {
    const date = new Date(c.connectedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - DAYS_IN_WEEK)
    return date > weekAgo
  }).length

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {greeting}, {user.firstName || 'Friend'}!
              </h1>
              <p className="text-lg text-slate-600">
                Ready for meaningful conversations
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 cursor-pointer" onClick={() => router.push('/match')}>
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 ${roleBgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Zap className="w-6 h-6 text-slate-700" />
                </div>
                <CardTitle className="text-xl">Quick Match</CardTitle>
                <CardDescription>
                  Start a conversation now
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group/btn bg-purple-600 hover:bg-purple-700 text-white">
                  Find Someone
                  <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Your Impact</CardTitle>
                <CardDescription>
                  Connections and conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Connections</span>
                    <span className="font-semibold text-lg">{totalConnections}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">This Week</span>
                    <span className="font-semibold text-lg text-green-600">+{thisWeekConnections}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Your Role</CardTitle>
                <CardDescription>
                  Current participation mode
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`inline-flex items-center gap-2 ${roleBgColor} px-3 py-2 rounded-lg mb-3`}>
                  <RoleIcon className={`w-4 h-4 ${roleColor}`} />
                  <span className="font-medium text-sm">{roleLabel}</span>
                </div>
                <Link href="/onboarding">
                  <Button variant="outline" size="sm" className="w-full">
                    Change Role
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Connections */}
          <RecentConnections connections={connections} />

          {/* Quick Tips & Success Stories */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Tip of the day</h3>
                  <p className="text-sm text-slate-700">
                    {getTipForRole(userRole)}
                  </p>
                </div>
              </div>
            </div>
            
            <Link href="/stories" className="block">
              <div className="bg-purple-50 rounded-lg p-6 h-full hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Success Stories</h3>
                    <p className="text-sm text-slate-700">
                      Read inspiring stories from our community and see the impact of meaningful connections.
                    </p>
                    <span className="text-sm text-purple-600 font-medium mt-2 inline-flex items-center">
                      Read Stories <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}