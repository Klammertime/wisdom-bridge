import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { FeatureTestimonial } from '@/lib/types'

interface TestimonialSectionProps {
  title?: string
  testimonials: FeatureTestimonial[]
}

export function TestimonialSection({ 
  title = "What People Are Saying", 
  testimonials 
}: TestimonialSectionProps) {
  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-purple-300 mb-4" />
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                    {testimonial.age && `, ${testimonial.age}`}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}