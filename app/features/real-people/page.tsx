'use client'

import { 
  FeatureHero, 
  FeatureGrid, 
  FAQSection, 
  TestimonialSection,
  CTASection 
} from '@/components/features'
import { Users, Shield, Heart, Award } from 'lucide-react'
import { FeatureBenefit, FeatureFAQ, FeatureTestimonial } from '@/lib/types'

export default function RealPeoplePage() {
  const benefits: FeatureBenefit[] = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Every member is verified to ensure authentic, safe connections."
    },
    {
      icon: Heart,
      title: "Genuine Interest",
      description: "Connect with people who truly want to share and learn, not just pass time."
    },
    {
      icon: Award,
      title: "Quality Over Quantity",
      description: "We focus on meaningful connections, not endless swiping or superficial matches."
    }
  ]

  const communityValues: FeatureBenefit[] = [
    {
      icon: Users,
      title: "Respect",
      description: "Every story and perspective is valued. We celebrate diversity in age, background, and experience."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Listen with an open heart. Understanding comes from truly hearing each other."
    },
    {
      icon: Shield,
      title: "Safety",
      description: "We maintain a secure environment where everyone feels comfortable sharing."
    }
  ]

  const faqs: FeatureFAQ[] = [
    {
      question: "How do you verify users?",
      answer: "All users go through identity verification during sign-up. We also monitor for authentic engagement and have community guidelines that ensure respectful interactions."
    },
    {
      question: "What makes Bridge different from other video chat platforms?",
      answer: "Bridge is specifically designed for intergenerational connections. We're not about dating or networking—we're about meaningful conversations between people of different ages who can learn from each other."
    },
    {
      question: "Are the testimonials real?",
      answer: "Absolutely! Every testimonial comes from actual Bridge members who've found meaningful connections on our platform. We're proud of the real impact we're making."
    },
    {
      question: "How do you ensure quality conversations?",
      answer: "We provide conversation guides, match based on genuine interests, and foster a community culture that values deep, meaningful exchanges over superficial chat."
    },
    {
      question: "Can I report inappropriate behavior?",
      answer: "Yes. We have a zero-tolerance policy for disrespectful behavior. You can report any concerns, and our team will take immediate action to maintain our community standards."
    }
  ]

  const testimonials: FeatureTestimonial[] = [
    {
      name: "Dorothy M.",
      age: 82,
      quote: "I've made three wonderful young friends who call me their 'adopted grandma.' This platform gave me family when I thought I'd lost mine.",
      role: "Retired Teacher"
    },
    {
      name: "Marcus J.",
      age: 24,
      quote: "Every conversation teaches me something new. It's like having access to decades of wisdom and experience at my fingertips.",
      role: "Graduate Student"
    },
    {
      name: "Patricia L.",
      age: 67,
      quote: "Bridge helped me realize my stories matter. Young people actually want to hear about my experiences, and that's given me new purpose.",
      role: "Former Journalist"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <FeatureHero
        title="Real People, Real Stories"
        subtitle="No bots, no scripts, just authentic human connections"
        description="Bridge is a community of genuine people looking to share, learn, and grow through meaningful conversations."
        ctaText="Join Our Community"
        ctaLink="/sign-up"
      />

      <FeatureGrid
        title="What Makes Us Real"
        items={benefits}
      />

      <FeatureGrid
        title="Our Community Values"
        items={communityValues}
      />

      <FAQSection faqs={faqs} />

      <TestimonialSection 
        title="Real Stories from Real Members"
        testimonials={testimonials} 
      />

      <CTASection
        title="Experience Real Connection"
        description="Join a community where every conversation matters and every story is valued."
      />
    </div>
  )
}