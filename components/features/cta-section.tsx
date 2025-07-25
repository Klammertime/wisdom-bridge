import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface CTASectionProps {
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
}

export function CTASection({ 
  title, 
  description, 
  buttonText = "Join Bridge Today",
  buttonLink = "/sign-up"
}: CTASectionProps) {
  return (
    <section className="py-20 bg-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <Link href={buttonLink}>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            {buttonText}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}