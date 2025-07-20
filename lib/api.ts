import { MatchRequest, UserProfile, VideoRoom } from './types'

export async function findMatch(request: MatchRequest): Promise<UserProfile | null> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  
  const mockUsers: UserProfile[] = [
    {
      id: 'mock-user-1',
      email: 'sarah.mentor@example.com',
      name: 'Sarah Johnson',
      role: 'giver',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      id: 'mock-user-2',
      email: 'alex.learner@example.com',
      name: 'Alex Chen',
      role: 'receiver',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    {
      id: 'mock-user-3',
      email: 'jordan.helper@example.com',
      name: 'Jordan Smith',
      role: 'both',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    },
  ]

  const compatibleUsers = mockUsers.filter((user) => {
    if (user.id === request.userId) return false
    
    if (request.preferredRole === 'giver') {
      return user.role === 'receiver' || user.role === 'both'
    } else if (request.preferredRole === 'receiver') {
      return user.role === 'giver' || user.role === 'both'
    }
    
    return true
  })

  if (compatibleUsers.length === 0) return null
  
  return compatibleUsers[Math.floor(Math.random() * compatibleUsers.length)]
}

export async function createVideoRoom(): Promise<VideoRoom> {
  // Using Jitsi Meet - completely free, no account needed
  // Jitsi is open source and doesn't require any API keys
  const roomName = `Bridge-${Date.now()}`
  
  // Jitsi Meet public instance with config to skip pre-join screen
  // and avoid moderator requirements
  const config = {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    prejoinPageEnabled: false,
  }
  
  const configParams = `#config.${encodeURIComponent(JSON.stringify(config))}`
  const roomUrl = `https://meet.jit.si/${roomName}${configParams}`
  
  return {
    roomUrl,
    roomName,
    token: undefined,
  }
}