'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, Search, Users, MessageCircle, Calendar,
  Phone, Video, MoreVertical, UserPlus, Filter,
  SortAsc, Clock, Heart
} from 'lucide-react'
import Link from 'next/link'
import { Connection } from '@/lib/types'
import { mockConnections } from '@/lib/mock-data'
import { formatDistanceToNow } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ConnectionsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [connections, setConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    // In production, this would fetch from your database
    setConnections(mockConnections)
  }, [])

  // Filter and sort connections
  const filteredConnections = connections
    .filter(connection => {
      const matchesSearch = searchQuery === '' || 
        connection.connectedUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        connection.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.connectedAt).getTime() - new Date(a.connectedAt).getTime()
      } else if (sortBy === 'name') {
        return a.connectedUserName.localeCompare(b.connectedUserName)
      }
      return 0
    })

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">My Connections</h1>
            <Link href="/match">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Find New Connection
              </Button>
            </Link>
          </div>
          <p className="text-gray-600">
            Manage and reconnect with people you've met on Bridge
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Connections</p>
                  <p className="text-2xl font-bold text-gray-900">{connections.length}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {connections.filter(c => {
                      const date = new Date(c.connectedAt)
                      const now = new Date()
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                    }).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Chats</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {connections.filter(c => {
                      const date = new Date(c.connectedAt)
                      const daysSince = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
                      return daysSince < 7
                    }).length}
                  </p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search connections by name or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Connections List */}
        {filteredConnections.length === 0 ? (
          <Card>
            <CardContent className="pt-16 pb-16 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No connections found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Start making connections to see them here'}
              </p>
              <Link href="/match">
                <Button>Find Your First Match</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredConnections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={connection.connectedUserImageUrl} />
                        <AvatarFallback>
                          {connection.connectedUserName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {connection.connectedUserName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{connection.connectedUserEmail}</p>
                        
                        {connection.notes && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-700">{connection.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Connected {formatDistanceToNow(new Date(connection.connectedAt), { addSuffix: true })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(connection.connectedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/chat/${connection.connectedUserId}`}>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </Link>
                      
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add More Connections CTA */}
        {filteredConnections.length > 0 && (
          <Card className="mt-8 bg-purple-50 border-purple-200">
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keep Growing Your Network
              </h3>
              <p className="text-gray-600 mb-4">
                Every connection has the potential to enrich your life
              </p>
              <Link href="/match">
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Find New Connection
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}