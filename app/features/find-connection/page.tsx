'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Users, Heart, Search, Calendar, 
  MessageSquare, Shield, Star, Coffee,
  ChevronRight, Quote, Sparkles
} from 'lucide-react'

export default function FindConnectionPage() {
  const router = useRouter()

  const benefits = [
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

  const connectionTypes = [
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

  const howItWorks = [
    {
      step: 1,
      title: "Tell Us About You",
      description: "Share your interests, what you're curious about, and what kind of conversations you're seeking."
    },
    {
      step: 2,
      title: "Browse & Match",
      description: "Explore profiles of wisdom sharers or let us suggest perfect matches based on your interests."
    },
    {
      step: 3,
      title: "Start Connecting",
      description: "Send a connection request and schedule your first video call when you're both ready."
    },
    {
      step: 4,
      title: "Build Relationships",
      description: "Many connections become ongoing friendships with regular calls and shared experiences."
    }
  ]

  const faqs = [
    {
      question: "How do you match me with the right person?",
      answer: "We use your interests, conversation preferences, and availability to suggest compatible connections. You can also browse profiles and reach out to anyone who inspires you."
    },
    {
      question: "What if I'm nervous about the first call?",
      answer: "That's completely normal! We provide conversation starters and tips. Remember, the person you're connecting with wants to talk with you too. Most people find the nerves disappear within minutes."
    },
    {
      question: "Can I connect with multiple people?",
      answer: "Absolutely! Many users enjoy having different connections for different interests - maybe one for career advice, another for hobby discussions, and another for life stories."
    },
    {
      question: "What if a connection doesn't work out?",
      answer: "No worries! Not every match will be perfect. You can politely end a connection and try again with someone new. It's all about finding the right fit."
    },
    {
      question: "Is there an age limit for who I can connect with?",
      answer: "We encourage intergenerational connections! While many seek older wisdom sharers, you might also connect with peers or younger people seeking your guidance."
    }
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      age: 28,
      quote: "I was missing my grandparents so much. Through Bridge, I found Margaret who shares recipes and life advice just like my grandma used to. It's been healing.",
      role: "Marketing Manager"
    },
    {
      name: "David L.",
      age: 35,
      quote: "As a new dad, I was craving guidance. I connected with Robert, a grandfather of six, who's been invaluable in helping me navigate fatherhood.",
      role: "Software Developer"
    },
    {
      name: "Priya K.",
      age: 42,
      quote: "Moving to a new country was isolating. I found a community here - older women who've been through similar journeys and understand.",
      role: "Entrepreneur"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
            
            {/* Center Section - Logo */}
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-purple-600">Bridge</h1>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign in
              </Link>
              <Link href="/sign-up" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Connection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Missing those grandparent-style conversations? Connect with someone who has time to share and stories to tell.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/sign-up')} className="bg-purple-600 hover:bg-purple-700">
              Find Your Connection
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/features/share-your-story')}>
              Share Stories Instead
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Find Connection Here?</h2>
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

      {/* Connection Types */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Types of Connections</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you're seeking wisdom, friendship, or just a good conversation, there's someone waiting to connect.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {connectionTypes.map((type, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <type.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Find Your Connection</h2>
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Connection Stories</h2>
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
          <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-6">Your Next Meaningful Connection Awaits</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who've found friendship, wisdom, and support through Bridge.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => router.push('/sign-up')}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Start Connecting Today
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}