import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeatureBenefit } from '@/lib/types'

interface FeatureGridProps {
  title: string
  items: FeatureBenefit[]
  columns?: 2 | 3 | 4
}

export function FeatureGrid({ title, items, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        </div>
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {items.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}