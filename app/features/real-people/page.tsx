'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Video, Shield, Heart, Users, 
  CheckCircle, Globe, Smile, UserCheck,
  ChevronRight, Quote, Star
} from 'lucide-react'

export default function RealPeoplePage() {
  const router = useRouter()

  const benefits = [
    {
      icon: UserCheck,
      title: "Verified Profiles",
      description: "Every member is a real person with verified identity. No bots, no fake accounts."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Secure video calls with privacy controls and community guidelines that ensure respect."
    },
    {
      icon: Globe,
      title: "Diverse Community",
      description: "Connect with people from all walks of life, backgrounds, and experiences."
    }
  ]

  const features = [
    {
      icon: Video,
      title: "HD Video Calls",
      description: "Crystal clear video quality for conversations that feel like you're in the same room."
    },
    {
      icon: Heart,
      title: "Authentic Connections",
      description: "No algorithms pushing content. Just real people having real conversations."
    },
    {
      icon: Smile,
      title: "Judgment-Free Zone",
      description: "A welcoming space where everyone's story is valued and respected."
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Identity Verification",
      description: "We verify each member to ensure you're always connecting with real people."
    },
    {
      step: 2,
      title: "Profile Creation",
      description: "Share your interests, experiences, and what you're looking for in connections."
    },
    {
      step: 3,
      title: "Safe Video Calls",
      description: "Connect through our secure platform with built-in safety features."
    },
    {
      step: 4,
      title: "Build Community",
      description: "Form lasting friendships with people who enrich your life."
    }
  ]

  const faqs = [
    {
      question: "How do you verify that people are real?",
      answer: "We use a combination of email verification, profile review, and optional ID verification to ensure every member is a real person. We also have community reporting features to maintain authenticity."
    },
    {
      question: "What makes your video calls different?",
      answer: "Our calls are designed for meaningful conversation, not quick chats. We provide conversation prompts, ensure high-quality video, and create a distraction-free environment for genuine connection."
    },
    {
      question: "Are there age restrictions?",
      answer: "Users must be 18 or older, but we celebrate connections across all adult age groups. Many of our most meaningful connections happen between people of different generations."
    },
    {
      question: "What if I encounter inappropriate behavior?",
      answer: "We have zero tolerance for inappropriate behavior. You can report any user directly from the call interface, and our team reviews reports within 24 hours. You can also block users instantly."
    },
    {
      question: "Can I stay anonymous?",
      answer: "While we verify identities for safety, you control what information you share. You can use your first name only and share personal details at your own pace as trust builds."
    }
  ]

  const testimonials = [
    {
      name: "Michael R.",
      age: 52,
      quote: "After years of social media, it's refreshing to have real conversations with real people. No filters, no pretense, just authentic human connection.",
      role: "High School Teacher"
    },
    {
      name: "Amanda C.",
      age: 31,
      quote: "I was skeptical about video calls with strangers, but the verification process made me feel safe. Now I have friends across the country I talk to weekly.",
      role: "Graphic Designer"
    },
    {
      name: "George H.",
      age: 71,
      quote: "Technology usually makes me feel disconnected, but Bridge is different. It's brought real people into my life when I needed it most.",
      role: "Retired Engineer"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Verified Members" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "2M+", label: "Conversations Started" },
    { number: "92%", label: "Feel More Connected" }
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
            Real People, Real Connections
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Video calls with real people who want to connect. No age limits, no requirements - just genuine human conversation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/sign-up')} className="bg-purple-600 hover:bg-purple-700">
              Join Our Community
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/features/share-your-story')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-purple-600">{stat.number}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Real People?</h2>
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Built for Authentic Connection</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We've created an environment where real connections can flourish, free from the pressures of traditional social media.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment to Real</h2>
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
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">From Our Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
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
      <section className="py-16 px-4 bg-gray-50">
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

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">Identity Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Users className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-6">Join 50,000+ Real People Connecting Daily</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference of authentic human connection in a safe, welcoming community.
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
          <p className="mt-4 text-sm opacity-80">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>
    </div>
  )
}