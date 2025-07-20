import { NextResponse } from 'next/server'

export async function POST() {
  const apiKey = process.env.DAILY_API_KEY
  const dailyDomain = process.env.DAILY_DOMAIN || process.env.NEXT_PUBLIC_DAILY_DOMAIN
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Daily.co API key is not configured' },
      { status: 500 }
    )
  }

  console.log('Daily API Key exists:', !!apiKey)
  console.log('Daily Domain:', dailyDomain)

  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          enable_prejoin_ui: false,
          enable_chat: true,
          enable_screenshare: true,
          enable_recording: false,
          max_participants: 2,
          exp: Math.round(Date.now() / 1000) + 3600, // Room expires in 1 hour
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Daily.co API error:', errorData)
      console.error('Response status:', response.status)
      return NextResponse.json(
        { error: `Failed to create room: ${response.status}`, details: errorData },
        { status: response.status }
      )
    }

    const room = await response.json()
    console.log('Room created successfully:', room)
    console.log('Room URL from API:', room.url)
    console.log('Room name:', room.name)
    
    // Daily.co API already returns the full URL with the correct domain
    // Don't override it unless necessary
    const roomUrl = room.url
    
    console.log('Returning room URL:', roomUrl)
    
    return NextResponse.json({
      roomUrl: roomUrl,
      roomName: room.name,
      token: room.token || null,
    })
  } catch (error) {
    console.error('Error creating Daily.co room:', error)
    return NextResponse.json(
      { error: 'Failed to create video room' },
      { status: 500 }
    )
  }
}