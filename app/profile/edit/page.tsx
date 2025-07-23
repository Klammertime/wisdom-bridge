'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, Save, User, MapPin, Briefcase, Heart, 
  MessageSquare, Calendar, Globe, BookOpen, Sparkles
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditProfilePage() {
  const { user } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const userRole = user?.publicMetadata?.role || 'both'
  const isGiver = userRole === 'giver' || userRole === 'both'
  const isReceiver = userRole === 'receiver' || userRole === 'both'

  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    headline: '',
    location: '',
    bio: '',
    expertise: '',
    interests: '',
    languages: '',
    availability: '',
    lifeExperiences: '',
    curiosities: '',
    favoriteStory: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // In a real app, this would save to your database
      localStorage.setItem('userProfile', JSON.stringify(formData))
      
      setTimeout(() => {
        router.push('/profile')
      }, 1000)
    } catch (error) {
      console.error('Failed to save profile:', error)
      setIsLoading(false)
      // Show user-friendly error message
      alert('Failed to save profile. Please try again.')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/profile')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">
            Help us match you with the perfect conversation partners
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Retired Teacher • Storyteller • Grandmother"
                  className="mb-1"
                />
                <p className="text-sm text-gray-500">A brief description that appears on your profile</p>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mb-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">About Me</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Share a bit about your background, what you enjoy, and what makes you unique..."
                  rows={4}
                  className="mb-1"
                />
                <p className="text-sm text-gray-500">Help others get to know you (2-3 sentences)</p>
              </div>
            </CardContent>
          </Card>

          {/* Expertise & Interests */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Expertise & Interests
              </CardTitle>
              <CardDescription>
                What you know and what you love
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Textarea
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => handleChange('expertise', e.target.value)}
                  placeholder="Teaching, Child Psychology, Creative Writing, Gardening..."
                  rows={2}
                  className="mb-1"
                />
                <p className="text-sm text-gray-500">Skills and knowledge you can share (comma-separated)</p>
              </div>

              <div>
                <Label htmlFor="interests">Topics I Love to Discuss</Label>
                <Textarea
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleChange('interests', e.target.value)}
                  placeholder="Education trends, Classic literature, Travel stories, Family traditions..."
                  rows={2}
                  className="mb-1"
                />
                <p className="text-sm text-gray-500">Conversation topics that excite you</p>
              </div>
            </CardContent>
          </Card>

          {/* Availability & Languages */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Availability & Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="availability">When I'm Available</Label>
                <Select value={formData.availability} onValueChange={(value) => handleChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your general availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekday-mornings">Weekday Mornings</SelectItem>
                    <SelectItem value="weekday-afternoons">Weekday Afternoons</SelectItem>
                    <SelectItem value="weekday-evenings">Weekday Evenings</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="flexible">Flexible Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="languages">Languages I Speak</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => handleChange('languages', e.target.value)}
                  placeholder="English, Spanish, French..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Role-specific sections */}
          {isGiver && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Stories & Experiences to Share
                </CardTitle>
                <CardDescription>
                  For those seeking wisdom and connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lifeExperiences">Life Experiences I Can Share</Label>
                  <Textarea
                    id="lifeExperiences"
                    value={formData.lifeExperiences}
                    onChange={(e) => handleChange('lifeExperiences', e.target.value)}
                    placeholder="Raising children in different decades, Career transitions, Overcoming challenges, Historical events I witnessed..."
                    rows={3}
                    className="mb-1"
                  />
                  <p className="text-sm text-gray-500">What wisdom can you offer?</p>
                </div>

                <div>
                  <Label htmlFor="favoriteStory">My Favorite Story to Tell</Label>
                  <Textarea
                    id="favoriteStory"
                    value={formData.favoriteStory}
                    onChange={(e) => handleChange('favoriteStory', e.target.value)}
                    placeholder="The time I... / When I learned that... / How I discovered..."
                    rows={2}
                    className="mb-1"
                  />
                  <p className="text-sm text-gray-500">A story that captures who you are</p>
                </div>
              </CardContent>
            </Card>
          )}

          {isReceiver && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  What I'm Curious About
                </CardTitle>
                <CardDescription>
                  Help us match you with the right storytellers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="curiosities">Topics I'd Love to Learn About</Label>
                  <Textarea
                    id="curiosities"
                    value={formData.curiosities}
                    onChange={(e) => handleChange('curiosities', e.target.value)}
                    placeholder="What life was like in the 60s, How to start a business, Parenting advice, Stories from specific professions..."
                    rows={3}
                    className="mb-1"
                  />
                  <p className="text-sm text-gray-500">What questions keep you curious?</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}