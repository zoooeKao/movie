"use client";

import { usePagination } from '@/features/page/hooks/use-pagination';
import { cn } from '@/utils/utils';
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface PaginationProps {
  currentPage: number
  canGoBack: boolean
  canGoForward: boolean
  totalPages?: number
  isLoading?: boolean
  onPreviousPage: () => void
  onNextPage: () => void
  onPageSelect?: (page: number) => void
  className?: string
  showTotalPages?: boolean
}

export const Pagination = ({
  currentPage,
  canGoBack,
  canGoForward,
  totalPages,
  isLoading = false,
  onPreviousPage,
  onNextPage,
  onPageSelect,
  className,
  showTotalPages = false,
}: PaginationProps) => {
  const { open, pageOptions, handlePageSelect, setOpen } = usePagination({
    currentPage,
    totalPages,
  });

  const onPageSelectHandler = (selectedPage: number) => {
    handlePageSelect(selectedPage, onPageSelect);
  };

  return (
    <div
      className={cn(
        'text-md flex items-center justify-center gap-2 sm:text-xl md:text-2xl',
        className,
      )}
    >
      <button
        onClick={onPreviousPage}
        disabled={!canGoBack || isLoading}
        className="bg-card border-border hover:bg-accent flex items-center gap-1 rounded-md border px-2 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-4"
        aria-label="上一頁"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {totalPages && onPageSelect ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="text-muted-foreground h-9 w-[120px] justify-between text-sm"
              disabled={isLoading}
            >
              第 {currentPage} 頁
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="center">
            <Command>
              <CommandInput placeholder="搜尋頁面..." className="h-9" />
              <CommandList>
                <CommandEmpty>找不到頁面</CommandEmpty>
                <CommandGroup>
                  {pageOptions.map((page, index) => (
                    <CommandItem
                      key={
                        page.value === -1 || page.value === -2 ? `separator-${index}` : page.value
                      }
                      value={page.value.toString()}
                      onSelect={() => !page.disabled && onPageSelectHandler(page.value)}
                      disabled={page.disabled}
                      className={page.disabled ? 'cursor-default opacity-50' : ''}
                    >
                      {page.label}
                      {!page.disabled && (
                        <Check
                          className={cn(
                            'ml-auto h-4 w-4',
                            currentPage === page.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <span className="text-muted-foreground text-sm">
          第 {currentPage} 頁{showTotalPages && totalPages && ` / 共 ${totalPages} 頁`}
        </span>
      )}

      <button
        onClick={onNextPage}
        disabled={!canGoForward || isLoading}
        className="bg-card border-border hover:bg-accent flex items-center gap-1 rounded-md border px-2 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-4"
        aria-label="下一頁"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};