'use client'

import { Suspense, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { PhoneOff, Save, AlertCircle, Copy, Share2 } from 'lucide-react'
import { useVideoCall } from '@/hooks/use-video-call'
import { useConnections } from '@/hooks/use-connections'
import { useClipboard } from '@/hooks/use-clipboard'
import { 
  VIDEO_CALL, 
  SHARE_DIALOG, 
  CALL_MESSAGES, 
  BUTTON_LABELS 
} from '@/lib/constants/call'

function CallContent() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const matchId = searchParams.get('matchId')
  
  // Custom hooks
  const { roomUrl, isLoading, error, initializeRoom } = useVideoCall()
  const { saveConnection } = useConnections()
  const { copied, copyToClipboard } = useClipboard()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded, router])

  const handleEndCall = () => {
    if (confirm(CALL_MESSAGES.END_CALL_CONFIRM)) {
      router.push('/dashboard')
    }
  }

  const handleSaveConnection = () => {
    if (!user || !matchId) return

    const success = saveConnection({
      userId: user.id,
      connectedUserId: matchId,
      connectedUserName: 'Matched User', // TODO: Get actual user name from match data
      connectedUserEmail: 'user@example.com', // TODO: Get actual user email
      connectedAt: new Date(),
    })

    if (success) {
      router.push('/dashboard')
    }
  }

  const handleCopyLink = async () => {
    if (!roomUrl) return
    await copyToClipboard(roomUrl)
  }

  const handleShare = async () => {
    if (!roomUrl) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_DIALOG.TITLE,
          text: SHARE_DIALOG.TEXT,
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
    return <LoadingSpinner />
  }

  return (
    <main className="h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col overflow-hidden">
      <div className="flex-1 p-2 flex flex-col">
        <div className="w-full flex-1 flex flex-col">

          <div 
            className="flex-1 bg-slate-800 rounded-lg overflow-hidden relative" 
            style={{ minHeight: VIDEO_CALL.MIN_HEIGHT }}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto" />
                  <p className="text-lg mb-2 text-white">{CALL_MESSAGES.LOADING.TITLE}</p>
                  <p className="text-sm text-gray-300">{CALL_MESSAGES.LOADING.SUBTITLE}</p>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-lg mb-2 text-white">{CALL_MESSAGES.ERROR.TITLE}</p>
                  <p className="text-sm text-gray-300 mb-4">{error}</p>
                  <Button onClick={initializeRoom} variant="outline">
                    {CALL_MESSAGES.ERROR.RETRY_BUTTON}
                  </Button>
                </div>
              </div>
            ) : roomUrl ? (
              <>
                <iframe
                  src={roomUrl}
                  allow={VIDEO_CALL.IFRAME_PERMISSIONS}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, minHeight: VIDEO_CALL.MIN_HEIGHT }}
                />
                
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
                  Powered by {VIDEO_CALL.PROVIDER_NAME}
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
                  <span className="opacity-75">{CALL_MESSAGES.EXIT_HINT.PREFIX}</span>{' '}
                  <span className="font-semibold">{CALL_MESSAGES.EXIT_HINT.ACTION}</span>{' '}
                  <span className="opacity-75">{CALL_MESSAGES.EXIT_HINT.SUFFIX}</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">{CALL_MESSAGES.NO_ROOM}</p>
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
                {BUTTON_LABELS.END_CALL}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                title={copied ? BUTTON_LABELS.COPIED : "Copy room link"}
                disabled={!roomUrl}
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? BUTTON_LABELS.COPIED : BUTTON_LABELS.COPY_LINK}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                title="Share room link"
                disabled={!roomUrl}
              >
                <Share2 className="h-4 w-4 mr-1" />
                {BUTTON_LABELS.SHARE}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveConnection}
                title="Save this connection"
              >
                <Save className="h-4 w-4 mr-1" />
                {BUTTON_LABELS.SAVE_CONTACT}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CallPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CallContent />
    </Suspense>
  )
}