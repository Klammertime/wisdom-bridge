'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserRole, UserProfile } from '@/lib/types'
import { 
  Loader2, ArrowLeft, Video, RefreshCw, 
  Heart, Users, Sparkles, CheckCircle2,
  MessageSquare, Clock, Target, MapPin,
  Globe, Award, BookOpen, Calendar
} from 'lucide-react'
import Link from 'next/link'
import { mockUserProfiles, conversationStarters } from '@/lib/mock-data'

export default function MatchPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isMatching, setIsMatching] = useState(false)
  const [match, setMatch] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [matchingStage, setMatchingStage] = useState(0)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    if (isMatching) {
      const stages = ['Searching for available users...', 'Finding your perfect match...', 'Almost there...']
      const interval = setInterval(() => {
        setMatchingStage((prev) => (prev + 1) % stages.length)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isMatching])

  const handleFindMatch = async () => {
    if (!user) return

    setIsMatching(true)
    setError(null)
    setMatch(null)
    setMatchingStage(0)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 4500))
      
      const userRole = user.publicMetadata.role as UserRole
      
      // Filter compatible profiles based on user role
      const compatibleProfiles = mockUserProfiles.filter(profile => {
        if (userRole === 'receiver') return profile.role === 'giver' || profile.role === 'both'
        if (userRole === 'giver') return profile.role === 'receiver' || profile.role === 'both'
        return true // 'both' can match with anyone
      })
      
      if (compatibleProfiles.length > 0) {
        // Select a random compatible profile
        const randomIndex = Math.floor(Math.random() * compatibleProfiles.length)
        setMatch(compatibleProfiles[randomIndex])
      } else {
        setError('No matches available right now. Please try again later.')
      }
    } catch (err) {
      setError('Failed to find a match. Please try again.')
      console.error('Matching error:', err)
    } finally {
      setIsMatching(false)
    }
  }

  const handleStartCall = () => {
    if (match) {
      router.push(`/call?matchId=${match.id}`)
    }
  }

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

  const matchingMessages = [
    'Searching for available users...',
    'Finding your perfect match...',
    'Almost there...'
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl">Find Your Match</CardTitle>
              <RoleIcon className={`w-6 h-6 ${roleColor}`} />
            </div>
            <CardDescription className="text-base">
              {userRole === 'giver' 
                ? "We'll match you with someone seeking guidance"
                : userRole === 'receiver'
                ? "We'll find an experienced person to help you"
                : "We'll match you based on your preference"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!match && !isMatching && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 mb-2 text-lg">Ready to connect?</p>
                <p className="text-slate-500 text-sm mb-8">
                  We'll find someone compatible for a great conversation
                </p>
                <Button onClick={handleFindMatch} size="lg" className="group">
                  <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Find a Match
                </Button>
                {error && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            )}

            {isMatching && (
              <div className="text-center py-12">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full animate-ping"></div>
                  </div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                  </div>
                </div>
                <p className="text-lg font-medium text-slate-800 mb-2">
                  {matchingMessages[matchingStage]}
                </p>
                <p className="text-sm text-slate-500">
                  This usually takes just a few seconds
                </p>
              </div>
            )}

            {match && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                    <CheckCircle2 className="w-4 h-4" />
                    Perfect match found!
                  </div>
                  
                  <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-slate-100">
                    <AvatarImage src={match.imageUrl} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {match.name?.split(' ').map(n => n[0]).join('') || match.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                    {match.name || 'Your Match'}
                  </h3>
                  
                  {match.headline && (
                    <p className="text-sm text-slate-600 mb-3 px-4">{match.headline}</p>
                  )}
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
                    {match.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.location}
                      </span>
                    )}
                    {match.languages && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {match.languages[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Why You Matched */}
                <div className="bg-purple-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Why You Matched
                  </h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>• Compatible conversation styles</li>
                    {match.interests && match.interests.length > 0 && (
                      <li>• Shared interest in {match.interests[0]}</li>
                    )}
                    <li>• {match.availability || 'Flexible availability'}</li>
                  </ul>
                </div>

                {/* Expertise Preview */}
                {match.expertise && match.expertise.length > 0 && (
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Can share expertise in:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {match.expertise.slice(0, 3).map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                      {match.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{match.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Conversation Starter */}
                <div className="bg-slate-50 rounded-lg p-4 text-left">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Conversation Starter
                  </h4>
                  <p className="text-sm text-slate-600 italic">
                    "{conversationStarters[Math.floor(Math.random() * conversationStarters.length)]}"
                  </p>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleStartCall} className="w-full group" size="lg">
                    <Video className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Video Call
                  </Button>
                  <Button 
                    onClick={handleFindMatch} 
                    variant="outline" 
                    className="w-full group"
                  >
                    <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                    Find Another Match
                  </Button>
                </div>

                <p className="text-xs text-center text-slate-400">
                  Remember to be respectful and open-minded during your conversation
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}