import { cn } from '@/utils/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-red-600',
        sizeClasses[size],
        className,
      )}
      aria-label="載入中"
    />
  )
}

export const LoadingOverlay = ({
  children,
  isLoading,
}: {
  children: React.ReactNode
  isLoading: boolean
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  )
}
