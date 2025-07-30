import {cn} from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const EmptyState = ({title = '沒有找到結果', message = '請嘗試使用不同的搜尋關鍵字', className}: EmptyStateProps) => {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className='text-6xl mb-4'>🎬</div>
      <h3 className='font-semibold text-xl mb-2 text-foreground'>{title}</h3>
      <p className='text-muted-foreground max-w-md mx-auto'>{message}</p>
    </div>
  );
};