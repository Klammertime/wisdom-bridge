'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, BookOpen, Heart, Mic, Users, 
  MessageSquare, Clock, Shield, Sparkles,
  ChevronRight, Quote
} from 'lucide-react'

export default function ShareYourStoryPage() {
  const router = useRouter()

  const benefits = [
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

  const howItWorks = [
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

  const faqs = [
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

  const testimonials = [
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <Button onClick={() => router.push('/sign-up')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Share Your Story
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're 25 or 85, your experiences matter. Share your stories with someone who genuinely wants to listen and learn.
          </p>
          <Button size="lg" onClick={() => router.push('/sign-up')}>
            Start Sharing Today
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Share Your Story?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Stories Being Shared</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-purple-300 mb-4" />
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people connecting across generations through meaningful conversations.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => router.push('/sign-up')}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Get Started Free
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}