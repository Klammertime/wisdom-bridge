import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className={cn(
          "animate-spin rounded-full border-b-2 border-slate-900",
          sizeClasses[size],
          className
        )}
      />
    </div>
  )
}