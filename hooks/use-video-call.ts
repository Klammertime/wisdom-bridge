import { useEffect, useState } from 'react'
import { createVideoRoom } from '@/lib/api'

interface UseVideoCallReturn {
  roomUrl: string | null
  isLoading: boolean
  error: string | null
  initializeRoom: () => Promise<void>
}

export function useVideoCall(): UseVideoCallReturn {
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const initializeRoom = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const room = await createVideoRoom()
      setRoomUrl(room.roomUrl)
    } catch (err) {
      console.error('Error creating room:', err)
      setError('Failed to create video room. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initializeRoom()
  }, [])

  return {
    roomUrl,
    isLoading,
    error,
    initializeRoom
  }
}