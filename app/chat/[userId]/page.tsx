'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Send, Video, Phone, MoreVertical, ArrowLeft,
  Smile, Paperclip, Info
} from 'lucide-react'
import Link from 'next/link'
import { mockUserProfiles, conversationStarters } from '@/lib/mock-data'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
}

export default function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const { user } = useUser()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [matchedUser, setMatchedUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Unwrap params and find the matched user
    params.then(resolvedParams => {
      const foundUser = mockUserProfiles.find(profile => profile.id === resolvedParams.userId)
      setMatchedUser(foundUser)
      setIsLoading(false)
    })
  }, [params])

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    }
  }, [user, router])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Add a welcome message
    if (matchedUser && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: `Hi! I'm ${matchedUser.name}. ${conversationStarters[0]}`,
          sender: 'other',
          timestamp: new Date()
        }
      ])
    }
  }, [matchedUser])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Simulate typing indicator
    setIsTyping(true)
    
    // Simulate response after delay
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "That's a great question! Let me think about that...",
        "I have a story about that actually...",
        "That reminds me of something that happened years ago.",
        "I'd love to hear more about your thoughts on that.",
        "Interesting perspective! In my experience..."
      ]
      
      const otherMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'other',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, otherMessage])
    }, 2000 + Math.random() * 2000) // Random delay between 2-4 seconds
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!matchedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">User not found</p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Avatar className="h-10 w-10">
              <AvatarImage src={matchedUser.imageUrl} />
              <AvatarFallback>
                {matchedUser.name?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{matchedUser.name}</h3>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Connection Info */}
          <div className="text-center mb-8">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarImage src={matchedUser.imageUrl} />
              <AvatarFallback>
                {matchedUser.name?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-900">{matchedUser.name}</h3>
            <p className="text-sm text-gray-600">{matchedUser.headline}</p>
            <p className="text-xs text-gray-500 mt-2">
              You matched with {matchedUser.name?.split(' ')[0]} today
            </p>
          </div>

          {/* Conversation Starters */}
          {messages.length <= 1 && (
            <Card className="bg-purple-50 border-purple-200 p-4 mb-4">
              <h4 className="font-medium text-purple-900 mb-2">Conversation Starters:</h4>
              <div className="space-y-2">
                {conversationStarters.slice(0, 3).map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(starter)}
                    className="text-left w-full p-2 text-sm text-purple-700 hover:bg-purple-100 rounded transition-colors"
                  >
                    • {starter}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.sender === 'other' && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={matchedUser.imageUrl} />
                    <AvatarFallback>
                      {matchedUser.name?.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={matchedUser.imageUrl} />
                <AvatarFallback>
                  {matchedUser.name?.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="w-full"
              />
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Smile className="h-5 w-5" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}