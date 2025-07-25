'use client'

import { 
  FeatureHero, 
  FeatureGrid, 
  StepsSection,
  FAQSection, 
  TestimonialSection,
  CTASection 
} from '@/components/features'
import { Search, Heart, Calendar, Coffee, MessageSquare, Star } from 'lucide-react'
import { FeatureBenefit, FeatureStep, FeatureFAQ, FeatureTestimonial } from '@/lib/types'

export default function FindConnectionPage() {
  const benefits: FeatureBenefit[] = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our algorithm connects you with people who share your interests and have stories you'll love."
    },
    {
      icon: Heart,
      title: "Genuine Connections",
      description: "No superficial small talk. Dive into real conversations that matter."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Connect when it works for you. Morning coffee chats or evening conversations."
    }
  ]

  const connectionTypes: FeatureBenefit[] = [
    {
      icon: Coffee,
      title: "Casual Conversations",
      description: "Light-hearted chats about life, hobbies, and shared interests."
    },
    {
      icon: MessageSquare,
      title: "Deep Discussions",
      description: "Explore life philosophies, share wisdom, and learn from different perspectives."
    },
    {
      icon: Star,
      title: "Mentorship Moments",
      description: "Get advice on career, relationships, or life challenges from those who've been there."
    }
  ]

  const howItWorks: FeatureStep[] = [
    {
      step: 1,
      title: "Tell Us About You",
      description: "Share your interests, what you're looking for, and when you're available."
    },
    {
      step: 2,
      title: "Get Matched",
      description: "Our algorithm finds compatible conversation partners based on shared interests."
    },
    {
      step: 3,
      title: "Start Talking",
      description: "Schedule a video call at a time that works for both of you."
    }
  ]

  const faqs: FeatureFAQ[] = [
    {
      question: "How does matching work?",
      answer: "We consider your interests, availability, and what you're looking to gain from conversations. Our algorithm then suggests compatible partners who complement your preferences."
    },
    {
      question: "Can I choose who I connect with?",
      answer: "Yes! We provide suggestions, but you always have the final say. Browse profiles and choose someone whose story resonates with you."
    },
    {
      question: "What if I'm nervous about the first call?",
      answer: "That's completely normal! We provide conversation starters and topics to help break the ice. Remember, the other person is looking forward to meeting you too."
    },
    {
      question: "How often can I connect with new people?",
      answer: "As often as you'd like! Some members have daily conversations, while others prefer weekly or monthly connections. It's entirely up to you."
    },
    {
      question: "Is it free to find connections?",
      answer: "Yes! Basic matching and conversations are free. We believe meaningful connections should be accessible to everyone."
    }
  ]

  const testimonials: FeatureTestimonial[] = [
    {
      name: "Alex M.",
      age: 28,
      quote: "I was feeling lost in my career. Talking to retired professionals gave me perspective and confidence I couldn't find anywhere else.",
      role: "Software Developer"
    },
    {
      name: "Linda K.",
      age: 52,
      quote: "As an empty nester, I found new purpose in mentoring young mothers. These connections filled a void I didn't know I had.",
      role: "HR Manager"
    },
    {
      name: "Ryan P.",
      age: 35,
      quote: "Learning about different life paths from older generations helped me appreciate my own journey and make better decisions.",
      role: "Entrepreneur"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <FeatureHero
        title="Find Your Connection"
        subtitle="Meet someone who gets you, across generations"
        description="Whether you're seeking wisdom, friendship, or just a good conversation, we'll help you find the perfect match."
        ctaText="Find Your Match"
        ctaLink="/sign-up"
      />

      <FeatureGrid
        title="Why Bridge Connections Work"
        items={benefits}
      />

      <FeatureGrid
        title="Types of Connections"
        items={connectionTypes}
      />

      <StepsSection steps={howItWorks} />

      <FAQSection faqs={faqs} />

      <TestimonialSection testimonials={testimonials} />

      <CTASection
        title="Ready to Make a Connection?"
        description="Join our community and discover the power of intergenerational conversations."
      />
    </div>
  )
}