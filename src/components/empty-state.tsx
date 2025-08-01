import { cn } from '@/utils/utils'

interface EmptyStateProps {
  title?: string
  message?: string
  className?: string
}

export const EmptyState = ({
  title = '沒有找到結果',
  message = '請嘗試使用不同的搜尋關鍵字',
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn('py-12 text-center', className)}>
      <div className="mb-4 text-6xl">🎬</div>
      <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mx-auto max-w-md">{message}</p>
    </div>
  )
}
