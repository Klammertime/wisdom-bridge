'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, Save, Briefcase, MapPin, Calendar, 
  BookOpen, Heart, MessageSquare, Sparkles,
  Globe, Award, Coffee, Music, Palette, Camera
} from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  headline?: string
  location?: string
  yearsOfExperience?: string
  expertise?: string[]
  interests?: string[]
  favoriteStory?: string
  lookingFor?: string
  availability?: string
  languages?: string[]
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({})
  const [editedProfile, setEditedProfile] = useState<UserProfile>({})

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(`profile_${user?.id}`)
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile(parsed)
      setEditedProfile(parsed)
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)
    
    // Save to localStorage
    localStorage.setItem(`profile_${user?.id}`, JSON.stringify(editedProfile))
    
    setProfile(editedProfile)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleExpertiseChange = (value: string) => {
    const expertiseArray = value.split(',').map(item => item.trim()).filter(Boolean)
    setEditedProfile({ ...editedProfile, expertise: expertiseArray })
  }

  const handleInterestsChange = (value: string) => {
    const interestsArray = value.split(',').map(item => item.trim()).filter(Boolean)
    setEditedProfile({ ...editedProfile, interests: interestsArray })
  }

  const handleLanguagesChange = (value: string) => {
    const languagesArray = value.split(',').map(item => item.trim()).filter(Boolean)
    setEditedProfile({ ...editedProfile, languages: languagesArray })
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  const userRole = user.publicMetadata.role as string

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Profile Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback className="text-2xl">{user.firstName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">{user.fullName}</h1>
                    <p className="text-slate-600">{profile.headline || 'Add a headline to tell people about yourself'}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      {profile.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {profile.location}
                        </span>
                      )}
                      {profile.yearsOfExperience && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {profile.yearsOfExperience} years experience
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Edit Form */}
          {isEditing ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      placeholder="e.g., Retired Detective • WWII History Buff • Grandfather of 5"
                      value={editedProfile.headline || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, headline: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., New York, USA"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 40"
                        value={editedProfile.yearsOfExperience || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, yearsOfExperience: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages (comma-separated)</Label>
                    <Input
                      id="languages"
                      placeholder="e.g., English, Spanish, French"
                      value={editedProfile.languages?.join(', ') || ''}
                      onChange={(e) => handleLanguagesChange(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expertise & Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="expertise">Areas of Expertise (comma-separated)</Label>
                    <Textarea
                      id="expertise"
                      placeholder="e.g., Criminal Investigation, Cold Cases, Forensics, Police Procedures"
                      value={editedProfile.expertise?.join(', ') || ''}
                      onChange={(e) => handleExpertiseChange(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interests">Interests & Hobbies (comma-separated)</Label>
                    <Textarea
                      id="interests"
                      placeholder="e.g., True Crime, History, Woodworking, Classic Cars, Gardening"
                      value={editedProfile.interests?.join(', ') || ''}
                      onChange={(e) => handleInterestsChange(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversation Starters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="story">Favorite Story to Share</Label>
                    <Textarea
                      id="story"
                      placeholder="e.g., The time I solved a 20-year-old cold case using a single fingerprint..."
                      value={editedProfile.favoriteStory || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, favoriteStory: e.target.value })}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="looking">What I'm Looking For</Label>
                    <Textarea
                      id="looking"
                      placeholder="e.g., Young investigators interested in cold case techniques, or anyone who wants to hear police stories"
                      value={editedProfile.lookingFor || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, lookingFor: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">When I'm Usually Available</Label>
                    <Input
                      id="availability"
                      placeholder="e.g., Weekday mornings, Weekend afternoons"
                      value={editedProfile.availability || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, availability: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* View Mode */
            <div className="space-y-6">
              {(profile.expertise && profile.expertise.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      Areas of Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(profile.interests && profile.interests.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-rose-500" />
                      Interests & Hobbies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(profile.favoriteStory || profile.lookingFor || profile.availability) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.favoriteStory && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Favorite Story</h4>
                        <p className="text-slate-600">{profile.favoriteStory}</p>
                      </div>
                    )}
                    
                    {profile.lookingFor && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Looking to Connect With</h4>
                        <p className="text-slate-600">{profile.lookingFor}</p>
                      </div>
                    )}

                    {profile.availability && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Usually Available</h4>
                        <p className="text-slate-600">{profile.availability}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {(profile.languages && profile.languages.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {!profile.headline && !profile.expertise?.length && !profile.interests?.length && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">Your profile is empty</p>
                    <p className="text-sm text-slate-400 mb-6">
                      Add information about yourself to help others connect with you
                    </p>
                    <Button onClick={() => setIsEditing(true)}>
                      Add Profile Information
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}