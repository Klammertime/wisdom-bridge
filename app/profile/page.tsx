'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, Briefcase, MapPin, Heart, MessageSquare, Sparkles,
  Globe, Award, Edit
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    // Load profile from localStorage with error handling
    try {
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)
      }
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error)
      // Remove corrupted data
      localStorage.removeItem('userProfile')
    }
  }, [])

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const userRole = user.publicMetadata.role as string || 'both'

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{profile?.name || user.fullName || 'Your Name'}</h1>
                    {profile?.headline && (
                      <p className="text-gray-600 mt-1">{profile.headline}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      {profile?.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profile.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        {userRole === 'giver' && <Heart className="w-4 h-4 text-rose-500" />}
                        {userRole === 'receiver' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                        {userRole === 'both' && <Sparkles className="w-4 h-4 text-purple-500" />}
                        <span className="capitalize">{userRole}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/profile/edit">
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>

          {/* About Me */}
          {profile?.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Expertise */}
          {profile?.expertise && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.split(',').map((item: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interests */}
          {profile?.interests && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Topics I Love to Discuss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.split(',').map((item: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages & Availability */}
          {(profile?.languages || profile?.availability) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  Communication & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.languages && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Languages</h4>
                    <p className="text-gray-700">{profile.languages}</p>
                  </div>
                )}
                {profile.availability && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Availability</h4>
                    <p className="text-gray-700">{profile.availability.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stories to Share (for Givers) */}
          {(userRole === 'giver' || userRole === 'both') && (profile?.lifeExperiences || profile?.favoriteStory) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  Stories & Experiences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.lifeExperiences && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Life Experiences I Can Share</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{profile.lifeExperiences}</p>
                  </div>
                )}
                {profile.favoriteStory && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">My Favorite Story</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{profile.favoriteStory}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Curiosities (for Receivers) */}
          {(userRole === 'receiver' || userRole === 'both') && profile?.curiosities && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  What I'm Curious About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{profile.curiosities}</p>
              </CardContent>
            </Card>
          )}

          {/* Profile Incomplete Message */}
          {!profile && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <p className="text-amber-800 text-center">
                  Your profile is incomplete. Complete your profile to help others get to know you better!
                </p>
                <div className="text-center mt-4">
                  <Link href="/profile/edit">
                    <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}