import { LucideIcon } from 'lucide-react'

interface TrustIndicatorProps {
  icon: LucideIcon
  title: string
  description: string
  colorScheme: 'blue' | 'green' | 'purple'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600'
  }
}

export function TrustIndicator({ icon: Icon, title, description, colorScheme }: TrustIndicatorProps) {
  const colors = colorClasses[colorScheme]
  
  return (
    <div>
      <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}