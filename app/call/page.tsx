'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createVideoRoom } from '@/lib/api'
import { Connection } from '@/lib/types'
import { PhoneOff, Save, AlertCircle, Copy, Share2 } from 'lucide-react'

export default function CallPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const matchId = searchParams.get('matchId')

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  useEffect(() => {
    const initializeRoom = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        const room = await createVideoRoom()
        setRoomUrl(room.roomUrl)
      } catch (err) {
        console.error('Error creating room:', err)
        setError('Failed to create video room. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    initializeRoom()
  }, [user])

  const handleEndCall = () => {
    if (confirm('Are you sure you want to end the call?')) {
      router.push('/dashboard')
    }
  }

  const handleSaveConnection = () => {
    if (!user || !matchId) return

    const newConnection: Connection = {
      id: Date.now().toString(),
      userId: user.id,
      connectedUserId: matchId,
      connectedUserName: 'Matched User',
      connectedUserEmail: 'user@example.com',
      connectedAt: new Date(),
    }

    const existingConnections = JSON.parse(localStorage.getItem('connections') || '[]')
    const updatedConnections = [...existingConnections, newConnection]
    localStorage.setItem('connections', JSON.stringify(updatedConnections))

    router.push('/dashboard')
  }

  const handleCopyLink = async () => {
    if (!roomUrl) return
    
    try {
      await navigator.clipboard.writeText(roomUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = async () => {
    if (!roomUrl) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Bridge call',
          text: 'Click the link to join my video call',
          url: roomUrl,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      handleCopyLink()
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  return (
    <main className="h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col overflow-hidden">
      <div className="flex-1 p-2 flex flex-col">
        <div className="w-full flex-1 flex flex-col">

          <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden relative" style={{ minHeight: '600px' }}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                  <p className="text-lg mb-2 text-white">Setting up video call...</p>
                  <p className="text-sm text-gray-300">Please wait</p>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-lg mb-2 text-white">Unable to start video call</p>
                  <p className="text-sm text-gray-300 mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : roomUrl ? (
              <>
                {/* Jitsi iframe */}
                <iframe
                  src={roomUrl}
                  allow="camera; microphone; fullscreen; display-capture; autoplay"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, minHeight: '600px' }}
                />
                
                {/* Note about Jitsi */}
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
                  Powered by Jitsi Meet
                </div>
                
                {/* Exit hint */}
                <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
                  <span className="opacity-75">Press</span> <span className="font-semibold">End Call</span> <span className="opacity-75">below to return to dashboard</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">No room URL available</p>
              </div>
            )}
          </div>

          <div className="mt-2 mb-2 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="default"
                onClick={handleEndCall}
                title="End call and return to dashboard"
                className="font-semibold"
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                End Call
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                title={copied ? "Copied!" : "Copy room link"}
                disabled={!roomUrl}
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                title="Share room link"
                disabled={!roomUrl}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveConnection}
                title="Save this connection"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}