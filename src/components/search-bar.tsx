'use client';

import {useState, useEffect, useRef} from 'react';
import {Search, X} from 'lucide-react';
import {cn} from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export const SearchBar = ({onSearch, isLoading = false, placeholder = '搜尋電影...', className, defaultValue = ''}: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 300); // 防抖動，300ms 後才執行搜尋

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative', className)}>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn('w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-background', 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent', 'transition-all duration-200', 'disabled:opacity-50 disabled:cursor-not-allowed', isLoading && 'opacity-50')}
          autoComplete='off'
        />
        {query && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors'
            aria-label='清除搜尋'>
            <X className='h-4 w-4 text-muted-foreground' />
          </button>
        )}
      </div>
    </form>
  );
};
