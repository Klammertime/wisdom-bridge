'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole, Connection } from '@/lib/types'
import { 
  Users, Heart, Sparkles, BookOpen, TrendingUp,
  ChevronRight, Zap, Target
} from 'lucide-react'
import Link from 'next/link'
import { RecentConnections } from '@/components/recent-connections'
import { mockConnections } from '@/lib/mock-data'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [connections, setConnections] = useState<Connection[]>([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
    
    if (user && !user.publicMetadata.role) {
      router.push('/onboarding')
    }

    // Use mock data for now, in production this would come from your database
    setConnections(mockConnections)

    // Set time-based greeting
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [user, isLoaded, router])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  const userRole = user.publicMetadata.role as UserRole
  const RoleIcon = userRole === 'giver' ? Heart : userRole === 'receiver' ? Users : Sparkles
  const roleColor = userRole === 'giver' ? 'text-rose-500' : userRole === 'receiver' ? 'text-blue-500' : 'text-purple-500'
  const roleBgColor = userRole === 'giver' ? 'bg-rose-50' : userRole === 'receiver' ? 'bg-blue-50' : 'bg-purple-50'
  const roleLabel = userRole === 'giver' ? 'Mentor' : userRole === 'receiver' ? 'Learner' : 'Both'

  // Stats
  const totalConnections = connections.length
  const thisWeekConnections = connections.filter(c => {
    const date = new Date(c.connectedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
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
                    {userRole === 'giver' 
                      ? "Share specific examples from your experience. People connect better with stories than advice."
                      : userRole === 'receiver'
                      ? "Come prepared with specific questions. The more focused you are, the better guidance you'll receive."
                      : "Switch between mentoring and learning to get the full experience."
                    }
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