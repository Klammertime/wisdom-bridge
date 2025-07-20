'use client'

import { useEffect, useRef, useState } from 'react'
import DailyIframe from '@daily-co/daily-js'
import { createVideoRoom } from '@/lib/api'

export default function TestCallPage() {
  const callFrameRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    const initCall = async () => {
      if (!callFrameRef.current) return

      try {
        setStatus('Creating room...')
        console.log('Test: Creating video room via API')
        const room = await createVideoRoom()
        console.log('Test: Room created:', room)
        
        setStatus('Creating Daily iframe...')
        const frame = DailyIframe.createFrame(callFrameRef.current, {
          showLeaveButton: true,
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: '0',
          },
        })

        setStatus(`Joining room: ${room.roomUrl}`)
        await frame.join({ url: room.roomUrl })
        
        console.log('Test: Successfully joined room')
        setStatus('Connected!')
      } catch (error: any) {
        console.error('Test: Error:', error)
        setStatus(`Error: ${error?.message || 'Unknown error'}`)
      }
    }

    initCall()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Daily.co Test Page</h1>
      <p className="mb-4">Status: {status}</p>
      <div className="bg-black rounded-lg overflow-hidden h-[600px]" ref={callFrameRef} />
    </div>
  )
}