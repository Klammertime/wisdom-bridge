'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, Heart, Users, Quote, Star, Calendar,
  TrendingUp, MessageSquare, Sparkles, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { successStories } from '@/lib/mock-data'

export default function SuccessStoriesPage() {
  const router = useRouter()

  const stats = [
    { label: 'Active Connections', value: '50,000+', icon: Users },
    { label: 'Stories Shared', value: '2M+', icon: MessageSquare },
    { label: 'Weekly Calls', value: '125,000+', icon: Calendar },
    { label: 'Lives Enriched', value: 'Countless', icon: Heart }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Connections, Real Impact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, Bridge creates meaningful connections that enrich lives across generations. 
            Here are just a few of the thousands of stories from our community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Success Stories */}
        <div className="space-y-8 mb-12">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">{story.title}</CardTitle>
                    <CardDescription className="text-base">
                      {story.participants}
                    </CardDescription>
                  </div>
                  <Quote className="h-8 w-8 text-purple-300" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {story.story}
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Outcome:</span>
                    <span>{story.outcome}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Community Says</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Linda" />
                    <AvatarFallback>LK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Linda K., 72</p>
                    <p className="text-sm text-gray-600">Wisdom Sharer</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I was feeling isolated after retirement. Bridge gave me purpose again. 
                  Now I have weekly calls with young professionals who value my experience. 
                  It's incredibly fulfilling."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Marcus T., 29</p>
                    <p className="text-sm text-gray-600">Connection Seeker</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Lost my grandparents young and always felt that void. Through Bridge, 
                  I found mentors who share their wisdom and genuinely care about my growth. 
                  It's life-changing."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia" />
                    <AvatarFallback>PW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Patricia W., 58</p>
                    <p className="text-sm text-gray-600">Both Giver & Seeker</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I love that I can both share my nursing experience with students and 
                  learn from tech-savvy young people. Every conversation teaches me something new."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex J., 35</p>
                    <p className="text-sm text-gray-600">Connection Seeker</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a new parent, I was overwhelmed. Connected with three different 
                  grandparents who've raised kids. Their advice and reassurance have been invaluable."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
          <CardContent className="pt-8 pb-8 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Own Story?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of people who are enriching their lives through 
              meaningful intergenerational connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => router.push('/sign-up')}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/match')}
                className="border-white text-white hover:bg-white/10"
              >
                Find a Match
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}