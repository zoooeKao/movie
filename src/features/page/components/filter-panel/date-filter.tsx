'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DiscoverMovieFilters } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateFilterProps {
  filters: DiscoverMovieFilters;
  setFilters: (
    filters: DiscoverMovieFilters | ((prev: DiscoverMovieFilters) => DiscoverMovieFilters),
  ) => void;
}

export const DateFilter = ({ filters, setFilters }: DateFilterProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* 開始日期 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">發佈日期 - 開始</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.releaseDate?.from && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.releaseDate?.from ? (
                format(filters.releaseDate.from, 'yyyy/MM/dd')
              ) : (
                <span>選擇開始日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-sm p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.releaseDate?.from}
              onSelect={date =>
                setFilters(prev => ({
                  ...prev,
                  releaseDate: { ...prev.releaseDate, from: date },
                }))
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 結束日期 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">發佈日期 - 結束</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !filters.releaseDate?.to && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.releaseDate?.to ? (
                format(filters.releaseDate.to, 'yyyy/MM/dd')
              ) : (
                <span>選擇結束日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-sm p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.releaseDate?.to}
              onSelect={date =>
                setFilters(prev => ({
                  ...prev,
                  releaseDate: { ...prev.releaseDate, to: date },
                }))
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}; 