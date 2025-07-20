export type UserRole = 'giver' | 'receiver' | 'both'

export interface UserProfile {
  id: string
  email: string
  name?: string
  role?: UserRole
  imageUrl?: string
}

export interface Connection {
  id: string
  userId: string
  connectedUserId: string
  connectedUserName: string
  connectedUserEmail: string
  connectedUserImageUrl?: string
  connectedAt: Date
  notes?: string
}

export interface MatchRequest {
  userId: string
  role: UserRole
  preferredRole?: UserRole
}

export interface VideoRoom {
  roomUrl: string
  roomName: string
  token?: string
}