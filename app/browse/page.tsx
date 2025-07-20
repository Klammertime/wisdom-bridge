'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { UserRole, UserProfile } from '@/lib/types'
import { 
  Search, Video, Heart, Users, Sparkles, 
  MapPin, Globe, Clock, Filter, X,
  BookOpen, Coffee, Music, Camera, Palette,
  Briefcase, Award, MessageSquare
} from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockProfiles: UserProfile[] = [
  {
    id: 'user-1',
    email: 'martha.wilson@example.com',
    name: 'Martha Wilson',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martha',
    headline: 'Retired Detective • True Crime Enthusiast • Grandmother',
    location: 'Chicago, IL',
    expertise: ['Criminal Investigation', 'Cold Cases', 'Forensics'],
    interests: ['True Crime Podcasts', 'Gardening', 'Mystery Novels', 'Cooking'],
    favoriteStory: 'Solved a 20-year cold case with a single fingerprint',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'user-2',
    email: 'robert.chen@example.com',
    name: 'Robert Chen',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    headline: 'WWII Veteran • History Professor • Storyteller',
    location: 'San Francisco, CA',
    expertise: ['WWII History', 'Pacific Theater', 'Military Strategy'],
    interests: ['Documentary Films', 'Chess', 'Classical Music', 'Writing'],
    favoriteStory: 'Liberation of a POW camp in the Philippines',
    languages: ['English', 'Mandarin', 'Japanese'],
  },
  {
    id: 'user-3',
    email: 'elena.garcia@example.com',
    name: 'Elena Garcia',
    role: 'both',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    headline: 'Retired Nurse • Medical History • Knitting Expert',
    location: 'Miami, FL',
    expertise: ['Emergency Medicine', 'Public Health', 'Medical History'],
    interests: ['Knitting', 'Salsa Dancing', 'Cooking', 'Travel Stories'],
    favoriteStory: 'Working through Hurricane Andrew in 1992',
    languages: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: 'user-4',
    email: 'james.murphy@example.com',
    name: 'James Murphy',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    headline: 'Master Carpenter • Woodworking Teacher • DIY Expert',
    location: 'Portland, OR',
    expertise: ['Woodworking', 'Furniture Making', 'Home Renovation'],
    interests: ['Craft Beer', 'Hiking', 'Photography', 'Blues Music'],
    favoriteStory: 'Built a house from reclaimed materials',
    languages: ['English'],
  },
  {
    id: 'user-5',
    email: 'sophie.anderson@example.com',
    name: 'Sophie Anderson',
    role: 'receiver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    headline: 'Journalism Student • True Crime Writer • Curious Mind',
    location: 'New York, NY',
    expertise: ['Investigative Journalism', 'Creative Writing'],
    interests: ['True Crime', 'Cold Cases', 'Podcasts', 'Photography'],
    lookingFor: 'Retired detectives or anyone with law enforcement stories',
    languages: ['English', 'French'],
  },
  {
    id: 'user-6',
    email: 'david.kim@example.com',
    name: 'David Kim',
    role: 'receiver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    headline: 'History PhD Student • WWII Research • Documentary Maker',
    location: 'Boston, MA',
    expertise: ['Historical Research', 'Documentary Production'],
    interests: ['WWII History', 'Film Making', 'Archive Research', 'Jazz'],
    lookingFor: 'WWII veterans or their families for oral history project',
    languages: ['English', 'Korean'],
  },
]

export default function BrowsePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    // Filter profiles based on search and filters
    let filtered = mockProfiles

    if (searchTerm) {
      filtered = filtered.filter(profile => {
        const searchLower = searchTerm.toLowerCase()
        return (
          profile.name?.toLowerCase().includes(searchLower) ||
          profile.headline?.toLowerCase().includes(searchLower) ||
          profile.expertise?.some(e => e.toLowerCase().includes(searchLower)) ||
          profile.interests?.some(i => i.toLowerCase().includes(searchLower)) ||
          profile.location?.toLowerCase().includes(searchLower)
        )
      })
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter(profile => {
        if (selectedFilters.includes('giver') && profile.role !== 'giver' && profile.role !== 'both') return false
        if (selectedFilters.includes('receiver') && profile.role !== 'receiver' && profile.role !== 'both') return false
        return true
      })
    }

    setFilteredProfiles(filtered)
  }, [searchTerm, selectedFilters])

  const handleStartCall = (matchId: string) => {
    router.push(`/call?matchId=${matchId}`)
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Connections</h1>
            <p className="text-lg text-slate-600">
              Find people who match your interests and start a conversation
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search by interests, expertise, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {selectedFilters.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {selectedFilters.length}
                  </span>
                )}
              </Button>
            </div>

            {showFilters && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Role</h4>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={selectedFilters.includes('giver') ? 'default' : 'outline'}
                          onClick={() => toggleFilter('giver')}
                        >
                          Mentors
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedFilters.includes('receiver') ? 'default' : 'outline'}
                          onClick={() => toggleFilter('receiver')}
                        >
                          Learners
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Count */}
          <p className="text-sm text-slate-600 mb-4">
            Found {filteredProfiles.length} people
          </p>

          {/* Profile Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile.imageUrl} />
                      <AvatarFallback>{profile.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1">
                      {profile.role === 'giver' && <Heart className="w-4 h-4 text-rose-500" />}
                      {profile.role === 'receiver' && <Users className="w-4 h-4 text-blue-500" />}
                      {profile.role === 'both' && <Sparkles className="w-4 h-4 text-purple-500" />}
                      <span className="text-xs font-medium text-slate-600">
                        {profile.role === 'giver' ? 'Mentor' : profile.role === 'receiver' ? 'Learner' : 'Both'}
                      </span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-1">{profile.name}</CardTitle>
                  <CardDescription className="text-sm mb-3">
                    {profile.headline}
                  </CardDescription>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profile.location}
                      </span>
                    )}
                    {profile.languages && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {profile.languages.length} languages
                      </span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {profile.expertise && profile.expertise.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.expertise.slice(0, 3).map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {profile.expertise.length > 3 && (
                          <span className="text-xs text-slate-500">+{profile.expertise.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {profile.interests && profile.interests.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Interests
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.interests.slice(0, 3).map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-rose-100 text-rose-800 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {profile.interests.length > 3 && (
                          <span className="text-xs text-slate-500">+{profile.interests.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {(profile.favoriteStory || profile.lookingFor) && (
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs text-slate-600 italic line-clamp-2">
                        {profile.lookingFor ? `"${profile.lookingFor}"` : `"${profile.favoriteStory}"`}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => handleStartCall(profile.id)}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/profile/${profile.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">No matches found</p>
                <p className="text-sm text-slate-400">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}