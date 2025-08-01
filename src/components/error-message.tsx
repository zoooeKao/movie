import { cn } from '@/utils/utils';
import { AlertTriangle, RefreshCw } from 'lucide-react'


interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({title = '發生錯誤', message, onRetry, className}: ErrorMessageProps) => {
  return (
    <div className={cn('border rounded-lg p-6 text-center bg-red-50 border-red-200 text-red-800', className)}>
      <div className='flex justify-center mb-4'>
        <AlertTriangle className={cn('h-12 w-12 text-red-500')} />
      </div>

      <h3 className='font-semibold text-lg mb-2'>{title}</h3>
      <p className='text-sm mb-4 max-w-md mx-auto leading-relaxed'>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
          <RefreshCw className='h-4 w-4' />
          重新嘗試
        </button>
      )}
    </div>
  );
};