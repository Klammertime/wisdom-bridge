'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Calendar, ChevronRight } from 'lucide-react'
import { Connection } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface RecentConnectionsProps {
  connections: Connection[]
}

export function RecentConnections({ connections }: RecentConnectionsProps) {
  if (connections.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-purple-600" />
            Recent Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 text-center py-8">
            No connections yet. Click "Find a Match" to start connecting!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-purple-600" />
            Recent Connections
          </CardTitle>
          <Link href="/connections">
            <Button variant="ghost" size="sm" className="text-purple-600">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.slice(0, 4).map((connection) => (
            <div
              key={connection.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={connection.connectedUserImageUrl} />
                <AvatarFallback>
                  {connection.connectedUserName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {connection.connectedUserName}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                      {connection.notes || 'Great conversation!'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-500">
                        {formatDistanceToNow(new Date(connection.connectedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link href={`/chat/${connection.connectedUserId}`}>
                <Button size="sm" variant="outline" className="shrink-0">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}