'use client'

import { useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'

export default function SimpleCallPage() {
  const callFrameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initCall = async () => {
      if (!callFrameRef.current) return

      try {
        // Create room via API
        const response = await fetch('/api/daily', { method: 'POST' })
        const room = await response.json()
        console.log('Simple: Room created:', room)

        // Create and join immediately
        const frame = DailyIframe.createFrame(callFrameRef.current, {
          showLeaveButton: true,
          iframeStyle: {
            width: '100%',
            height: '100%',
          },
        })

        const result = await frame.join({ url: room.roomUrl })
        console.log('Simple: Joined successfully:', result)
      } catch (error) {
        console.error('Simple: Error:', error)
      }
    }

    initCall()
  }, [])

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl mb-4">Simple Call Test</h1>
      <div className="h-[600px] bg-black" ref={callFrameRef} />
    </div>
  )
}