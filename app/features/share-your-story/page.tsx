'use client'

import { 
  FeatureHero, 
  FeatureGrid, 
  StepsSection,
  FAQSection, 
  TestimonialSection,
  CTASection 
} from '@/components/features'
import { Heart, Users, Clock } from 'lucide-react'
import { FeatureBenefit, FeatureStep, FeatureFAQ, FeatureTestimonial } from '@/lib/types'

export default function ShareYourStoryPage() {
  const benefits: FeatureBenefit[] = [
    {
      icon: Heart,
      title: "Be Heard",
      description: "Your experiences matter. Find someone who genuinely wants to listen."
    },
    {
      icon: Users,
      title: "Make an Impact",
      description: "Your stories can inspire, teach, and guide others on their journey."
    },
    {
      icon: Clock,
      title: "On Your Schedule",
      description: "Share when you want, how you want. No pressure, just connection."
    }
  ]

  const howItWorks: FeatureStep[] = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your profile and tell us a bit about your interests and experiences."
    },
    {
      step: 2,
      title: "Get Matched",
      description: "We'll connect you with someone who's interested in your stories."
    },
    {
      step: 3,
      title: "Start Sharing",
      description: "Schedule a video call and start your meaningful conversation."
    }
  ]

  const faqs: FeatureFAQ[] = [
    {
      question: "Who can share their stories?",
      answer: "Everyone! Whether you're 25 or 95, your experiences are valuable. We believe every life has stories worth sharing."
    },
    {
      question: "What kind of stories should I share?",
      answer: "Any experiences that shaped you - career lessons, life adventures, family traditions, historical events you've witnessed, or wisdom you've gained along the way."
    },
    {
      question: "How long are the conversations?",
      answer: "Typically 30-60 minutes, but you and your conversation partner can decide what works best for both of you."
    },
    {
      question: "Is it safe to share personal stories?",
      answer: "Yes. All users are verified, and you control what you share. You can end a call at any time, and we have community guidelines to ensure respectful interactions."
    },
    {
      question: "Can I share stories regularly?",
      answer: "Absolutely! Many of our storytellers form ongoing connections and meet weekly or monthly to continue their conversations."
    }
  ]

  const testimonials: FeatureTestimonial[] = [
    {
      name: "Martha W.",
      age: 78,
      quote: "I never thought anyone would be interested in my old stories. Now I have a weekly call with Sarah, who loves hearing about my time as a nurse in the 60s.",
      role: "Retired Nurse"
    },
    {
      name: "James T.",
      age: 65,
      quote: "Sharing my entrepreneurial journey with young professionals has given me a new purpose in retirement. It's incredibly fulfilling.",
      role: "Business Owner"
    },
    {
      name: "Elena R.",
      age: 45,
      quote: "As a single mom, I love sharing my experiences with younger women facing similar challenges. We support each other.",
      role: "Teacher"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <FeatureHero
        title="Your Stories Matter"
        subtitle="Share your life experiences with people who want to learn from you"
        description="Connect with younger generations eager to hear your wisdom, adventures, and life lessons."
        ctaText="Start Sharing Today"
        ctaLink="/sign-up"
      />

      <FeatureGrid
        title="Why Share Your Story?"
        items={benefits}
      />

      <StepsSection steps={howItWorks} />

      <FAQSection faqs={faqs} />

      <TestimonialSection testimonials={testimonials} />

      <CTASection
        title="Ready to Share Your Wisdom?"
        description="Join thousands of storytellers making meaningful connections across generations."
      />
    </div>
  )
}