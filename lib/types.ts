export type UserRole = 'giver' | 'receiver' | 'both'

export interface UserProfile {
  id: string
  email: string
  name?: string
  role?: UserRole
  imageUrl?: string
  headline?: string
  location?: string
  expertise?: string[]
  interests?: string[]
  bio?: string
  favoriteStory?: string
  languages?: string[]
  yearsOfExperience?: number
  availability?: string
  lookingFor?: string
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

// Feature page types
export interface FeatureBenefit {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface FeatureStep {
  step: number
  title: string
  description: string
}

export interface FeatureFAQ {
  question: string
  answer: string
}

export interface FeatureTestimonial {
  name: string
  age?: number
  quote: string
  role: string
}

export interface FeaturePageData {
  title: string
  subtitle: string
  description: string
  benefits: FeatureBenefit[]
  howItWorks?: FeatureStep[]
  faqs: FeatureFAQ[]
  testimonials?: FeatureTestimonial[]
  ctaText: string
  ctaLink: string
}