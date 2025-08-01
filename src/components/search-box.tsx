'use client';

import { useRef, useState } from 'react';
import { cn } from '@/utils/utils';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'


interface SearchBoxProps {
  onSubmit: (key: string) => void
  className?: string
  placeholder?: string
}

export default function SearchBox({
  onSubmit,
  className,
  placeholder = '搜尋電影...',
}: SearchBoxProps) {
  const [value, setValue] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing && value.trim()) {
      submitSearch()
    }
    if (e.key === 'Escape') {
      handleClear()
      inputRef.current?.blur()
    }
  }

  const submitSearch = () => {
    if (value.trim()) {
      onSubmit(value.trim())
    }
  }

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative flex items-center">
        <Search className="text-muted-foreground pointer-events-none absolute left-3 h-4 w-4" />
        <Input
          ref={inputRef}
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'pr-10 pl-10 transition-colors',
            isFocused && 'ring-primary/20 ring-2',
            value && 'pr-4',
          )}
          enterKeyHint="search"
          aria-label="搜尋電影"
        />
        {/* {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="hover:bg-muted absolute right-1 h-7 w-7 p-0"
            aria-label="清除搜尋"
          >
            <X className="h-3 w-3" />
          </Button>
        )} */}
      </div>
    </div>
  )
}