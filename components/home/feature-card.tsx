import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  colorScheme: 'rose' | 'blue' | 'green'
}

const colorClasses = {
  rose: {
    bg: 'bg-rose-100',
    hoverBg: 'group-hover:bg-rose-200',
    text: 'text-rose-600'
  },
  blue: {
    bg: 'bg-blue-100',
    hoverBg: 'group-hover:bg-blue-200',
    text: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    hoverBg: 'group-hover:bg-green-200',
    text: 'text-green-600'
  }
}

export function FeatureCard({ href, icon: Icon, title, description, colorScheme }: FeatureCardProps) {
  const colors = colorClasses[colorScheme]
  
  return (
    <Link href={href} className="block">
      <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 cursor-pointer h-full">
        <CardHeader>
          <div className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center mb-4 ${colors.hoverBg} transition-colors`}>
            <Icon className={`w-7 h-7 ${colors.text}`} />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}