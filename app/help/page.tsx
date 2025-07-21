'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, Search, HelpCircle, MessageSquare, Users, 
  Video, Shield, CreditCard, Settings, ChevronDown,
  ChevronUp, Mail, Phone, BookOpen
} from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
  category: string
  icon: any
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    icon: BookOpen,
    question: 'How does Bridge work?',
    answer: 'Bridge connects people across generations for meaningful conversations. After creating your profile and selecting your role (wisdom sharer, seeker, or both), our matching algorithm pairs you with compatible conversation partners based on interests, availability, and complementary needs.'
  },
  {
    category: 'Getting Started',
    icon: BookOpen,
    question: 'What are the different roles?',
    answer: 'Givers share their life experiences and wisdom. Receivers seek guidance and stories. Both means you\'re open to either sharing or learning depending on the match. You can change your role anytime in settings.'
  },
  {
    category: 'Matching',
    icon: Users,
    question: 'How does matching work?',
    answer: 'Our algorithm considers your interests, expertise, availability, and conversation preferences. We prioritize quality matches over quantity, ensuring meaningful connections. You can request a new match anytime if the current one doesn\'t feel right.'
  },
  {
    category: 'Matching',
    icon: Users,
    question: 'Can I choose who I match with?',
    answer: 'Currently, matches are suggested by our algorithm. However, you can browse profiles and send connection requests to specific users. We\'re working on more discovery features for future updates.'
  },
  {
    category: 'Video Calls',
    icon: Video,
    question: 'How do video calls work?',
    answer: 'Once matched, you can start a video call directly from the platform. No downloads required - calls work in your browser. We use secure, encrypted connections to protect your privacy. Calls typically last 30-60 minutes.'
  },
  {
    category: 'Video Calls',
    icon: Video,
    question: 'What if I have technical issues during a call?',
    answer: 'Check your internet connection and browser permissions for camera/microphone. Try refreshing the page or switching browsers. If issues persist, use the report button or contact support@bridge.com.'
  },
  {
    category: 'Safety & Privacy',
    icon: Shield,
    question: 'Is Bridge safe to use?',
    answer: 'Yes! All users are verified, and we have strict community guidelines. You control what information you share. You can report or block users, and all video calls are private (not recorded). We never share your personal data.'
  },
  {
    category: 'Safety & Privacy',
    icon: Shield,
    question: 'Can I remain anonymous?',
    answer: 'While we verify all users for safety, you can use just your first name and control what personal information you share. You decide when and what to reveal as trust builds with your connections.'
  },
  {
    category: 'Account & Billing',
    icon: CreditCard,
    question: 'Is Bridge free to use?',
    answer: 'Yes! Bridge offers a free forever plan with unlimited matches and video calls. We believe meaningful connections should be accessible to everyone. Premium features may be added in the future but core features will always be free.'
  },
  {
    category: 'Account & Billing',
    icon: Settings,
    question: 'How do I delete my account?',
    answer: 'You can delete your account anytime from Settings > Account > Delete Account. This will permanently remove your profile and all data. If you\'re having issues, consider reaching out to support first - we\'re here to help!'
  },
  {
    category: 'Conversations',
    icon: MessageSquare,
    question: 'What should I talk about?',
    answer: 'Start with our conversation starters! Ask about life experiences, lessons learned, or advice on topics you\'re curious about. Share your own stories too. The best conversations flow naturally - just be genuine and curious.'
  },
  {
    category: 'Conversations',
    icon: MessageSquare,
    question: 'How often should I connect?',
    answer: 'That\'s up to you and your conversation partner! Some people connect weekly, others monthly. Many users form ongoing friendships with regular calls. Start with one conversation and see what feels right for both of you.'
  }
]

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">How can we help?</h1>
          <p className="text-lg text-gray-600">Find answers to common questions</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Topics
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq, index) => {
            const Icon = faq.icon
            const isExpanded = expandedItems.includes(index)
            
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toggleExpanded(index)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 pr-2">{faq.question}</h3>
                        <p className="text-sm text-purple-600 mt-1">{faq.category}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="pt-0">
                    <p className="text-gray-700 pl-13">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Contact Support */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-center">Still need help?</CardTitle>
            <CardDescription className="text-center">
              Our support team is here for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="mailto:support@bridge.com">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-5 w-5" />
                  support@bridge.com
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-5 w-5" />
                Live Chat (Coming Soon)
              </Button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              We typically respond within 24 hours
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/features/share-your-story">
              <Button variant="link">How to Share Stories</Button>
            </Link>
            <Link href="/features/find-connection">
              <Button variant="link">Finding Connections</Button>
            </Link>
            <Link href="/features/real-people">
              <Button variant="link">About Bridge</Button>
            </Link>
            <Link href="/settings">
              <Button variant="link">Account Settings</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}